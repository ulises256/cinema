import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

/* Importamos los componentes que se usarán en las rutas
 */
import {MainComponent} from './main.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { UsuarioComponent } from './usuario/usuario.component';

const main_routers: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'user',
        component: UsuarioComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'user/:token',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(main_routers),
    CommonModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard, AuthService]
})
export class MainRoutingModule { }
