import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Hero} from './Hero';
import {MessageService} from './message.service';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HeroService {
    private heroesUrl = 'api/heroes';

    constructor(private messageService: MessageService, private http: HttpClient) {
    }

    getHeroes(): Observable<Hero[]> {
        this.messageService.add('HerroService: fetched heroes');
        return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
                tap((heros: Hero[]) => this.log(`herosList: ${heros.length}`)),
                catchError(this.handleError('getHeroes', []))
            );
    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        this.messageService.add('HerroService: fetched hero');
        return this.http.get<Hero>(url)
            .pipe(
                tap((hero: Hero) => this.log(`getHero id=${hero.id}`)),
                catchError(this.handleError<Hero>('addHero'))
            );
    }

    log(data): void {
        console.log(data);
    }

    updateHero(hero: Hero) {
        const httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        this.messageService.add('HerroService: fetched update');
        return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
            tap(_ => this.log(`update Hero id: ${hero.id}`)),
            catchError(this.handleError<any>('updateHero'))
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

