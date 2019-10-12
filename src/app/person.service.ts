import { Injectable } from '@angular/core';
import { Person } from './person';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private PersonesUrl = 'https://person-client-api.herokuapp.com/api/client/person/';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Persones from the server */
  getPersons(): Observable<Person[]> {
    this.log('All Persons fetched succesfully');
    return this.http.get<Person []>(this.PersonesUrl);
  }
  /** Log a PersonService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PersonService: ${message}`);
  }
  getPerson(id: number): Observable<Person> {
    const url = `${this.PersonesUrl}id?personId=${id}`;
    return this.http.get<Person>(url).pipe(
      tap(_ => this.log(`fetched person id=${id}`)),
      catchError(this.handleError<Person>(`getPerson id=${id}`))
    );
  }
    /** PUT: update the hero on the server */
  updatePerson(person: Person): Observable<any> {
    const url = `${this.PersonesUrl}?id=${person.personId}`;
    return this.http.put(url, person, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${person.personId}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
/** POST: add a new hero to the server */
addPerson(person: Person): Observable<Person> {
  return this.http.post<Person>(this.PersonesUrl, person, this.httpOptions).pipe(
    tap((newPerson: Person) => this.log(`added hero w/ id=${newPerson.personId}`)),
    catchError(this.handleError<Person>('addPerson'))
  );
}
  deletePerson(person: Person | number): Observable<Person> {
    const id = typeof person === 'number' ? person : person.personId;
    const url = `${this.PersonesUrl}/?id=${id}`;
    return this.http.delete<Person>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted person id=${id}`)),
      catchError(this.handleError<Person>('deleteHero'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
