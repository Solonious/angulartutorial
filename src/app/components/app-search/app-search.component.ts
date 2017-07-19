import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { WidgetSearchService } from '../../services/widget-search.service';
import { Widget } from '../../models/widget';

@Component({
    selector: 'app-search',
    templateUrl: './app-search.component.html',
    styleUrls: [ './app-search.component.css' ],
    providers: [WidgetSearchService]
})
export class AppSearchComponent implements OnInit {
    heroes: Observable<Widget[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private widgetSearchService: WidgetSearchService,
        private router: Router) {}

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.heroes = this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            // .switchMap(term => term   // switch to new observable each time the term changes
            //     // return the http search observable
            //     ? this.heroSearchService.search(term)
            //     // or the observable of empty heroes if there was no search term
            //     : Observable.of<Widget[]>([]))
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<Widget[]>([]);
            });
    }

    gotoDetail(hero: Widget): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}
