import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

export class Patient {
  constructor(public idpatients: string, public name: string, public surname: string, public fiscalcode: string, public birthday: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class SearchsubmitService {
  server = "localhost";
  port = "9090";

  constructor(private http: HttpClient) { }

  searchPatient(name: string, surname: string) {
    const params = new HttpParams().set('name', name).set('surname', surname);
    return this.http.get<Patient[]>(`http://${this.server}:${this.port}/patientapi/getPatients`, { params });
  }

  setListOfPatients(storage: Patient[]) {
    Cookie.set('storagelistpatient', JSON.stringify(storage));
  }

  getListOfPatients() {
    return JSON.parse(Cookie.get('storagelistpatient'));
  }

  setIdPatient(idPatient: string) {
    Cookie.set('idPatient', idPatient);
  }

  getIdPatient() {
    return Cookie.get('idPatient');
  }

  getPatient() {
    for (var patient of this.getListOfPatients()) {
      if (patient.idpatients === this.getIdPatient()) {
        return patient;
      }
    }
    return undefined;
  }

  clear() {
    Cookie.deleteAll();
  }
}
