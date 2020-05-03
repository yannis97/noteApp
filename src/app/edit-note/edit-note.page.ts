import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.page.html',
  styleUrls: ['./edit-note.page.scss'],
})
export class EditNotePage implements OnInit {
  categories: any;
  noteId: any;
  noteForm: FormGroup;
  //category: FormArray;
  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) { this.getNote(this.route.snapshot.paramMap.get('id'));
    this.noteForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'content' : [null, Validators.required],
      'category' : this.formBuilder.group({
        'id': [null, [Validators.required]],
        'name': [null, [Validators.required]],
          }),
    });}

  ngOnInit() {
  }
  async getNote(id) {
    this.noteId = id;
    const loading = await this.loadingController.create();
    await loading.present();
    await this.api.getCategories()
      .subscribe(res => {
        console.log(res);
        this.categories = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });

    await this.api.getNoteById(id).subscribe(res => {
      this.noteForm.controls['title'].setValue(res.title);
      this.noteForm.controls['content'].setValue(res.content);
      this.noteForm.controls['category'].setValue({'name': res.category.name, 'id': res.category.id});

      console.log(this.noteForm);
      loading.dismiss();
    }, err => {
      console.log(err);
      loading.dismiss();
    });

  }
  async updateNote(){
    await this.api.updateNote(this.route.snapshot.paramMap.get('id'), this.noteForm.value)
    .subscribe(res => {
        let id = res['id'];
      }, (err) => {
        console.log(err);
      });
      this.router.navigate(["/notes"]);
  }
}
