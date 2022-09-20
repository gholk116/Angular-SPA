import { Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ResourceService } from '../services/resource.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit, OnChanges {
  data:any;
  columnInfo: any;
  tableDetail: any;
  keyword: string = "";

  constructor(private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.readResource();
  }
  ngOnChanges(): any {
    this.readResource();
  }

  readResource() {
    this.resourceService.read().subscribe(data => {
      this.storeData(data);
    });
  }
  
  editData(row: number, column: number, data: string) {
    if (data === undefined)
      data = '';
    this.resourceService.setEntry(row, column, data).subscribe();
  }

  addRow() {
    this.resourceService.addResource().subscribe(val => {this.readResource()});
    
  }

  addColumn() {
    this.resourceService.addColumn().subscribe(val => {this.readResource()});
  }

  updateColumnName(oldColumnName: string, newColumnName: string) {
    console.log('Changing Column name')
    this.resourceService.updateColumn(oldColumnName, newColumnName).subscribe(val => {this.readResource()});
  }


  storeData(data: any) {
    this.data = JSON.parse(data)
    this.columnInfo = this.data.columnInfo.splice(this.data.columnInfo.length/2);
    this.tableDetail = this.data.tableDetail;
  }

  onDataChanged($event: any, row: number, column: number) {
    let newData: string = $event.target.textContent;
    this.editData(row, column, newData);
  }

  onColumnNameChanged($event: any, oldColumnName: string) {
    let newColumnName: string = $event.target.textContent;
    this.updateColumnName(oldColumnName, newColumnName);
  }

  filter(row: number): string {
    return ""
  }

  search(query: string) {
    console.log()
    return 
  }

}
