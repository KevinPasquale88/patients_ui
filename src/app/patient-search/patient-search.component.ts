import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchsubmitService } from '../services/searchsubmit.service';



@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.css']
})
export class PatientSearchComponent implements OnInit {
  titlecop = 'RICERCA PAZIENTE'
  
  name = '';
  surname = '';
  noresult = false;

  constructor(private route: Router, private searchsubmitService: SearchsubmitService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.searchsubmitService.searchPatient(this.name, this.surname).subscribe(response => {
      console.log(response);
      this.searchsubmitService.setListOfPatients(response);
      if(response.length == 0){
        this.noresult = true;
        this.ngOnInit();
      }else{
        this.route.navigate(['patientlist']);
      } 
    });
  }

}
