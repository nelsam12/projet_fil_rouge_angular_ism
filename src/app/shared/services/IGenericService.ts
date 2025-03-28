import {Observable} from 'rxjs';
import {RestResponseModel} from '../models/rest-response.model';

export interface IGenericService <T> {
  create(item: T): Observable<RestResponseModel<T>>;
  delete(id : number): Observable<void>;
  update(item: T, id:number): Observable<RestResponseModel<T>>;
  getOne(id: number): Observable<RestResponseModel<T>>;
  getAllWithPaginate(page: number, size: number): Observable<RestResponseModel<T[]>>;
  getAll(): Observable<RestResponseModel<T[]>>;
}
