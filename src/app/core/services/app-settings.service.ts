import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';

import appSettings from '../../../assets/app-settings.json';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  defaultAppSettings = {
    urls: {
      productsUrl: "http://localhost:3000/products"
    }
  };

  constructor(private localStorageService: LocalStorageService) { }

  getSettings() {
    let settings = this.localStorageService.getItem('AppSettings');

    if(settings) {
      settings = JSON.parse(settings);
    } else {
      settings = appSettings;

      if(settings) {
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
}
