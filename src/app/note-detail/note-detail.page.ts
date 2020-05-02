import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
})
export class NoteDetailPage implements OnInit {

  note: any = {};
  categoryName: any;
  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
    this.getNote()
  }
  async getNote() {
    this.api.getNoteById(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        console.log(res);
        this.note = res;
        this.categoryName = this.note.category.name;
      }, err => {
        console.log(err);
      });
  }

}
