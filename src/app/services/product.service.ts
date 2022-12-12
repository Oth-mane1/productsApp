import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const apiUrl: string = 'http://localhost:5000/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl);
  }

  get(id: any): Observable<Product> {
    return this.http.get<Product>(`${apiUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(apiUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${apiUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${apiUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(apiUrl);
  }

  findByName(name: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${apiUrl}/search/${name}`);
  }
}
