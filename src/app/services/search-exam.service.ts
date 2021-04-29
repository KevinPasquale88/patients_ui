import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Exam {
  constructor(public idexams: string, public dateexam: Date, public hourexam: string, public justification: string, public examtype: string, public anamnesis: string, public idpatients: string) { }
}

export class ExamInfo {
  constructor(public dateexam: Date, public hourexam: string, public justification: string, public examtype: string, public anamnesis: string, public idPatient: string) { }
}

export class ResultSubmit {
  constructor(public result: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class SearchExamService {
  server = "localhost";
  port = "9090";

  constructor(private http: HttpClient) { }

  getExamForIdPatient(idpatient: string) {
    const params = new HttpParams().set('idpatient', idpatient);
    return this.http.get<Exam[]>(`http://${this.server}:${this.port}/patientapi/getExams`, { params });
  }

  saveExam(examsave: ExamInfo) {
    return this.http.post<ResultSubmit>(`http://${this.server}:${this.port}/patientapi/saveExam`, examsave);
  }

  updateExam(examupdate: ExamInfo, idexam: string) {
    const params = new HttpParams().set('idexam', idexam);
    return this.http.post<ResultSubmit>(`http://${this.server}:${this.port}/patientapi/updateExam`, examupdate, { params });
  }

  deleteExam(idexam: string) {
    const params = new HttpParams().set('idexam', idexam);
    return this.http.delete<ResultSubmit>(`http://${this.server}:${this.port}/patientapi/deleteExam`, { params });
  }
}
