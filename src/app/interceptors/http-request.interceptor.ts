import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { tap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NG_PROGRESS_REF } from '@/commons/constants/configurations/application.constant';
import { Router } from '@angular/router';

export const HttpRequestInterceptor: HttpInterceptorFn = (request, next) => {
  const ngProgress = inject(NgProgress).ref(NG_PROGRESS_REF);
  const messageService = inject(NzMessageService);
  const router = inject(Router);

  return next(request).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          console.log(event.body); // Log successful response
        }
      },
      error: (error: HttpErrorResponse) => {
        messageService.error('Your session expired! Please sign in.');
        router.navigate(['/signIn']); // ✅ Redirect to sign-in page
      },
      complete: () => {
        ngProgress.complete(); // Ensure progress bar stops
      },
    })
  );
};
