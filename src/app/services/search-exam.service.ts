import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ExamComplete {

  constructor(public idexams: string, public dateexam: Date, public hourexam: string, public justification: string, public examtype: string, public anamnesis: string, public idpatients: string) { }
}

export class ExamInfo {
  constructor(public dateexam: Date, public hourexam: string, public justification: string, public examtype: string, public anamnesis: string, public idPatient: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class SearchExamService {
  server = "localhost";
  port = "9090";
  storagelistexam: ExamComplete[] = [];

  examselected!: ExamComplete;
  idpatient: string = '';
  constructor(private http: HttpClient) { }

  setIdPatient(idpatient: string) {
    this.idpatient = idpatient;
  }

  getIdPatient() {
    return this.idpatient;
  }

  clear() {
    this.storagelistexam = [];
    this.idpatient = '';
    this.examselected = new ExamComplete('', new Date(), '', '', '', '', '');
  }

  getExamForIdPatient(idpatient: string) {
    console.log("getExamForIdPatient " +idpatient);
    const params = new HttpParams().set('idpatient', idpatient);
    return this.http.get<ExamComplete[]>(`http://${this.server}:${this.port}/patientapi/getExams`, { params });
  }

  getExam(idexam: string) {
    const params = new HttpParams().set('idexam', idexam);
    return this.http.get<ExamComplete>(`http://${this.server}:${this.port}/patientapi/getExam`, { params });
  }

  saveExam(examsave: ExamInfo) {
    return this.http.post<ExamInfo>(`http://${this.server}:${this.port}/patientapi/saveExam`, examsave);
  }

  updateExam(examupdate: ExamInfo, idexam: string) {
    const params = new HttpParams().set('idexam', idexam);
    return this.http.post<ExamInfo>(`http://${this.server}:${this.port}/patientapi/updateExam`, examupdate, { params });
  }
}
