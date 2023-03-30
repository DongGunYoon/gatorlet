
  import { TestBed } from '@angular/core/testing';
  import { RouterTestingModule } from '@angular/router/testing';
  import { MatCardModule } from '@angular/material/card';
  import { HomeComponent } from './home.component';

  import { AppModule } from '../app.module';
  
  describe('HomeComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          MatCardModule,
          AppModule
        ],
        declarations: [
          HomeComponent
        ],
      }).compileComponents();
    });
  
    it('should display "Welcome to our CEN3031 Project!"', () => {
        const fixture = TestBed.createComponent(HomeComponent);
        const app = fixture.nativeElement.querySelector('div');
        expect(app.textContent).toContain('Welcome to our CEN3031 Project!');
      });
  
  });
  