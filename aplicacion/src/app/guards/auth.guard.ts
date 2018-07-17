import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild  {
    constructor(private router: Router, private auth: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.auth.usuarioLogeado()
		.do(res => res ? null : this.router.navigate(['/login']));
	}
	
	canActivateChild() {
		 let usuario = this.auth.obtenerUsuario().getValue()
		 if(usuario && usuario.getTipo()=="admin"){
			 return true
		 }
		 return false
	  }
}
