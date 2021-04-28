import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamComplete, ExamInfo, SearchExamService } from '../services/search-exam.service';
import { Patient, SearchsubmitService } from '../services/searchsubmit.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  titlecop = 'SCHEDA PAZIENTE';

  visibleExamList = true;

  radio_button_value = '';
  examList: ExamComplete[] = [];

  patient = new Patient('', '', '', '', '');

  exampCompleteToUpdate!: ExamComplete;

  state: string = 'salva';
  formGroup;

  constructor(private searchsubmitService: SearchsubmitService, private route: ActivatedRoute, private router: Router, private searchExamService: SearchExamService, private formBuilder: FormBuilder) {
    searchExamService.setIdPatient(this.route.snapshot.params['idpatient']);
    this.patient = this.searchsubmitService.getPatient(this.searchExamService.getIdPatient()) || new Patient('', '', '', '', '');
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

  caricaListaEsami(){
    this.visibleExamList = true;
    this.searchExamService.getExamForIdPatient(this.searchExamService.getIdPatient()).subscribe(response => {
      console.log(response);
      this.examList = response;
    })
  }

  comprimilista(){
    this.visibleExamList = false;
  }

  insert() {
    this.visibleExamList = false;
    this.state = 'salva';
  }

  update() {
    this.visibleExamList = false;
    this.state = 'modifica';
    this.searchExamService.getExam(this.radio_button_value).subscribe(response => {
      console.log(response);
      this.exampCompleteToUpdate = response;
    });
  }

  delete() {
    this.visibleExamList = true;
    this.searchExamService.getExamForIdPatient(this.searchExamService.getIdPatient()).subscribe(response => {
      this.examList = response;
    });
  }

  back() {
    this.searchsubmitService.clear();
    this.searchExamService.clear();
    this.router.navigate(['searchpatient']);
  }

  onSubmit(formData: any) {
    console.log(formData);
    if (this.state == 'salva') {
      this.searchExamService.saveExam(new ExamInfo(formData['dataexam'], formData['hourexam'], formData['typeexam'], formData['motivoexam'], formData['anamnesi'], this.searchExamService.getIdPatient())).subscribe(response => {
        console.log(response);
      });
    } else {
      this.searchExamService.updateExam(new ExamInfo(formData['dataexam'], formData['hourexam'], formData['typeexam'], formData['motivoexam'], formData['anamnesi'], this.searchExamService.getIdPatient()), this.exampCompleteToUpdate.idexams).subscribe(response => {
        console.log(response);
      });
    }
    this.delete();
  }
}
