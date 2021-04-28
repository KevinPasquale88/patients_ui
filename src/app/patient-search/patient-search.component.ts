import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchsubmitService } from '../services/searchsubmit.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.css']
})
export class PatientSearchComponent implements OnInit {
  titlecop = 'RICERCA PAZIENTE'

  formGroup;
  noresult = false;

  constructor(private route: Router, private searchsubmitService: SearchsubmitService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: '',
      surname: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(formData: { [x: string]: any; }) {
    var name = formData['name'];
    var surname = formData['surname'];
    this.searchsubmitService.searchPatient(name, surname).subscribe(response => {
      this.searchsubmitService.setListOfPatients(response);
      if (response.length == 0) {
        this.noresult = true;
        this.ngOnInit();
      } else {
        this.route.navigate(['patientlist']);
      }
    });
  }

}
