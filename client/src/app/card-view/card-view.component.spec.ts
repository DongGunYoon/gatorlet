import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { CardViewComponent } from './card-view.component';

import { AppModule } from '../app.module';

describe('CardViewComponent', () => {
  let component: CardViewComponent;
  let fixture: ComponentFixture<CardViewComponent>;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AppModule],
      declarations: [CardViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardViewComponent);
    component = fixture.componentInstance;
    component.cards.push({question: "testFront1", answer: "testBack1", cardId: "1234"}); 
    component.cards.push({question: "testFront2", answer: "testBack2", cardId: "1235"});
    component.cards.push({question: "testFront3", answer: "testBack3", cardId: "1236"});
    component.cards.push({question: "testFront4", answer: "testBack4", cardId: "1236"});
    component.cards.push({question: "testFront5", answer: "testBack5", cardId: "1236"});
    component.cards.push({question: "testFront6", answer: "testBack6", cardId: "1236"});
    http = TestBed.inject(HttpClient);
    fixture.detectChanges();
  });

  it('should display the front of first card in the cards array', () => {

    expect(fixture.nativeElement.querySelector('div').textContent).toContain('testFront1');
    
  });

  it('should display the back of first card in the cards array if the card has been flipped', () => {

    component.flipCard();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('div').textContent).toContain('testBack1');
    
  });

  it('should display the folder name', () => {

    component.title = "testTitle"
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').textContent).toContain('testTitle');
    
  });

  /*it('should shuffle the cards when shuffle is called', () => {

    expect(component.cards[0].question).toBe('testFront1');
    component.shuffle();
    fixture.detectChanges();
    expect(component.cards[0].question).not.toBe('testFront1');
    
    
  });*/



  
});