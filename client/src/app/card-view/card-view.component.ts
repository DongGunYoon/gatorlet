import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import axios from 'axios';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Card {
    question: string;
    answer: string;
}

@Component({ templateUrl: 'card-view.component.html',
styleUrls: ["./card-view.component.css"] })



export class CardViewComponent {

    position = 0;
    frontItems: string[] = ['test'];
    backItems: string[] = [];
    //cards: string[][] = [[''], ['']];
    size: number = 0;
    showFront: boolean = true;
    cards: Card[] = [];

    constructor(private http: HttpClient, private router:Router, public dialog: MatDialog) { }

    ngOnInit(): void {

        const folderId = localStorage.getItem("folderId");

        this.http.get('http://api.memorly.kro.kr/folders/' + folderId, { "headers": {"Authorization": localStorage.getItem('accessToken') || ""} }).subscribe((response: any) => {

        console.log(response);
          this.cards = response.data.folder.cards.map((card: any) => ({
            question: card.question,
            answer: card.answer
            
            //id: folder.id,
            //title: folder.title,
            //icon: folder.type === 'document' ? 'description' : 'folder'
          }));
          this.size = this.cards.length;
        });

      }

    cycleLeft() {
        if (this.position != 0) {
            this.position--;
        }
        else {
            this.position = this.size - 1;
        }
      }
    
      cycleRight() {
        if (this.position != this.size - 1) {
            this.position++;
        }
        else {
            this.position = 0;
        }
      }

      flipCard() {
        if (this.showFront) {
            this.showFront = false;
        }
        else {
            this.showFront = true;
        }
      }

      newCard() {
        this.dialog.open(CardModalComponent, {
            width: '600px',
            height: '350px',
            enterAnimationDuration: '0ms', 
            exitAnimationDuration: '0ms'
          });
      }

}

@Component({
    selector: 'card-modal',
    templateUrl: 'card-modal.html',
    styleUrls: ["./card-view.component.css"]
  })
  export class CardModalComponent {
    constructor(public dialogRef: MatDialogRef<CardModalComponent>, private router: Router) {}

    createCard(question1 : string,  answer1 : string) {
      

        const headers = { Authorization: localStorage.getItem('accessToken') };
        
        
          const data = { 
              folderId: localStorage.getItem("folderId"),
              question: question1,
              answer: answer1
           };
  
        axios.post('http://api.memorly.kro.kr/card', data, { headers })
            .then(response => {
              // Request was successful, log the response data
              console.log(response.data);
              //this.router.navigateByUrl('card-view');
              location.reload();
  
            })
            .catch(error => {
              // Request failed, log the error message
              console.error(error.message);
            });
          }
      

  }