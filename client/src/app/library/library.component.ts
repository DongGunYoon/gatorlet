import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

@Component({ 
  templateUrl: 'library.component.html',
  styleUrls: ["./library.component.css"] })

export class LibraryComponent implements OnInit {

  folders: any[] = [];

  constructor(private http: HttpClient, private router:Router) { }

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

    this.router.navigateByUrl('create-card');
  }
}
