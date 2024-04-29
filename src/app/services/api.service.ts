import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Auth from '@aws-amplify/auth';
import API from '@aws-amplify/api-rest';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  ENDPOINT = 'https://8iu5izdtgc.execute-api.eu-west-1.amazonaws.com/dev/speak';
  GETENDPOINT =
    'https://8iu5izdtgc.execute-api.eu-west-1.amazonaws.com/dev/get';
  LISTENENDPOINT =
    'https://8iu5izdtgc.execute-api.eu-west-1.amazonaws.com/dev/listen';
  DELETEENDPOINT =
    'https://8iu5izdtgc.execute-api.eu-west-1.amazonaws.com/dev/delete';
  UPDATEENDPOINT =
    'https://8iu5izdtgc.execute-api.eu-west-1.amazonaws.com/dev/update';
  constructor(private http: HttpClient) {}

  speak(data: any) {
    return this.http.post(this.ENDPOINT, data);
  }

  async get(params: any) {
    let token = (await Auth.currentSession()).getIdToken().getJwtToken();
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    return this.http.get(this.GETENDPOINT, {
      params: {
        ...params,
      },
    });
  }
  listen(data: any) {
    return this.http.post(this.LISTENENDPOINT, data);
  }

  getText(url: any) {
    return this.http.get(url, { responseType: 'text' as 'text' });
  }

  delete(params: any) {
    return this.http.delete(this.DELETEENDPOINT, {
      params: {
        ...params,
      },
    });
  }
  update(data: any) {
    return this.http.patch(this.UPDATEENDPOINT, data);
  }
}
