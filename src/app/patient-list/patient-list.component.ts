import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient, SearchsubmitService } from '../services/searchsubmit.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  titlecop = 'LISTA PAZIENTI';

  patients: Patient[] = [];

  constructor(private searchsubmitService: SearchsubmitService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.patients = this.searchsubmitService.getListOfPatients();
  }

  selectPatient(patient: Patient) {
    console.log(patient);
    console.log(patient.idpatients);
    this.router.navigate(['patient', patient.idpatients]);
  }

  back() {
    this.router.navigate(['searchpatient']);
  }
}
