import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import {  HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private baseUrl;
  constructor(private http:HttpClient) { 
    this.baseUrl = environment.baseUrl;
  }

  getData(endpoint):Observable<any>{
    return this.http.get(this.baseUrl+endpoint);
  }
}
