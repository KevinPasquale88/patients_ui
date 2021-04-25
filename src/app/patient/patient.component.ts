import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Examfeedback, SearchExamService } from '../services/search-exam.service';
import { Exam, Patient, SearchsubmitService } from '../services/searchsubmit.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  titlecop = 'SCHEDA PAZIENTE';

  examlist = true;

  idpatient: string = '';

  patient!: Patient;

  constructor(private searchsubmitService: SearchsubmitService, private route: ActivatedRoute, private router: Router, private searchExamService: SearchExamService) {
    this.idpatient = this.route.snapshot.params['index'];
    console.log(this.idpatient);
    for (var patient of this.searchsubmitService.getListOfPatients()) {
      if (patient.idpatient === this.idpatient) {
        this.patient = patient;
      }
    }
  }

  ngOnInit(): void {
    this.searchsubmitService.getExamForIdPatient(this.idpatient).subscribe(response => {
      console.log(response);
      this.searchExamService.setlistexamforpatient(response);
    })
  }

  modificaorsalva(examfeed: Examfeedback) {
    this.examlist = false;
    if (examfeed.eventselected === 'modifica') {
      this.searchExamService.getExam(examfeed.idexamselected).subscribe(response => {
        console.log(response);
        this.searchExamService.setexamforpatient(response);
      });
    }
  }

  saveorback(eventsave:string){
    console.log(eventsave);
    this.examlist = true;
  }

  back() {
    this.router.navigate(['searchpatient']);
  }
}
