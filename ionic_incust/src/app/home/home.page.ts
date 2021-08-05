import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {ShopItem} from 'src/typings/shop.item';
import {shopItems} from 'src/assets/data';
import {debounceTime, distinctUntilChanged, filter, pluck, switchMap, tap} from 'rxjs/operators';
import {fromEvent, merge, of} from 'rxjs';
import {IonVirtualScroll} from '@ionic/angular';
import {Storage} from '@ionic/storage-angular';
import {Router} from '@angular/router';

const isShopItemMatching = (shopItem: ShopItem, query: string) =>
  shopItem.name.toLowerCase().includes(query.toLowerCase())
  || shopItem.sku.toString() === query;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit, OnInit {
  @ViewChild('searchbar') searchbar: HTMLIonSearchbarElement;
  @ViewChild('virtualShopItems') virtualShopItems: IonVirtualScroll;

  shopItems: ShopItem[] = shopItems;
  searchText = ""

  constructor(private storage: Storage, private router: Router) {

  }

  async ngOnInit() {
    await this.storage.create();
    this.searchText = await this.storage.get('searchQuery');
    this.shopItems = this.filterShopItems(this.searchText)
  }

  async ngAfterViewInit() {
    const saveQueryText = async (query) => await this.storage.set('searchQuery', query);

    const input = await this.searchbar.getInputElement();
    const shopSearch$ = fromEvent(input, 'input')
      .pipe(
        pluck('target', 'value'),
        debounceTime(500),
        distinctUntilChanged(),
        tap(saveQueryText),
        switchMap((searchText) => this.getShopItems$(searchText, this.filterShopItems))
      );

    shopSearch$.subscribe((items) => this.onShopItemsLoaded(items));
  }

  onShopItemsLoaded(items: ShopItem[]) {
    this.shopItems = items;
  }

  onClearText() {
    this.shopItems = shopItems;
  }

  getShopItems$(searchText: string, filterFn: (searchText: string) => ShopItem[]) {
    return of(this.filterShopItems(searchText));
  }

  filterShopItems(searchText: string) {
    if (searchText === null || searchText === "") {
      return shopItems;
    }
    return shopItems.filter((item: ShopItem) => isShopItemMatching(item, searchText))
  }

  goDetail(sku: number) {
    this.router.navigate(['/detail', sku]);
  }
}
