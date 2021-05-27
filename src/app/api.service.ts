import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  // defines iTunes API path for 3 songs
  private ITUNES_API = "https://itunes.apple.com/search?limit=3&entity=song&term=";
  constructor(private http: HttpClient) { }

  public search(searchTerm: string){
    // appends the input search term to the GET request
    return this.http.get(
      this.ITUNES_API + searchTerm
      ).pipe(
           map((data: any[]) => {
             return data;
           }), catchError( error => {
             return throwError( 'Error!' );
           })
        )
    }
}
