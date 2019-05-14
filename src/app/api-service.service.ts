import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, first } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface ApiConfig {
    API_URL: string;
}

export const API_CONFIG_PATH = environment.production ?
                               './assets/api-url-config.json' :
                               '../assets/api-url-config.json';


@Injectable({
    providedIn: 'root'
})
export class ApiConfigService {

    private apiUrl = '';

    constructor(private http: HttpClient) {}

    getApiUrl(): Observable<ApiConfig> {
        /*
            This function just shows off how the method works
        */
        return this.http.get<ApiConfig>(API_CONFIG_PATH)
            .pipe(
                first(),
                delay(3000)
            );

        /*
            This would be the actual function I would use
        */
        // this.http.get<ApiConfig>(API_CONFIG_PATH)
        //     .pipe(
        //         first()
        //     )
        //     .subscribe(
        //         (apiConfig) => {
        //             console.log(apiConfig);
        //             this.apiUrl = apiConfig.API_URL;
        //         }
        //     );
    }

    /*
        Call regular API methods down here,
        AFTER calling getApiUrl
    */
}
