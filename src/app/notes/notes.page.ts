import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  public notes: any;
  constructor(public api: RestApiService, public loadingController: LoadingController,) { }

  ngOnInit() {
    this.getNotes();
  }
  ionViewWillEnter(){
    this.ngOnInit();
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
  async deleteNote(id) {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.api.deleteNote(id)
      .subscribe(res => {
        var index = this.notes.findIndex(x => x.id === id);
        this.notes.splice(index);
        console.log(index);
        loading.dismiss();

      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
  test(id){
    console.log("Test en cours");
    var index = this.notes.findIndex(x => x.id === id);
    this.notes.splice(index);
    console.log(index);
  }
}
