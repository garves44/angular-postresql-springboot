import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationsListComponent } from './components/application-list/application-list.component';
import { ApplicationDetailsComponent } from './components/application-details/application-details.component';
import { AddApplicationComponent } from './components/add-application/add-application.component';

const routes: Routes = [
  { path: '', redirectTo: 'applications', pathMatch: 'full' },
  { path: 'applications', component: ApplicationsListComponent },
  { path: 'applications/:id', component: ApplicationDetailsComponent },
  { path: 'add', component: AddApplicationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
