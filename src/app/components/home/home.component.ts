import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from '../../services/token.service';
import * as CanvasJS from '../../graphs/canvasjs.min';
import { Organisation } from '../../model';
import { OrganisationsService } from '../../services/organisations/organisations.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public tokenService: TokenService,
    private orgService: OrganisationsService
  ) {}
  organisations: Organisation[];
  date: any; // ["2020-09", "2020-10" ] format with duplicates
  labels: any; // same format as date but unique
  ngOnInit(): void {
    this.orgService
      .getOrganisations(this.tokenService.token)
      .subscribe((orgs) => {
        this.organisations = orgs['results'];
        this.getDate(this.organisations); // gets all dates
        this.labels = this.getUnique(this.date); // get unique dates
        let yVal = new Array(this.labels.length);
        this.labels.map((eachDate, index) => {
          yVal[index] = this.upToDate(eachDate); // get organisation count to date
        });
        let dataPoints = [];
        for (var i = 0; i < this.labels.length; i++) {
          dataPoints.push({ y: yVal[i], label: this.labels[i] }); // create array for graph
        }
        let chart = new CanvasJS.Chart('organisation', {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: 'Organisation growth',
          },
          data: [
            {
              type: 'line',
              dataPoints: dataPoints,
            },
          ],
        });
        chart.render();
      });
  }

  getDate(orgs: Organisation[]) {
    let date = [];
    orgs.map((org) => {
      let dateSplit = org.submission_date.split('-');
      let year = dateSplit[0];
      let month = dateSplit[1];
      date.push(year + '-' + month);
    });
    this.date = date;
  }

  getUnique(dateArr) {
    var unique = dateArr.filter(function (itm, i, a) {
      return i == a.indexOf(itm);
    });
    return unique;
  }

  upToDate(date) {
    let count = 0;
    this.date.map((eachDate) => {
      if (eachDate <= date) count++;
    });
    return count;
  }
}
