import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceTsService } from '../Services/auth.service.ts.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceTsService);
  const router = inject(Router);
  const requiredRole = route.data['role'];

  

  return router.createUrlTree(['/unauthorized']);
};
