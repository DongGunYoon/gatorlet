import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { LibraryComponent } from './library.component';

import { AppModule } from '../app.module';


describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AppModule],
      declarations: [LibraryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    component.folders.push({title: "testTitle"});
    http = TestBed.inject(HttpClient);
    fixture.detectChanges();
  });

  it('should display the name of the folder', () => {

    expect(fixture.nativeElement.querySelector('div').textContent).toContain('testTitle');
    
  });

});




/*
describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;
  let http: HttpClient;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsIk5hbWUiOiJ0ZXN0IiwiSWQiOiI2M2ZmYTZmN2JiMjc4N2Y5YzkwYTgxYmYiLCJleHAiOjE2ODA5ODA1OTV9.8yryr9cnO1_x3YwNKRQ540hYUYYOW9wSeM1PUTjGdpU';

  let folders: any[] = [];

  let folderIdResult: string = '';
  let folderNameResult: string = '';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AppModule],
      declarations: [LibraryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpClient);
    fixture.detectChanges();
  });

  it('should get the folder ID for a given user\'s first folder', () => {

    http.get('http://api.memorly.kro.kr/folders', { "headers": {"Authorization": token} }).subscribe((response: any) => {
      folders = response.data.folders.map((folder: any) => ({
        id: folder.id,
        title: folder.title,
        icon: folder.type === 'document' ? 'description' : 'folder'
      }));
      folderIdResult = folders[0].id;
      
      //expect(folders[1].title).toBe('My Second Folder');
    });
    expect(folderIdResult).toBe('641ea5037165d0bb53cb5327');
    
  });
  it('should get the folder name for a given user\'s second folder', () => {

    http.get('http://api.memorly.kro.kr/folders', { "headers": {"Authorization": token} }).subscribe((response: any) => {
      folders = response.data.folders.map((folder: any) => ({
        id: folder.id,
        title: folder.title,
        icon: folder.type === 'document' ? 'description' : 'folder'
      }));
      //expect(folders[0].id).toBe('641ea5037165d0bb53cb5327');
      folderNameResult = folders[1].title;
      
    });
    expect(folderNameResult).toBe('My Second Folder');
    
  });
  
});

*/