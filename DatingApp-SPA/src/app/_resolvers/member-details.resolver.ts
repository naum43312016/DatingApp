import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertyifyService } from '../_services/alertyify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User>{
    constructor(private userService: UserService, private router: Router,
        private alertify: AlertyifyService){}


   resolve(route: ActivatedRouteSnapshot) : Observable<User>{
       return this.userService.getUser(route.params['id']).pipe(
           catchError(error => {
               this.alertify.error('Problem retrieving Data');
               this.router.navigate(['/members']);
               return of(null);
           })
       );
   }
}