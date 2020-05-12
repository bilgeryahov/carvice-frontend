import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IDataEntity } from 'src/app/interfaces/data-entities/IDataEntity';
import { IHeaderPair } from 'src/app/interfaces/IHeaderPair';

@Component({
  selector: 'app-shrd-table',
  templateUrl: './shrd-table.component.html',
  styleUrls: ['./shrd-table.component.scss']
})
export class ShrdTableComponent implements OnInit, OnChanges {
  @Output() private _selected: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Input() private _collection: IDataEntity[];
  @Input() private _headers: IHeaderPair[];
  @Input() private _selectable: boolean;
  @Input() private _palette: string;
  @Input() private _pageLength: number;

  private _pages: Map<number, IDataEntity[]> = new Map<number, IDataEntity[]>();
  private _selectedIds: string[] = [];
  private _selectedPage: IDataEntity[] = [];
  private _selectedPageNr: number = null;

  public get headers(): IHeaderPair[] {
    return this._headers;
  }

  public get selectable(): boolean {
    return this._selectable;
  }

  public get palette(): string {
    return this._palette;
  }

  public get selectedPage(): IDataEntity[] {
    return this._selectedPage;
  }

  public get pageKeys(): number[] {
    return Array.from(this._pages.keys());
  }

  constructor() { }

  private _resetSelectedIds(): void {
    this._selectedIds = [];
    this._selected.emit(this._selectedIds);
  }

  private _setPages(): void {
    let pagesNr = this._collection.length / this._pageLength;
    if (pagesNr % 1 !== 0) {
      pagesNr = Math.floor(pagesNr) + 1;
    }
    const prepPages: Map<number, IDataEntity[]> = new Map<number, IDataEntity[]>();
    for (let i = 1; i <= pagesNr; i++) {
      prepPages.set(i, this._collection.slice((i - 1) * this._pageLength, i * this._pageLength));
    }
    this._pages = prepPages;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['_collection']) {
      // there are changes to the collection, re-set the selected IDs
      this._resetSelectedIds();
      // continue with setting the pages
      this._setPages();
      // decide which page to stay at
      if (this._selectedPageNr && typeof this._pages.get(this._selectedPageNr) !== 'undefined') {
        this.onPageSelect(this._selectedPageNr);
      } else {
        this.onPageSelect(1);
      }
    }
  }

  public onChangeSelect(event: any, dataEntityId: string) {
    if (event.srcElement.checked) {
      this._selectedIds.push(dataEntityId);
    } else {
      const index = this._selectedIds.indexOf(dataEntityId);
      if (index > -1) {
        this._selectedIds.splice(index, 1);
      }
    }
    this._selected.emit(this._selectedIds);
  }

  public onPageSelect(pageNr: number): void {
    this._selectedPage = this._pages.get(pageNr);
    this._selectedPageNr = pageNr;
  }

  public setPageNrNgStyle(pageNr: number): Object {
    return {
      'w3-bar-item w3-button': true,
      [this._palette]: pageNr === this._selectedPageNr
    };
  }

  public isChecked(id: string): boolean {
    return this._selectedIds.indexOf(id) > -1;
  }

  public ngOnInit(): void { }
}
