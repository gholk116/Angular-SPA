import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';
import { ResourceService } from '../services/resource.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  data: any;
  columnInfo: any;
  tableDetail: any;
  projectData: any;
  projectColumnInfo: any;
  projectTableDetail: any;


  constructor(private projectService: ProjectService, private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.readProject();
    this.resourceService.read().subscribe(r => {
      this.storeResourceData(r);
    });
  }

  readProject() {
    this.projectService.read(16).subscribe(data => {
      this.storeProjectData(data);
    });
  }
  storeProjectData(data: any) {
    this.projectData = JSON.parse(data);
    console.log(this.projectData);
    this.columnInfo = this.projectData.columnInfo.splice(this.projectData.columnInfo.length/2);
    this.tableDetail = this.projectData.tableDetail;
  }

  storeResourceData(data: any) {
    this.data = JSON.parse(data)
    this.columnInfo = this.data.columnInfo.splice(this.data.columnInfo.length/2);
    this.tableDetail = this.data.tableDetail;
  }

}
