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

  ngOnInit(): void {
    this.orgService
      .getOrganisations(this.tokenService.token)
      .subscribe((orgs) => {
        this.organisations = orgs['results'];
        let chart = new CanvasJS.Chart('organisation', {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: 'Basic Column Chart in Angular',
          },
          data: [
            {
              type: 'column',
              dataPoints: [
                { y: 71, label: 'Apple' },
                { y: 55, label: 'Mango' },
                { y: 50, label: 'Orange' },
                { y: 65, label: 'Banana' },
                { y: 95, label: 'Pineapple' },
                { y: 68, label: 'Pears' },
                { y: 28, label: 'Grapes' },
                { y: 34, label: 'Lychee' },
                { y: 14, label: 'Jackfruit' },
              ],
            },
          ],
        });
        chart.render();
      });
  }
}
