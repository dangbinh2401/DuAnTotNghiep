import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/service/adminService/statisticsService/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  reportCategory!: any;
  reportProduct!: any;
  page = 1;
  pageSize = 5;
  totalLength = 0;
  orderList: String = ''
  isDesc: boolean = true;
  orderSort: String=''
  FILTER_PAG_REGEX = /[^0-9]/g;

  constructor(
    private statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {
    this.reportByCategory();
  }

  reportByCategory() {
    return this.statisticsService.getReportByCategory().subscribe(data => {
      console.log(data);
      this.reportCategory = data;
    })
  }

  /** Pagination list report */

  selectPage(page: string) {
    this.page = parseInt(page) || 1;
  }

}
