import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Patient {

  constructor(public idpatient: string, public name: string, public surname: string, public fiscalcode: string, public birthday: string) { }
}

export class Exam {

  constructor(public idexam: string, public dataexam: string, public justification: string, public typeexam: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class SearchsubmitService {
  server = "localhost";
  port = "9090";

  storagelistpatient: Patient[] = [];

  constructor(private http: HttpClient) { }

  searchPatient(name: string, surname: string) {
    console.log(name);
    console.log(surname);
    const params = new HttpParams().set('name', name).set('surname', surname);
    return this.http.get<Patient[]>(`http://${this.server}:${this.port}/patientapi/getPatients`, { params });
  }

  getExamForIdPatient(idpatient: string) {
    console.log(idpatient);
    const params = new HttpParams().set('idpatient', idpatient);
    return this.http.get<Exam[]>(`http://${this.server}:${this.port}/patientapi/getExams`, { params });
  }

  setListOfPatients(storage: Patient[]) {
    this.storagelistpatient = storage;
  }

  getListOfPatients() {
    return this.storagelistpatient;
  }
}
