import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  getMethodAxios = (url: any) => new Promise((resolve, reject) => {
    axios.get(url)
      .then((response) => {
        resolve(response);
      }).catch((error) => {
        console.log(error);
        reject(error);
      });
  })

  postMethodAxios = (url: any, body: any) => new Promise((resolve, reject) => {
    axios.post(url, body)
      .then((response) => {
        resolve(response);
      }).catch((error) => {
        console.log(error);
        reject(error);
      });
  })

  // TO Get a document from POST api and save Files in Docx Formate
  postDownloadFile(url: string, body: any) {
    return this.download(url, JSON.stringify(body))
      .subscribe((response) => {

        console.log(response);

        let file = new Blob([response.body], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
        const fileUrl = URL.createObjectURL(file);
        saveAs(file, `${body.customer_name}_${body.project_name.toString().replace(' ', '_')}.docx`)
        // const child = window.open(fileUrl);
      });
  }

  download(url: string, formData: any): Observable<any> {
    const requestOptions: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      })
    };
    const request = new Request(requestOptions);
    return this.http.post(url, formData, requestOptions);
  }
}
