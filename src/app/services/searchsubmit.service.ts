import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Patient {

  constructor(public idpatients: string, public name: string, public surname: string, public fiscalcode: string, public birthday: string) { }
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
    const params = new HttpParams().set('name', name).set('surname', surname);
    return this.http.get<Patient[]>(`http://${this.server}:${this.port}/patientapi/getPatients`, { params });
  }

  setListOfPatients(storage: Patient[]) {
    this.storagelistpatient = storage;
  }

  clear() {
    this.storagelistpatient = [];
  }

  getListOfPatients() {
    return this.storagelistpatient;
  }

  getPatient(idPatient: string) {
    for (var patient of this.storagelistpatient) {
      if (patient.idpatients === idPatient) {
        return patient;
      }
    }
    return undefined;
  }
}
