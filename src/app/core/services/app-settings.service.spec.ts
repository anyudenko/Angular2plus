import { TestBed } from '@angular/core/testing';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

import { AppSettingsService } from './app-settings.service';


describe('AppSettingsService (with TestBed)', () => {
  let service: AppSettingsService;
  let localStorageSpy: jasmine.SpyObj<LocalStorageService>;
  let httpSpy: jasmine.SpyObj<HttpClient>;


  beforeEach(() => {
    const spyLS = jasmine.createSpyObj(
      'LocalStorageService',
      ['getItem', 'setItem']
    );

    const spyHttp = jasmine.createSpyObj(
      'HttpClient',
      ['get']
    );

    TestBed.configureTestingModule({
      providers: [
        AppSettingsService,
        { provide: LocalStorageService, useValue: spyLS },
        { provide: HttpClient, useValue: spyHttp }
      ]
    });

    service = TestBed.get(AppSettingsService);
    localStorageSpy = TestBed.get(LocalStorageService);
    httpSpy = TestBed.get(HttpClient);
  });


  it('getSettings should return value from LS (if the value exists in LS)', () => {
    const stubValueLS = {data: 'LS value'};

    //LS stores JSON.stringify value
    const stringifyStubValueLS = JSON.stringify(stubValueLS);

    localStorageSpy.getItem.and.returnValue(stringifyStubValueLS);

    service.getSettings().then(settings => {
      expect(settings.data).toBe(stubValueLS.data);
    });
  });

  it('getSettings should return value from json file (if the value doesn\'t exists in LS)', () => {
    const stubValueLS = null;
    const stubValueHttp = {data: 'Json file value'};

    localStorageSpy.getItem.and.returnValue(stubValueLS);
    httpSpy.get.and.returnValue(stubValueHttp);

    service.getSettings().then(settings => {
      expect(settings.data).toBe(stubValueHttp.data);
    });
  });

});
