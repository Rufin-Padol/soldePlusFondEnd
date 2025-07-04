import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceTsService } from '../Services/auth.service.ts.service';
import { catchError, EMPTY, switchMap, throwError } from 'rxjs';

 

export const authInterceptor: HttpInterceptorFn = (req, next) => {
 const authService = inject(AuthServiceTsService);
  const router = inject(Router);

  const excludedUrls = [
    '/connexion',
    '/creation',
    '/refreshToken',
    '/reinitialiser-mot-de-passe',
    '/changer-mot-de-passe',
    '/renouveler',
    '/activer',
  ];
// ❌ Ne pas intercepter les URLs exclues
  if (excludedUrls.some((url) => req.url.includes(url))) {
    return next(req);
  }

  const token = authService.getToken();

  // ✅ Cloner la requête avec token si présent
  const authReq = token
    ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token');

        if (refreshToken) {
          return authService.refreshToken(refreshToken).pipe(
            switchMap((response) => {
              // ✅ Stocker les nouveaux tokens
              localStorage.setItem('access_token', response.token);
              localStorage.setItem('refresh_token', response.refreshToken);

              // ✅ Rejouer la requête originale avec le nouveau token
              const retryReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${response.token}`)
              });

              return next(retryReq);
            }),
            catchError((refreshError) => {
              console.error('Erreur lors du refresh token:', refreshError);
              authService.logout();
              router.navigate(['/login']);
              return EMPTY;
            })
          );
        } else {
          authService.logout();
          router.navigate(['/login']);
          return EMPTY;
        }
      }

      return throwError(() => error);
    })
  );
}