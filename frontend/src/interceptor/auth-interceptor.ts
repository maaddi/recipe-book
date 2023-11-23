import {Injectable} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {parseJson} from "@angular/cli/src/utilities/json-file";

const USER_KEY = 'auth-user';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("in interceptor");
    let user = sessionStorage.getItem(USER_KEY);
    let token = null;
    if (user) {
      token = JSON.parse(user).token;
    }
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    console.log(req);
    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
