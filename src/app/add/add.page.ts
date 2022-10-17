import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  urlForm: FormGroup;

  constructor(
    private urlService: DataServiceService,
    private router: Router,
    public fb: FormBuilder
  ) {

    this.urlForm = this.fb.group({
      name: [''],
      url: ['']
    })
  }
  ngOnInit(): void {
    this.urlForm.reset({ name: ' ', url: ' ' })
  }



  formSubmit() {
    if (!this.urlForm.valid) {
      return false;

    } else {
      this.urlService.createUrl(this.urlForm.value).then(res => {
        console.log(res);
        this.urlForm.reset();
        this.router.navigate(['/home']);
      }).catch(error => console.log(error));

    }
  }






}
