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
    component.cards.push({question: "testFront", answer: "testBack", cardId: "1234"}); 
    http = TestBed.inject(HttpClient);
    fixture.detectChanges();
  });

  it('should display the front of first card in the cards array', () => {

    expect(fixture.nativeElement.querySelector('div').textContent).toContain('testFront');
    
  });

  it('should display the back of first card in the cards array if the card has been flipped', () => {

    component.flipCard();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('div').textContent).toContain('testBack');
    
  });

  it('should display the folder name', () => {

    component.title = "testTitle"
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').textContent).toContain('testTitle');
    
  });
  
});