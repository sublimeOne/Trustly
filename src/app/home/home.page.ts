import { url } from 'inspector';
import { DataServiceService, Url } from './../services/data-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Urls: Url[] = [];

  constructor(
    private urlService: DataServiceService
  ) { }

  ngOnInit() {
    this.fetchUrls();
    let urlRes = this.urlService.getUrlList();
    urlRes.snapshotChanges().subscribe(res => {
      this.Urls = [];
      res.forEach((item: any) => {
        let a: Url = item.payload.toJSON();
        a['$key'] = item.key;
        this.Urls.push(a as Url);
      })
    })
  }

  fetchUrls() {
    this.urlService.getUrlList().valueChanges().subscribe(
      res => {
        console.log(res);
      }
    )
  }

  deleteUrl(id: string) {
    console.log(id);
    if (window.confirm('are you sure ?')) {
      this.urlService.delete(id);
    }
  }

  redirect(url: string) {
    console.log(url)
    window.location.href = url;
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  click($event: CustomEvent) {
    console.log($event.detail.checked);
  }

}
