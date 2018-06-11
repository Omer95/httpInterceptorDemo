import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem('id_token');
        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', idToken)
            });
            return next.handle(cloned)
        }
        else {
            console.log('JWT not found')
            return next.handle(req)
        }
    }
}