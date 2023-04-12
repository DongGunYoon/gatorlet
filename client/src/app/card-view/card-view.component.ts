import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import axios from 'axios';
import { MatFormFieldModule } from '@angular/material/form-field';


interface Card {
    question: string;
    answer: string;
    cardId: string;
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
    title: string = '';
    

    constructor(private http: HttpClient, private router:Router, public dialog: MatDialog) { }

    ngOnInit(): void {

        const folderId = localStorage.getItem("folderId");

        this.http.get('http://api.memorly.kro.kr/folders/' + folderId, { "headers": {"Authorization": localStorage.getItem('accessToken') || ""} }).subscribe((response: any) => {

        console.log(response);
          this.cards = response.data.folder.cards.map((card: any) => ({
            question: card.question,
            answer: card.answer,
            cardId: card.id
            
            //id: folder.id,
            //title: folder.title,
            //icon: folder.type === 'document' ? 'description' : 'folder'
          }));
          this.size = this.cards.length;
          this.title = response.data.folder.title;
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

      editCard() {
        localStorage.setItem('cardToBeEdited', this.cards[this.position].cardId);
        localStorage.setItem('questionToBeEdited', this.cards[this.position].question);
        localStorage.setItem('answerToBeEdited', this.cards[this.position].answer);

        this.dialog.open(EditCardModalComponent, {
          width: '600px',
          height: '350px',
          enterAnimationDuration: '0ms', 
          exitAnimationDuration: '0ms'
        });
      }

      deleteCard() {

        localStorage.setItem('cardToBeDeleted', this.cards[this.position].cardId);

        this.dialog.open(DeleteCardModalComponent, {
          width: '600px',
          height: '350px',
          enterAnimationDuration: '0ms', 
          exitAnimationDuration: '0ms'
        });
      }

      shuffle() {
        
          var currIndex = this.size;
          var randIndex = 0;
          //console.log(this.cards);
          while (currIndex != 0) {
              randIndex = Math.floor(Math.random() * currIndex);
              currIndex--;
          
              [this.cards[currIndex], this.cards[randIndex]] = [
                this.cards[randIndex], this.cards[currIndex]];
          }
          
          //console.log(this.cards);
      }

}

@Component({
    selector: 'card-modal',
    templateUrl: 'card-modal.html',
    styleUrls: ["./card-view.component.css"]
  })
  export class CardModalComponent {
    constructor(public dialogRef: MatDialogRef<CardModalComponent>, private router: Router) {}

    cancel() {
      this.dialogRef.close();
    }

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
@Component({
    selector: 'edit-card-modal',
    templateUrl: 'edit-card-modal.html',
    styleUrls: ["./card-view.component.css"]
  })
  export class EditCardModalComponent {
    constructor(public dialogRef: MatDialogRef<EditCardModalComponent>, private router: Router) {}



    public questionVal = localStorage.getItem('questionToBeEdited');
    public answerVal = localStorage.getItem('answerToBeEdited');

    cancel() {
      this.dialogRef.close();
    }

    

    editCard(question1 : string,  answer1 : string) {
      

      const headers = { Authorization: localStorage.getItem('accessToken') };
        
      const data = { 
          question: question1,
          answer: answer1
       };

    axios.put('http://api.memorly.kro.kr/cards/' + localStorage.getItem('cardToBeEdited'), data, { headers })
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
  @Component({
    selector: 'delete-card-modal',
    templateUrl: 'delete-card-modal.html',
    styleUrls: ["./card-view.component.css"]
  })
  export class DeleteCardModalComponent {
    constructor(public dialogRef: MatDialogRef<DeleteCardModalComponent>, private router: Router) {}

    cancel() {
      this.dialogRef.close();
    }

    deleteCard() {
      

        const headers = { Authorization: localStorage.getItem('accessToken') };
        
        
          const data = { 
              folderId: localStorage.getItem("folderId"),
           };
  
        axios.delete('http://api.memorly.kro.kr/cards/' + localStorage.getItem('cardToBeDeleted'), { headers })
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

  