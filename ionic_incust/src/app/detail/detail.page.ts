import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShopItem} from 'src/typings/shop.item';
import {shopItems} from 'src/assets/data';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  shopItem: ShopItem;
  amount = 0;
  qty = 0;
  preventUpdate = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const skuFromRoute = Number(routeParams.get('sku'));

    this.shopItem = shopItems.find(item => item.sku === skuFromRoute);
  }

  onChangePrice() {
    if (this.preventUpdate) {return;}
    this.preventUpdate = true;
    this.qty = Math.floor(this.amount / this.shopItem.price);
    this.preventUpdate = false;
  }

  onChangeQty() {
    if (this.preventUpdate) {return;}
    if (this.qty === null) {
      this.amount = 0;
      return;
    }
    this.preventUpdate = true;
    this.qty = +(this.qty.toFixed(0));
    this.amount = +(this.shopItem.price * this.qty).toFixed(2);
    this.preventUpdate = false;
  }

  onQtyInput(e) {
    const pattern = /(?![0-9])/.compile();
    return e.target.value.replace(pattern, '');
  }

  realNumberOnlyValidation(event: KeyboardEvent) {
    const pattern = /[0-9]/;

    if (!pattern.test(event.key)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
}
