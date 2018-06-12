import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";
import { tap, retry, map, catchError } from 'rxjs/operators'; //changes in rxjs import for rxjs v6^

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem('id_token');
        let cloned=req
        if (idToken) {
            cloned = req.clone({
                headers: req.headers.set('Authorization', idToken)
            });

        }
        return next.handle(cloned).pipe(retry(3),
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