import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Project, Projects } from './projects';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  currentPage: number = 1;
  numberFound!: number;
  startSearch!: number;
  projects!: Project[];
  isLoading!: boolean;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.projectsService.search('*').subscribe((response) => {
      this.projects = response.search.response.projects.project;
      this.numberFound = response.search.response.numberFound;
      this.isLoading = false;
    });
  }

  onPageChange(currentPage: number) {
    this.isLoading = true;
    this.startSearch = (this.currentPage - 1) * 10;
    this.projectsService.search('*', this.startSearch).subscribe((response) => {
      this.projects = response.search.response.projects.project;
      this.numberFound = response.search.response.numberFound;
      this.isLoading = false;
    });
    window.scroll(0, 0);
  }
}

//TODO Search
