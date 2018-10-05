import {
  Component,
  OnInit,
  InjectionToken,
  Inject,
  Optional } from '@angular/core';

import {
  LocalStorageService,
  ConfigOptionsService,
  Generator,
  GeneratorNFactory } from '../../../core/services';

const CS = new InjectionToken<any>('ConstantsService');
const CSValue = { App: "TaskManager", Ver: "1.0" };

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.less'],
  providers: [
    { provide: LocalStorageService, useClass: LocalStorageService },
    { provide: CS, useValue: CSValue },
    { provide: Generator, useFactory: GeneratorNFactory(8)}
  ]
})
export class ContactUsComponent implements OnInit {
  constructor(
    @Optional() private localStorageService: LocalStorageService,
    @Optional() private configOptionsService: ConfigOptionsService,
    @Optional() @Inject(CS) private constantsService: any,
    @Optional() @Inject(Generator) private generatorService: string
  ) { }

  ngOnInit() {
    this.testServices();
  }

  testServices() {
    //localStorageService
    if(this.localStorageService) {
      console.log('*** test of localStorageService:');
      this.localStorageService.setItem('LS', 25);
      console.log('just created: LS =', this.localStorageService.getItem('LS'));
      this.localStorageService.removeItem('LS');
    }

    //configOptionsService
    if(this.configOptionsService) {
      console.log('*** test of configOptionsService:');
      this.configOptionsService.setConfig({
        id: 1,
        login: 'admin',
        email: 'admin@gmail.com'
      });
      console.log('config =', this.configOptionsService.getConfig());
    }

    //constantsService
    if(this.constantsService) {
      console.log('*** test of constantsService:');
      console.log('value =', this.constantsService);
    }

    //generatorService
    if(this.generatorService) {
      console.log('*** test of generatorService:');
      console.log('generated value =', this.generatorService);
    }
  }
}
