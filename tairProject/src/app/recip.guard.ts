import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
export const recipGuard: CanActivateFn = (route, state) => {
  console.log("guard");
  console.log(sessionStorage.getItem('name'));
  if (sessionStorage.getItem('name') != null || sessionStorage.getItem('password') != null) {
     return true;
  } else {
     const router = new Router(); // Create a new Router instance
     // Check if there are child segments in the current state
    
     const segments = state.url.split('/');
     if (segments.length > 1) {
        segments.pop(); // Remove the last segment from the URL
        router.navigate(['..' + segments.join('/') + '/login']);
     } else {
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