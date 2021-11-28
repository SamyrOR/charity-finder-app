import { Component, OnInit } from '@angular/core';
import { Organization, Organizations } from './organizations';
import { OrganizationsService } from './organizations.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
})
export class OrganizationsComponent implements OnInit {
  organizations!: Organization[];
  hasNext!: boolean;
  nextOrgId!: number;
  page: number = 1;
  constructor(private orgService: OrganizationsService) {}

  ngOnInit(): void {
    this.orgService.getAll().subscribe((data) => {
      this.organizations = data.organizations.organization;
      this.hasNext = data.organizations.hasNext;
      this.nextOrgId = data.organizations.nextOrgId;
    });
  }
}
