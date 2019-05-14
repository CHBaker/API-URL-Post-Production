import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { ApiConfigService } from './api-service.service';

export interface Star {
    top: number;
    left: number;
    size: number;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild('container') container: ElementRef;

    url: string;

    constructor(
        private apiConfigService: ApiConfigService,
        private renderer: Renderer2
    ) {}

    ngOnInit() {
        this.generateStars();
        this.getApiUrl();
    }

    getApiUrl(): void {
        console.log('fetching api url')
        this.apiConfigService.getApiUrl()
            .subscribe(
                (apiConfig) => {
                    console.log('api fetched')
                    this.url = apiConfig.API_URL;
                    console.log(apiConfig)
                }
            );
    }

    generateStars(): void {
        const height = this.container.nativeElement.offsetHeight;
        const width = this.container.nativeElement.offsetWidth;

        for (let i = 0; i < 50; i++) {
            const star = this.renderer.createElement('div');
            const size = this.getRandomInt(1, 8)
            this.renderer.addClass(star, 'star');
            this.renderer.setStyle(star, 'top', this.getRandomInt(0, height));
            this.renderer.setStyle(star, 'left', this.getRandomInt(0, width));
            this.renderer.setStyle(star, 'width', size);
            this.renderer.setStyle(star, 'height', size);
            this.renderer.appendChild(this.container.nativeElement, star);
        }
    }

    getRandomInt(min, max): string {
        min = Math.ceil(min);
        max = Math.floor(max);
        return (Math.floor(Math.random() * (max - min + 1)) + min).toString() + 'px';
    }
}
