import { NG_PROGRESS_REF } from '@/commons/constants/application.constant';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { tap, timeout } from 'rxjs';

export const HttpRequestInterceptor: HttpInterceptorFn = (request, next) => {
  const ngProgress = inject(NgProgress).ref(NG_PROGRESS_REF)

  return next(request).pipe(
    tap(event =>{
      ngProgress.start()
      if(event instanceof HttpResponse){
        if(event.status === 200){
          console.log(event.body)
          ngProgress.complete()
        }
      }
    })
  )
};
