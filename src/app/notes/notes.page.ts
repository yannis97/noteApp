import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  notes: any;
  constructor(public api: RestApiService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.getNotes();
  }
  async getNotes() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.api.getNotes()
      .subscribe(res => {
        console.log(res);
        this.notes = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
  showNote(note) {
    console.log(note);
    // Type your code here
  }
}
