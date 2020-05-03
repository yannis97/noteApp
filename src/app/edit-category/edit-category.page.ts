import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.page.html',
  styleUrls: ['./edit-category.page.scss'],
})
export class EditCategoryPage implements OnInit {

  categoryForm: FormGroup;
  pageTitle: any;
  categoryId: any;
  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) {
      this.categoryForm = this.formBuilder.group({
        'name' : [null, Validators.required],
      });
      if(this.route.snapshot.paramMap.get('id')!="0"){
          this.api.getCategoryById(this.route.snapshot.paramMap.get('id'))
        .subscribe(res => {
          console.log(res);
          this.categoryId = res.id;
          this.categoryForm.controls['name'].setValue(res.name);
        }, err => {
          console.log(err);
        });
        this.pageTitle = "Editer"
      }
      else{
        this.categoryId = 0
        this.pageTitle = "Ajouter"
      }
     }

  ngOnInit() {
  }

  async updateCategory(id){
    if(id!="0")
    {
      await this.api.updateCategory(id,this.categoryForm.value)
    .subscribe(res => {
        this.router.navigate(['/categories']);
      }, (err) => {
        console.log(err);
      });
    }
    else{
      await this.api.postCategory(this.categoryForm.value)
    .subscribe(res => {
        this.router.navigate(['/categories']);
      }, (err) => {
        console.log(err);
      });
    }
  }
}
