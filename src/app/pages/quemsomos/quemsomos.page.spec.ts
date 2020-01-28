import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuemsomosPage } from './quemsomos.page';

describe('QuemsomosPage', () => {
  let component: QuemsomosPage;
  let fixture: ComponentFixture<QuemsomosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuemsomosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuemsomosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
