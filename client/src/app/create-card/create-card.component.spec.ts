import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateCardComponent } from './create-card.component';

import { AppModule } from '../app.module';


describe('CreateCardComponent', () => {
  let component: CreateCardComponent;
  let fixture: ComponentFixture<CreateCardComponent>;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AppModule],
      declarations: [CreateCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCardComponent);
    component = fixture.componentInstance;
    //component.folders.push({title: "testTitle"});
    http = TestBed.inject(HttpClient);
    fixture.detectChanges();
  });

  it('should display text boxes for 5 cards at first', () => {

    //expect(fixture.nativeElement.querySelector('placeholder').textContent).toContain('Front 5');

    expect(component.frontItems.length).toBe(5);
    
  });

  it('should display 6 cards after addItem is called', () => {

    component.addItem();

    expect(component.frontItems.length).toBe(6);
    
  });

  it('should take away text boxes after remove item is called', () => {

    component.removeItem();

    expect(component.frontItems.length).toBe(4);
    
  });

  it('should have property allEmpty be true when there are no card pairs', () => {

    component.frontItems[0] = "testFront";
    component.createCards();

    expect(component.allEmpty).toBe(true);
    
  });

  it('should have property allEmpty be false when there are card pairs', () => {

    component.frontItems[0] = "testFront";
    component.backItems[0] = "testBack";
    component.createCards();

    expect(component.allEmpty).toBe(false);
    
  });

});

