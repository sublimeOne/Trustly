import { getLocaleDateFormat } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { url } from 'inspector';
import { Observable } from 'rxjs';

export interface Url {
  $key?: string;
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  urlListRef: AngularFireList<any>;
  urlRef: AngularFireObject<any>;



  constructor(private db: AngularFireDatabase) {
    this.urlListRef = this.db.list('/Urls');
  }


  ngOnInit() {

  }

  createUrl(url: Url) {

    return this.urlListRef.push({
      name: url.name,
      url: url.url,
      cratedAt: new Date()
    })

  }

  getUrl(id: string) {
    this.urlRef = this.db.object('/Urls/' + id);
    return this.urlRef;
  }

  getUrlList() {
    this.urlListRef = this.db.list('/Urls');
    return this.urlListRef;
  }

  updateUrl(id: string, url: Url) {
    return this.urlRef.update(
      {
        name: url.name,
        url: url.url

      }
    )
  }

  delete(id: string) {
    this.urlRef = this.db.object('/Urls/' + id);
    this.urlRef.remove();
  }

}
