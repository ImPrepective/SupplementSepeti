import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { County } from '../models/county';
import { ListResponseModel } from '../models/ListResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CountyService {

  private apiUrl = "http://localhost:23481/api/"    
  constructor(private httpClient:HttpClient) { }   
  
  
   getCaunties():Observable<ListResponseModel<County>> 
   {     let newPath = this.apiUrl + "counties/getall"    
    return this.httpClient.get<ListResponseModel<County>>(newPath);   }
}
