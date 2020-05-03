import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {
  
  noteForm: FormGroup;
  categories: any;
  category: any;

  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) {
      this.api.getCategories()
      .subscribe(res => {
        console.log(res);
        this.categories = res;
      }, err => {
        console.log(err);
      });
      this.noteForm = this.formBuilder.group({
        'title' : [null, Validators.required],
        'content' : [null, Validators.required],
        'category' : [null, Validators.required],
      });
     }

  ngOnInit() {
  }

  async addNote(){
    var categoryId = Number(this.noteForm.value.category);
    this.category = this.categories.find(x => x.id === categoryId);
    this.noteForm.value.category = this.category;
    console.log(this.category);
    await this.api.postNote(this.noteForm.value)
    .subscribe(res => {
        this.router.navigate(['/notes']);
      }, (err) => {
        console.log(err);
      });
    }

}
