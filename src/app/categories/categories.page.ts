import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router  } from '@angular/router';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage {
  categories: any;
  constructor(public api: RestApiService, public loadingController: LoadingController, public router: Router) { }

  ionViewWillEnter(){
    this.getCategories();
  }
  async getCategories() {
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
  }
  async deleteCategorie(id) {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.api.deleteCategory(id)
      .subscribe(res => {
        var index = this.categories.findIndex(x => x.id === id)
        this.categories.splice(index,1);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
}
