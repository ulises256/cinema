import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const app_routes: Routes = [
    {
        path: 'main',
        loadChildren: './main/main.module#MainModule'
     },
     {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
     },
     {
        path: 'pelicula',
        loadChildren: './peliculas-main/peliculas-main.module#PeliculasMainModule'
     },
    { path: '',   redirectTo: 'main', pathMatch: 'full' },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(app_routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
