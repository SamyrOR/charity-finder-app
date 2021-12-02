import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form!: FormGroup;
  erro!: boolean;
  erroMessage!: string;

  constructor(
    private projectsService: ProjectsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.form = this.fb.group({
      searchQuery: ['', Validators.required],
    });
    this.loadData(this.currentPage);
  }

  loadData(page: number, query?: string, startSearch: number = 0) {
    this.currentPage = page;
    this.isLoading = true;
    this.projectsService
      .search(query, startSearch)
      .subscribe((response: Projects) => {
        console.log(response);
        if (response.search.response.numberFound === 0) {
          this.isLoading = false;
          this.erro = true;
          this.erroMessage = `Sorry, nothing found for "${response.search.request.q}". Please try again!`;
          this.numberFound = 0;
        } else {
          this.erro = false;
          this.projects = response.search.response.projects.project;
          this.filterImgs();
          this.numberFound = response.search.response.numberFound;
          this.isLoading = false;
        }
      });
  }

  filterImgs() {
    this.projects.forEach((project) => {
      project.imageLink = project.image.imagelink.filter((img) => {
        return img.size === 'large';
      })[0].url;
    });
  }

  onPageChange(currentPage: number) {
    let searchQuery = this.form.get('searchQuery')?.value || '*';
    this.isLoading = true;
    this.startSearch = (currentPage - 1) * 10;
    this.loadData(currentPage, searchQuery, this.startSearch);
    window.scroll(0, 0);
  }
}
