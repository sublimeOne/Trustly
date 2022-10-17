import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  updateUrlForm: FormGroup;
  id: any;


  constructor(private urlService: DataServiceService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder) {

    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.urlService.getUrl(this.id).valueChanges().subscribe(res => {
      this.updateUrlForm.setValue(res);
    })

  }

  ngOnInit() {

    this.updateUrlForm = this.fb.group({
      name: [''],
      url: [''],
    })
    console.log(this.updateUrlForm.value)
  }

  updateForm() {
    this.urlService.updateUrl(this.id, this.updateUrlForm.value)
      .then(() => {
        this.router.navigate(['/home'])
      })
      .catch(error => console.log(error))
  }

}
