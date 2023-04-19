import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import axios from 'axios';

interface Card {
  question: string;
  answer: string;
}

@Component({ 
  templateUrl: 'library.component.html',
  styleUrls: ["./library.component.css"] })

export class LibraryComponent implements OnInit {

  folders: any[] = [];
  cards: Card[] = [];

  constructor(private http: HttpClient, private router:Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.http.get('http://api.memorly.kro.kr/folders', { "headers": {"Authorization": localStorage.getItem('accessToken') || ""} }).subscribe((response: any) => {
      this.folders = response.data.folders.map((folder: any) => ({
        id: folder.id,
        title: folder.title,
        icon: folder.type === 'document' ? 'description' : 'folder'
      }));
    });
  }
  goToFolder(folderId : any): void {

    localStorage.setItem("folderId", folderId);

    this.http.get('http://api.memorly.kro.kr/folders/' + folderId, { "headers": {"Authorization": localStorage.getItem('accessToken') || ""} }).subscribe((response: any) => {
    
          if (response.data.folder.cards === null) {
            this.router.navigateByUrl('create-card');
          }
          else {
            this.router.navigateByUrl('card-view');
          }
        });

    
  }

  newFolder() {
    this.dialog.open(FolderModalComponent, {
        width: '600px',
        height: '250px',
        enterAnimationDuration: '0ms', 
        exitAnimationDuration: '0ms'
      });
  }
  editFolder(folderId : any, folderName : any) {
        localStorage.setItem('folderToBeEdited', folderId);
        localStorage.setItem('folderNameToBeEdited', folderName);

        this.dialog.open(EditFolderModalComponent, {
          width: '600px',
          height: '250px',
          enterAnimationDuration: '0ms', 
          exitAnimationDuration: '0ms'
        });
  }
  deleteFolder(folderId : any){
    localStorage.setItem('folderToBeDeleted', folderId);

    this.dialog.open(DeleteFolderModalComponent, {
      width: '500px',
      height: '200px',
      enterAnimationDuration: '0ms', 
      exitAnimationDuration: '0ms'
    });
  }
}

@Component({
  selector: 'folder-modal',
  templateUrl: 'folder-modal.html',
  styleUrls: ["./library.component.css"]
})
export class FolderModalComponent {
  constructor(public dialogRef: MatDialogRef<FolderModalComponent>, private router: Router) {}


  cancel() {
    this.dialogRef.close();
  }

    createFolder(title : string) {

        const data = { title };

        // Define the headers with the access token
        const headers = { Authorization: localStorage.getItem('accessToken') };
        
        // Make the POST request
        axios.post('http://api.memorly.kro.kr/folder', data, { headers })
          .then(response => {
            // Request was successful, log the response data
            console.log(response.data);

            location.reload();

          })
          .catch(error => {
            // Request failed, log the error message
            console.error(error.message);
          });
    }
    
}

@Component({
  selector: 'edit-folder-modal',
  templateUrl: 'edit-folder-modal.html',
  styleUrls: ["./library.component.css"]
})
export class EditFolderModalComponent {
  constructor(public dialogRef: MatDialogRef<EditFolderModalComponent>, private router: Router) {}

  public folderName = localStorage.getItem('folderNameToBeEdited');

  cancel() {
    this.dialogRef.close();
  }
  
    editFolder(title : string) {

        const data = { title };

        // Define the headers with the access token
        const headers = { Authorization: localStorage.getItem('accessToken') };
        
        // Make the POST request
        axios.put('http://api.memorly.kro.kr/folders/' + localStorage.getItem('folderToBeEdited'), data, { headers })
          .then(response => {
            // Request was successful, log the response data
            console.log(response.data);

            location.reload();

          })
          .catch(error => {
            // Request failed, log the error message
            console.error(error.message);
          });
    }
    

}

@Component({
  selector: 'delete-folder-modal',
  templateUrl: 'delete-folder-modal.html',
  styleUrls: ["./library.component.css"]
})
export class DeleteFolderModalComponent {
  constructor(public dialogRef: MatDialogRef<DeleteFolderModalComponent>, private router: Router) {}

  cancel() {
    this.dialogRef.close();
  }

    deleteFolder() {

        // Define the headers with the access token
        const headers = { Authorization: localStorage.getItem('accessToken') };
        
        // Make the POST request
        axios.delete('http://api.memorly.kro.kr/folders/' + localStorage.getItem('folderToBeDeleted'), { headers })
          .then(response => {
            // Request was successful, log the response data
            console.log(response.data);

            location.reload();

          })
          .catch(error => {
            // Request failed, log the error message
            console.error(error.message);
          });
    }
    

}