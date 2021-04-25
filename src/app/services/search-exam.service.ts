import { Time } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exam } from './searchsubmit.service';

export class Examfeedback {
  constructor(public eventselected: string, public idexamselected: string) { }
}

export class ExamComplete {

  constructor(public idexam: string, public dataexam: Date, public hourexam: Time, public justification: string, public typeexam: string, public anamnesis: string) { }
}


@Injectable({
  providedIn: 'root'
})
export class SearchExamService {
  server = "localhost";
  port = "8080";
  storagelistexam: Exam[] = [];

  examselected!: ExamComplete;

  constructor(private http: HttpClient) { }

  setlistexamforpatient(exams: Exam[]) {
    this.storagelistexam = exams;
  }

  getlistexamforpatient() {
    return this.storagelistexam;
  }

  setexamforpatient(exam: ExamComplete) {
    this.examselected = exam;
  }

  getexamforpatient() {
    return this.examselected;
  }

  getExam(idexam: string) {
    console.log(idexam);
    const params = new HttpParams().set('idexam', idexam);
    return this.http.get<ExamComplete>(`http://${this.server}:${this.port}/patintapi/getExam`, { params });
  }

  saveExam(examsave: ExamComplete) {
    console.log(ExamComplete);
    return this.http.post<ExamComplete>(`http://${this.server}:${this.port}/patintapi/saveExam`, examsave);
  }

  updateExam(examupdate: ExamComplete) {
    console.log(ExamComplete);
    const params = new HttpParams().set('idexam', examupdate.idexam);
    return this.http.post<ExamComplete>(`http://${this.server}:${this.port}/patintapi/updateExam`, examupdate, { params });
  }
}
