import {Injectable} from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {StorageService} from "../services/storage.service";
import {AuthService} from "../services/auth.service";
import {EventBusService} from "../services/event-bus.service";
import {EventData} from "../shared/event";

const USER_KEY = 'auth-user';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(private storageService: StorageService, private authService: AuthService, private eventBusService: EventBusService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user = window.sessionStorage.getItem(USER_KEY);
    let token = null;
    if (user) {
      token = JSON.parse(user).token;
    }
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('auth/signin') &&
          error.status === 401
        ) {
          return this.handle401Error(req, next, user!);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler, user: string) {
    console.log("refresh");
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.storageService.isLoggedIn()) {
        return this.authService.refreshToken(user).pipe(
          switchMap(data => {
            this.isRefreshing = false;
            const token = this.storageService.updateUser(data);
            request = request.clone ({
              headers: request.headers.set('Authorization', `Bearer ${token}`)
            });
            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            if (error.status == '403') {
              this.eventBusService.emit(new EventData('logout', null));
            }

            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
