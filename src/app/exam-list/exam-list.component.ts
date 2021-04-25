import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Examfeedback, SearchExamService } from '../services/search-exam.service';
import { Exam, SearchsubmitService } from '../services/searchsubmit.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {

  @Output() eventsaveorupdate = new EventEmitter<Examfeedback>();

  radio_button_value = '';

  examList: Exam[] = [];

  constructor(private searchsubmitService: SearchsubmitService, private searchExamService: SearchExamService) {

  }

  ngOnInit(): void {
    this.examList = this.searchExamService.getlistexamforpatient();
  }

  insert() {
    this.eventsaveorupdate.emit(new Examfeedback('salva', ''));
  }

  update() {
    this.eventsaveorupdate.emit(new Examfeedback('modifica', this.radio_button_value));
  }
}
