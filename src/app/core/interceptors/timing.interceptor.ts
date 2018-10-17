import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpClient,
  HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedRequest;

    if (req.url.includes('cart')) {
      clonedRequest = req.clone({
        params: new HttpParams()
          .set('ts_interceptor', Date.now().toString())
      });
    } else {
      clonedRequest = req;
    }

    return next.handle(clonedRequest)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.url.includes('cart')) {
              const end = Date.now().toString();
              const start = event.url.split('ts_interceptor=')[1];
              const duration = +end - +start;
              console.log('Duration of the request: ' + duration + ' ms');
            }
            return event;
          }
        })
      );
  }
}
