import { Component, Input, OnInit } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { MarketingSummaryService } from '../../../@core/Services/Report/marketingsummary.service';
import * as moment from 'moment';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  source: string;
  offer: string;
  cnew: number;
  approved?: number;
  rejected?: number;
  total?: number;
}
@Component({
  selector: 'ngx-marketingsummary',
  templateUrl: './marketingsummary.component.html',
  styleUrls: ['./marketingsummary.component.scss'],
})
export class MarketingSummaryComponent implements OnInit {
  customColumn = 'source';
  defaultColumns = [ 'offer', 'cnew', 'approved', 'rejected', 'total' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private _call: MarketingSummaryService, private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
    
  }
  date = {
    start: new Date(),
    end: new Date()
  };
  dataJsonconvert = [];
  data = null;
  loading = false;
  ngOnInit(): any {
    this.date.start.setHours(0,0,0,0);
    this.date.end.setHours(23,59,59,999);    
  }
  searchDto = {
    startDate: null,
    endDate: null,
    source: null,
    isSortCnew: null,
    pageIndex: 1, 
    pageSize: 25
  }
  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }
  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
  exportReport() {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(this.dataJsonconvert[0]);
    let csv = this.dataJsonconvert.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var a = document.createElement('a');
    var blob = new Blob([csvArray], {type: 'text/csv' }),
    url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = "export.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
  searchByDto = function() {
    this.loading = true;
    this.dataJsonconvert = [];
    this.searchDto.startDate = null;
    this.searchDto.endDate = null;
    if (this.date != null) {
        if(Object.keys(this.date).length !== 0 && this.date.constructor === Object) {
          this.searchDto.startDate = moment(this.date.start).format('YYYY-MM-DDTHH:mm:ssZ');
            this.searchDto.endDate = moment(this.date.end).format('YYYY-MM-DDTHH:mm:ssZ');   
        }
    }
    this._call.getSummaryReport(this.searchDto)
        .subscribe(
          res => {
            if(res != null && res != "") {
              this.data = res;
              var dataNew;
              for(let i = 0; i < res.items.length; i++)
              {
                var childrenArray = [];
                for(let j = 0; j < res.items[i].children.length; j++)
                {
                  let arrayInChildren = {
                    data: res.items[i].children[j]
                  }
                  childrenArray.push(arrayInChildren);
                } 
                dataNew = { 
                  data: { 
                    source: res.items[i].source,
                    offer: res.items[i].offer,
                    cnew: res.items[i].cnew,
                    approved: res.items[i].approved,
                    rejected: res.items[i].rejected,
                    total: res.items[i].total
                  },
                  children: childrenArray
                };
                this.dataJsonconvert.push(dataNew);   
                this.dataSource = this.dataSourceBuilder.create(this.dataJsonconvert);   
                setTimeout(() => this.loading = false, 1000);               
              }
            }
          },
          err => console.log(err)
        )
  };
}
@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}
