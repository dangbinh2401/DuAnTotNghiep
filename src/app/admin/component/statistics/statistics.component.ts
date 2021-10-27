import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  dateStringControl = new FormControl('yyyy-MM-dd');

  constructor(
    private statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {
    this.reportByCategory();
  }

  reportByCategory() {
      this.statisticsService.getReportByCategory().subscribe(data => {
      console.log(data);
      this.reportCategory = data;
    })
  }

  reportImportProductByDate() {
    this.statisticsService.getImportProduct(this.dateStringControl.value).subscribe(data => {
      console.log(data);
      this.reportProduct = data;
    })
  }

  /** Pagination list report */

  selectPage(page: string) {
    this.page = parseInt(page) || 1;
  }

}
