import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {ShopItem} from 'src/typings/shop.item';
import {shopItems} from 'src/assets/data';
import {debounceTime, distinctUntilChanged, filter, pluck, switchMap, tap} from 'rxjs/operators';
import {fromEvent, of} from 'rxjs';
import {IonVirtualScroll} from '@ionic/angular';
import {Storage} from '@ionic/storage-angular';
import {Router} from '@angular/router';

const isShopItemMatching = (shopItem: ShopItem, query: string) =>
  [
    'name',
    'sku'
  ].some(prop =>
    shopItem[prop] && typeof shopItem[prop].toLowerCase === 'function' &&
    shopItem[prop].toLowerCase().includes(query.toLowerCase())
  );

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit, OnInit {
  @ViewChild('searchbar') searchbar: HTMLIonSearchbarElement;
  @ViewChild('virtualShopItems') virtualShopItems: IonVirtualScroll;

  shopItems: ShopItem[] = shopItems;

  constructor(private storage: Storage, private router: Router) {

  }

  async ngOnInit() {
    await this.storage.create();
  }

  async ngAfterViewInit() {
    const queryText = await this.storage.get('searchQuery');
    const saveQueryText = async (query) => await this.storage.set('searchQuery', query);

    const input = await this.searchbar.getInputElement();
    const shopSearch$ = fromEvent(input, 'input')
      .pipe(
        pluck('target', 'value'),
        debounceTime(500),
        distinctUntilChanged(),
        tap(saveQueryText),
        switchMap(this.getShopItems)
      );

    shopSearch$.subscribe((items) => this.onShopItemsLoaded(items));

    input.value = queryText;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  onShopItemsLoaded(items) {
    this.shopItems = items;
  }

  getShopItems(searchText) {
    return of(shopItems.filter((item: ShopItem) => isShopItemMatching(item, searchText)));
  }

  goDetail(sku) {
    this.router.navigate(['/detail', sku]);
  }
}
