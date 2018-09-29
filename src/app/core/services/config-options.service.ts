import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionsService {
  config:object = {
    id: '',
    login: '',
    email: ''
  };

  constructor() { }

  getConfig() {
    return this.config;
  }

  setConfig(config) {
    this.config = config;
  }
}
