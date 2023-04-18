import { Component } from '@angular/core';
import axios from 'axios';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

import {Router} from '@angular/router';

interface Card {
  question: string;
  answer: string;
}

@Component({ templateUrl: 'create-card.component.html',
styleUrls: ["./create-card.component.css"] })

export class CreateCardComponent {

    constructor(private router: Router,
      private snackBar: MatSnackBar) {
      
    }



    frontItems: string[] = ['', '', '', '', ''];
    backItems: string[] = ['', '', '', '', ''];
    allEmpty: boolean = true;
    cards: Card[] = [];
    

  tracker(index: any) {
    return index;
  }
  
    async createCards() {
      

      const headers = { Authorization: localStorage.getItem('accessToken') };

      for (var i = 0; i < this.frontItems.length; i++) {
      
        if (this.frontItems[i].length !== 0 && this.backItems[i].length !== 0) {
          this.allEmpty = false;
          console.log(this.frontItems[i]);
          
          this.cards.push({question: this.frontItems[i], answer: this.backItems[i]});

        }
      }

      if(this.allEmpty){
        this.snackBar.open('No Cards Added -- Write a Card Before Submitting', 'x', {duration: 10000}); 
      }
      else {
      const data = { 
        folderId: localStorage.getItem("folderId"),
        cards: this.cards
      };
        await axios.post('http://api.memorly.kro.kr/cards', data, { headers })
          .then(response => {
          // Request was successful, log the response data
            console.log(response.data);
            
            this.router.navigateByUrl('card-view');
        })
        .catch(error => {
          // Request failed, log the error message
          console.error(error.message);
        });
      }

        
      /*
      for (var i = 0; i < this.frontItems.length; i++) {
        if (this.frontItems[i].length !== 0 && this.backItems[i].length !== 0) {
          this.allEmpty = false;
          console.log(this.frontItems[i]);
          const data = { 
            folderId: localStorage.getItem("folderId"),
            question: this.frontItems[i],
            answer: this.backItems[i]
          };

          await axios.post('http://api.memorly.kro.kr/card', data, { headers })
            .then(response => {
            // Request was successful, log the response data
            console.log(response.data);
            //console.log(this.frontItems[i]);
            if (i === (this.frontItems.length - 1)) {
                this.router.navigateByUrl('card-view');
            }

          })
          .catch(error => {
            // Request failed, log the error message
            console.error(error.message);
          });
        }
        else if(i == this.frontItems.length - 1 && !this.allEmpty){
          this.router.navigateByUrl('card-view');
        }
        else if(i == this.frontItems.length - 1 && this.allEmpty){
          this.snackBar.open('No Cards Added -- Write a Card Before Submitting', 'x', {duration: 10000}); 
        }
      }
      */
    }
  
    addItem() {
      this.frontItems.push('');
      this.backItems.push('');
    }
  
    removeItem() {
      this.frontItems.pop();
      this.backItems.pop();
    }

    /*
    //cards:  = [];
    items: string[] = ['','','','','',''];

    addItem() {
        this.items.push('');
      }
    
      removeItem() {
        this.items.pop();
      }

    createCards(folderName1 : string,  cards1 : Array<Array<string>>) {

        const data = { 
          folderName: folderName1, 
          cards: cards1
          //for (let index = 0; index < cards1.length; index++) {
          //  cards[index][0] = cards1[index][0];
          //  cards[index][1] = cards1[index][1];
          //}  
          };

        // Define the headers with the access token
        const headers = { Authorization: sessionStorage.getItem('accessToken') };
        
        // Make the POST request
        axios.post('http://api.memorly.kro.kr/users/create-card', data, { headers })
          .then(response => {
            // Request was successful, log the response data
            console.log(response.data);

            this.router.navigateByUrl('library');

          })
          .catch(error => {
            // Request failed, log the error message
            console.error(error.message);
          });



    }
*/
}