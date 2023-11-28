import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {StorageService} from "../services/storage.service";

export const isLoggedInGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const storageService: StorageService = inject(StorageService);

  if (storageService.isLoggedIn()) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
