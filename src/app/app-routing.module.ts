import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapaComponent } from './pages/mapa/mapa.component';
import { AboutComponent } from './pages/about/about.component';
import { ProblemaComponent } from './pages/problema/problema.component';
import { SecurityComponent } from './pages/security/security.component';
import { GuardService } from './_services/guard.service';
import { LogoutComponent } from './pages/logout/logout.component';
import { TiponegocioComponent } from './pages/admin/tiponegocio/tiponegocio.component';
import { NegocioComponent } from './pages/admin/negocio/negocio.component';
import { SedesComponent } from './pages/admin/sedes/sedes.component';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';

const routes: Routes = [
  {path: 'mapa', component: MapaComponent, canActivate: [GuardService]},
  {path: 'about', component: AboutComponent, canActivate: [GuardService]},
  {path: 'problema', component: ProblemaComponent, canActivate: [GuardService]},
  {path: 'encuesta', component: EncuestaComponent},
  {path: 'admin', component: AdminComponent, children: [
    {path: 'tiponegocio', component: TiponegocioComponent, canActivate: [GuardService]},
    {path: 'negocio', component: NegocioComponent, canActivate: [GuardService]},
    {path: 'sedes', component: SedesComponent, canActivate: [GuardService]}
   ], canActivate: [GuardService]},
  {path: 'security', component: SecurityComponent},
  {path: 'logout', component: LogoutComponent},
  {path: '**', redirectTo: 'logout', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
