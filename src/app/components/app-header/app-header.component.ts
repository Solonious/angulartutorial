import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { WidgetService } from '../../services/widget.service';

import { EnvTitle } from '../../models/env-title';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.css'],
    providers: [WidgetService]
})

export class AppHeaderComponent implements OnInit {
    @Output() onGetEnvUrl = new EventEmitter<string>();
    titlesData: EnvTitle;
    version: any;
    titles: EnvTitle[] = [
        {title: 'TEST ENV.', url: 'https://freeserv.php-test.site.dukascopy.com', type: 'TEST'},
        {title: 'PRE ENV.', url: 'http://freeserv-pre.php-test.site.dukascopy.com', type: 'PRE'},
        {title: 'LIVE ENV.', url: 'https://freeserv.dukascopy.com/2.0', type: 'LIVE'},
        {title: 'LOCAL ENV.', url: '//172.16.73.35/widgetserver', type: 'LOCAL'},
    ];
    constructor(public widgetService: WidgetService) {}
    ngOnInit() {
        this.titlesData = this.titles[0];
        this.sendEnvUrl(this.titlesData.url);
        this.getVersion(this.titlesData.url);
    }
    getVersion(url: string): void {
        this.version = '';
        this.widgetService.getVersion(url).subscribe(res => this.version = res);
    }
    onChange(title: string): void {
        this.setTitlesData(this.titles.filter(item => item.title === title)[0]);
        this.sendEnvUrl(this.titlesData.url);
        this.getVersion(this.titlesData.url);
    }
    sendEnvUrl(url: string): void {
        this.onGetEnvUrl.emit(url);
    }
    setTitlesData(data: EnvTitle): void {
        this.titlesData = data;
    }
}
