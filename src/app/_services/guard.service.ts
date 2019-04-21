import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { TOKEN_NAME } from '../_shared/constants';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {

  constructor(
    private router: Router,
    private securityService: SecurityService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token = sessionStorage.getItem(TOKEN_NAME);
    let isAdministrador = this.securityService.esRoleAdmin();

    if (token != null) {
      console.log(state.url)
      if(!isAdministrador){
        switch (state.url) {
          case '/admin/tiponegocio':
          case '/admin/negocio':
          case '/admin/sedes': 
          case '/admin/sedes': 
          case '/encuesta':
            this.router.navigate(['encuesta/crear']);  
            return false;
        }
      }
      return true;
    } else {
      this.router.navigate(['logout']);
    }
    return false;
  }
}
