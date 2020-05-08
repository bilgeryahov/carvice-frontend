import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IDataEntity } from 'src/app/interfaces/data-entities/IDataEntity';
import { IHeaderPair } from 'src/app/interfaces/IHeaderPair';

@Component({
  selector: 'app-shrd-table',
  templateUrl: './shrd-table.component.html',
  styleUrls: ['./shrd-table.component.scss']
})
export class ShrdTableComponent implements OnInit, OnChanges {
  @Input() public collection: IDataEntity[];
  @Input() public headers: IHeaderPair[];
  @Input() public selectable: boolean;
  @Input() public palette: string;
  @Input() public pageLength: number;

  @Output() public selected: EventEmitter<string[]> = new EventEmitter<string[]>();

  private _pages: number[] = [];
  private _selectedIds: string[] = [];

  public get pages(): number[] {
    return this._pages;
  }

  constructor() { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['collection']) {
      // there are changes to the collection, re-set the selected IDs
      this._selectedIds = [];
      this.selected.emit(this._selectedIds);

      // continue with setting the pages
      let pagesNr = this.collection.length / this.pageLength;
      if (pagesNr % 1 !== 0) {
        pagesNr = Math.floor(pagesNr) + 1;
      }
      const items: number[] = [];
      for (let i = 1; i <= pagesNr; i++) {
        items.push(i);
      }
      this._pages = items;
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
    this.selected.emit(this._selectedIds);
  }

  public ngOnInit(): void { }
}
