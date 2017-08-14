import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GenresService {
  constructor(private http: Http) {}

  getAllGenres() {
    return this.http.get('/api/genres').map(res => res.json());
    //return [{ genre: 'sould', count: 123 }, { genre: 'sould', count: 123 }];
  }
}
