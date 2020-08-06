import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component'; 
import { AdminViewComponent } from './admin-view/admin-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'admin', component: AdminViewComponent },
  { path: '', redirectTo: 'form', pathMatch: 'full' }, 
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [FormComponent, AdminViewComponent];
