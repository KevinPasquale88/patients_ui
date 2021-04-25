import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExamComplete, SearchExamService } from '../services/search-exam.service';
import { Exam, SearchsubmitService } from '../services/searchsubmit.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  exampComplete!: ExamComplete;

  @Output() newEvent = new EventEmitter<string>();

  constructor(private searchsubmitService: SearchsubmitService, private searchExamService: SearchExamService) { }

  ngOnInit(): void {
    this.exampComplete = this.searchExamService.getexamforpatient();
  }

  save() {
    if(!this.exampComplete?.idexam || this.exampComplete?.idexam.length  === 0){
      this.searchExamService.saveExam(this.exampComplete).subscribe(response => {
        console.log(response);
      });
    }else{
      this.searchExamService.updateExam(this.exampComplete).subscribe(response => {
        console.log(response);
      });
    }
    this.newEvent.emit('salva');
  }

  delete() {
    this.newEvent.emit('back');
  }
}
