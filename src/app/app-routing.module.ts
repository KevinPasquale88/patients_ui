import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientSearchComponent } from './patient-search/patient-search.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  { path: '', component: PatientSearchComponent },
  { path: 'searchpatient', component: PatientSearchComponent },
  { path: 'patientlist', component: PatientListComponent },
  { path: 'patient/:index', component: PatientComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
