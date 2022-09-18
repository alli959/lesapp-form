import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class APIService {
  ENDPOINT = 'https://8iu5izdtgc.execute-api.eu-west-1.amazonaws.com/dev/speak';
  GETENDPOINT = 'https://8iu5izdtgc.execute-api.eu-west-1.amazonaws.com/dev/get';
  LISTENENDPOINT = 'https://8iu5izdtgc.execute-api.eu-west-1.amazonaws.com/dev/listen';
  constructor(private http:HttpClient) {}
  speak(data:any) {
    console.log("data =", data);
    return this.http.post(this.ENDPOINT, data);
  }
  get(params:any) {
    return this.http.get(this.GETENDPOINT, {
      params: {
        ...params
      }
    });
  }
  listen(data:any) {
    return this.http.post(this.LISTENENDPOINT, data);
  }

  getText(url:any) {
    
    return this.http.get(url, { responseType: 'text' as 'text'});
  }

  
}