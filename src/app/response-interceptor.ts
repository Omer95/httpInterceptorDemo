import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpResponse, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, retry, map, catchError } from 'rxjs/operators'; //changes in rxjs import for rxjs v6^

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Before sending data')
        console.log(req);
        return next.handle(req).pipe(retry(3),
            map(resp=> {  
                if (resp instanceof HttpResponse) {
                    console.log('Response is ::');
                    console.log(resp.body)
                }
                return resp;
            }),
            catchError(err=> {
                console.log(err);
                if (err instanceof HttpResponse) {
                    console.log(err.status);
                    console.log(err.body);
                }
                return of(err);
            }));
    }
}