import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonDashboardComponent } from './person-dashboard/person-dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { ListPersonComponent } from './list-person/list-person.component';
import { AddPersonComponent } from './add-person/add-person.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'persondashboard', component: PersonDashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'persondetail/:id', component: PersonDetailComponent },
  { path: 'addperson', component: AddPersonComponent },
  { path: 'personlist', component:  ListPersonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
