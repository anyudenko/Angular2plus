import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  private appSettingsJsonUrl = 'http://localhost:5000/urls'; // assets/app-settings.json

  defaultAppSettings = {
    urls: {
      productsUrl: "http://localhost:3000/products"
    }
  };

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) { }

  getSettings = async function() {
    let settings;
    const lsSettings = this.localStorageService.getItem('AppSettings');

    if(lsSettings) {
      settings = JSON.parse(lsSettings);
    } else {
      const appSettings= await this.readJson();

      if(appSettings) {
        settings = appSettings;

        this.localStorageService.setItem(
          'AppSettings',
          JSON.stringify(settings)
        );
      } else {
        settings = this.defaultAppSettings;
      }
    }

    return settings;
  }

  readJson = function(): Promise<any> {
    return this.http.get(this.appSettingsJsonUrl)
      .toPromise()
      .then(response => <any>response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
