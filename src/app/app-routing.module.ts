import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceComponent } from './resource/resource.component';
import { ProjectComponent } from './project/project.component';
import { FormulaComponent } from './formula/formula.component';
import { LoginComponent } from './login/login.component';
import { GuardService } from './services/guard.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'resource', component: ResourceComponent, canActivate: [GuardService] },
  { path: 'project', component: ProjectComponent, canActivate: [GuardService] },
  { path: 'formula', component: FormulaComponent, canActivate: [GuardService] },
  // { path: 'resource', component: ResourceComponent},
  // { path: 'project', component: ProjectComponent},
  // { path: 'formula', component: FormulaComponent},

  { path: '***', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
