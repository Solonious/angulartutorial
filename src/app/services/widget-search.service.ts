import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Widget }           from '../models/widget';

@Injectable()
export class WidgetSearchService {

    constructor(private http: Http) {}

    search(term: string): Observable<Widget[]> {
        return this.http
            .get(`api/heroes/?name=${term}`)
            .map(response => response.json().data as Widget[]);
    }
}