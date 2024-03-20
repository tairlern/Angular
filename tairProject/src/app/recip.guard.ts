import {  ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
export const recipGuard: CanActivateFn = (route, state) => {
  console.log("guard");
  console.log(sessionStorage.getItem('name'));
  if (sessionStorage.getItem('name') != null || sessionStorage.getItem('password') != null) {
     return true;
  } else {
     const router = new Router(); // Create a new Router instance
   //   // Check if there are child segments in the current state
   const routing=new ActivatedRoute();
     const segments = state.url.split('/');
     if( segments.length>1) {
        segments.pop(); // Remove the last segment from the URL
        router.navigate(['../' + '/login']);
     }
      else {
      router.navigate(['/login']);
     }
     // No data found in Session Storage
     Swal.fire({
        title: "You cannot access this page",
        text: "To allow access you must register",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
     });
     return false;
  }
};
// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class recipeGuard implements CanActivate {

//   constructor(private router: Router) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     // Your authentication logic to determine if the user is authorized to access the route
//     // For example, check if the user is logged in or has necessary permissions
//     if (sessionStorage.getItem('username') !== null) {
//       return true;
//     } else {
//       // Redirect to the login page if not authorized
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }

