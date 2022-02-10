import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class APIService {
  ENDPOINT = 'https://si7jh53lg1.execute-api.eu-west-1.amazonaws.com/dev/speak';
  constructor(private http:HttpClient) {}
  speak(data:any) {
    console.log("data =", data);
    return this.http.post(this.ENDPOINT, data);
  }
}