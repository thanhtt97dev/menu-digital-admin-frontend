import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const HttpStatusCodeInterceptor: HttpInterceptorFn = (request, next) => {
  return next(request).pipe(
    tap({
      
    })
  );
};
