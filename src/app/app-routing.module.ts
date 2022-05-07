import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ViewComponent } from './components/CRUD/view/view.component';
import { CreateComponent } from './components/CRUD/create/create.component';
import {CreateCompteComponent} from './components/CRUDCOMPTE/create-compte/create-compte.component';
import {ViewCompteComponent} from './components/CRUDCOMPTE/view-compte/view-compte.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: "dashboard", component: DashboardComponent},
  {path: "view", component: ViewComponent},
  {path: "create", component: CreateComponent},
  {path: "update-client/:id", component: CreateComponent},
  {path: "login", component: LoginComponent},
  {path: "create-compte", component: CreateCompteComponent},
  {path: "update-compte/:id", component: CreateCompteComponent},
  {path: "view-compte", component: ViewCompteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
