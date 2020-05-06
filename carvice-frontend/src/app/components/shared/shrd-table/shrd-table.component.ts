import { Component, Input, OnInit } from '@angular/core';
import { IDataEntity } from 'src/app/interfaces/data-entities/IDataEntity';
import { IHeaderPair } from 'src/app/interfaces/IHeaderPair';

@Component({
  selector: 'app-shrd-table',
  templateUrl: './shrd-table.component.html',
  styleUrls: ['./shrd-table.component.scss']
})
export class ShrdTableComponent implements OnInit {
  @Input() public collection: IDataEntity[];
  @Input() public headers: IHeaderPair[];
  @Input() public selectable: boolean;
  @Input() public palette: string;

  constructor() { }

  ngOnInit() { }
}
