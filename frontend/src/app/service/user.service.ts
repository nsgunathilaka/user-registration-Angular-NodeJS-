import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  login(data: any) {
    console.log(data)
    return this.httpClient.post(
      "http://localhost:8085/api/user/login", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  register(data: any) {
    return this.httpClient.post(this.baseURL +
      "/api/user/signup", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  findById(id:any) {
    return this.httpClient.get("http://localhost:8085/api/user/findById/"+id)
  }

}
