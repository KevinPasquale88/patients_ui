import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam, ExamInfo, SearchExamService } from '../services/search-exam.service';
import { Patient, SearchsubmitService } from '../services/searchsubmit.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  titlecop = 'SCHEDA PAZIENTE';

  //boolean for choose the visibility
  visibleExamList = false;
  visibleFormSave = false;
  messageok = false;
  errorsapi = false;
  state: string = 'Salvataggio';

  examList: Exam[] = [];

  patient = new Patient('', '', '', '', '');

  exampCompleteToUpdate!: Exam;
  formGroup;


  constructor(private searchsubmitService: SearchsubmitService, private route: ActivatedRoute, private router: Router, private searchExamService: SearchExamService, private formBuilder: FormBuilder) {
    this.searchsubmitService.setIdPatient(this.route.snapshot.params['idpatient']);
    this.patient = this.searchsubmitService.getPatient() || new Patient('', '', '', '', '');
    this.formGroup = this.formBuilder.group({
      dataexam: '',
      hourexam: '',
      typeexam: '',
      motivoexam: '',
      anamnesi: ''
    });
  }

  ngOnInit(): void {
  }

  clear() {
    if(this.state == 'Modifica'){
      this.visibleExamList = true;
    }else{
      this.visibleExamList = false;
    }
    this.patient = this.searchsubmitService.getPatient() || new Patient('', '', '', '', '');
    this.formGroup = this.formBuilder.group({
      dataexam: '',
      hourexam: '',
      typeexam: '',
      motivoexam: '',
      anamnesi: ''
    });
    this.state = 'Salvataggio';
    this.errorsapi = false;
    this.visibleFormSave = false;
    this.messageok = false;
    this.ngOnInit();
  }

  caricaListaEsami() {
    this.messageok = false;
    this.errorsapi = false;
    this.visibleFormSave = false;
    this.searchExamService.getExamForIdPatient(this.searchsubmitService.getIdPatient()).subscribe(response => {
      this.examList = response;
      this.visibleExamList = true;
    }, errors => {
      console.log(errors);
      this.errorsapi = true;
    })
  }

  insert() {
    this.messageok = false;
    this.errorsapi = false;
    this.visibleExamList = false;
    this.visibleFormSave = true;
    this.state = 'Salvataggio';
    this.formGroup = this.formBuilder.group({
      dataexam: '',
      hourexam: '',
      typeexam: '',
      motivoexam: '',
      anamnesi: ''
    });
  }

  selectexamforupdate(idexams: string) {
    this.visibleExamList = false;
    this.visibleFormSave = true;
    this.state = 'Modifica';
    for (var exam of this.examList) {
      if (exam.idexams === idexams) {
        this.exampCompleteToUpdate = exam;
        this.formGroup = this.formBuilder.group({
          dataexam: this.exampCompleteToUpdate.dateexam,
          hourexam: this.exampCompleteToUpdate.hourexam,
          typeexam: this.exampCompleteToUpdate.examtype,
          motivoexam: this.exampCompleteToUpdate.justification,
          anamnesi: this.exampCompleteToUpdate.anamnesis
        });
      }
    }
  }

  deleteexam(idexams: string){
    this.visibleExamList = false;
    this.visibleFormSave = false;
    this.state = 'Cancellazione';
    this.searchExamService.deleteExam(idexams).subscribe(response => {
      if (response.result == 'OK') {
        this.messageok = true;
      } else {
        this.errorsapi = true;
      }
    }, errors => {
      console.log(errors);
      this.errorsapi = true;
    });
  }

  back() {
    this.searchsubmitService.clear();
    this.router.navigate(['searchpatient']);
  }

  onSubmit(formData: any) {
    if (this.state == 'Salvataggio') {
      this.searchExamService.saveExam(new ExamInfo(formData['dataexam'], formData['hourexam'], formData['typeexam'], formData['motivoexam'], formData['anamnesi'], this.searchsubmitService.getIdPatient())).subscribe(response => {
        if (response.result == 'OK') {
          this.messageok = true;
        } else {
          this.errorsapi = true;
        }
      }, errors => {
        console.log(errors);
        this.errorsapi = true;
      });
    } else {
      this.searchExamService.updateExam(new ExamInfo(formData['dataexam'], formData['hourexam'], formData['typeexam'], formData['motivoexam'], formData['anamnesi'], this.searchsubmitService.getIdPatient()), this.exampCompleteToUpdate.idexams).subscribe(response => {
        if (response.result == 'OK') {
          this.messageok = true;
        } else {
          this.errorsapi = true;
        }
      }, errors => {
        console.log(errors);
        this.errorsapi = true;
      });
    }
    this.clear();
  }

  resetForm() {
    this.formGroup = this.formBuilder.group({
      dataexam: '',
      hourexam: '',
      typeexam: '',
      motivoexam: '',
      anamnesi: ''
    });
  }
}
