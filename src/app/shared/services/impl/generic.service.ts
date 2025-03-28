import { Injectable } from '@angular/core';
import {IGenericService} from '../IGenericService';
import {Observable} from 'rxjs';
import {RestResponseModel} from '../../models/rest-response.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> implements IGenericService<T>{
  protected endPoint!: string;
  protected apiUrl! : string;
  constructor(protected httpClient: HttpClient) {
  }

  create(item: T): Observable<RestResponseModel<T>> {
    return this.httpClient.post<RestResponseModel<T>>(this.apiUrl, item);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAll(): Observable<RestResponseModel<T[]>> {
    return this.httpClient.get<RestResponseModel<T[]>>(this.apiUrl);
  }

  getOne(id: number): Observable<RestResponseModel<T>> {
    return this.httpClient.get<RestResponseModel<T>>(`${this.apiUrl}/${id}`);
  }

  update(item: T, id: number): Observable<RestResponseModel<T>> {
    return this.httpClient.post<RestResponseModel<T>>(`${this.apiUrl}/${id}`, item);
  }

  getAllWithPaginate(page: number, size: number): Observable<RestResponseModel<T[]>> {
    return this.httpClient.get<RestResponseModel<T[]>>(`${this.apiUrl}?page=${page}&size=${size}`);

  }
}
