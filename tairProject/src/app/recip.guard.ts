import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const recipGuard: CanActivateFn = (route, state) => {
  console.log("guard");
  console.log(sessionStorage.getItem('name'))
  const router = new Router(); 
  const activatedRoute=new ActivatedRoute();
  if (sessionStorage.getItem('name') != null&&sessionStorage.getItem('password')!=null) {
   return true;
} else {
    // No data found in Session Storage
    Swal.fire({
      title: "You cannot access this page",
      text: "To allow access you must register",
      icon: "error",
      showConfirmButton: false,
      timer: 1500
    });
    router.navigate(['../'+'/login'], { 
      relativeTo: activatedRoute
    });
}

  return false
};
