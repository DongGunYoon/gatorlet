import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({ 
  templateUrl: 'library.component.html',
  styleUrls: ["./library.component.css"] })

export class LibraryComponent implements OnInit {

  folders: any[] = [];

  constructor(private http: HttpClient, private router:Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.http.get('http://api.memorly.kro.kr/folders', { "headers": {"Authorization": sessionStorage.getItem('accessToken') || ""} }).subscribe((response: any) => {
      this.folders = response.data.folders.map((folder: any) => ({
        id: folder.id,
        title: folder.title,
        icon: folder.type === 'document' ? 'description' : 'folder'
      }));
    });
  }
  goToFolder(folderId : any): void {

    localStorage.setItem("folderId", folderId)

    //this.router.navigateByUrl('create-card');
    this.router.navigateByUrl('card-view');
  }

  newFolder() {
    this.dialog.open(FolderModalComponent, {
        width: '600px',
        height: '350px',
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


    createFolder(title : string) {

        const data = { title };

        // Define the headers with the access token
        const headers = { Authorization: sessionStorage.getItem('accessToken') };
        
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