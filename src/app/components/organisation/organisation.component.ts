import { Component, OnInit, Inject } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { FormBuilder, Validators } from '@angular/forms';
import { OrganisationsService } from '../../services/organisations/organisations.service';
import { Organisation } from '../../model';
import { CountriesService } from '../../services/countries.service';
import { Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogComponent } from './dialog/dialog.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css'],
})
export class OrganisationComponent implements OnInit {
  constructor(
    public tokenService: TokenService,
    private orgService: OrganisationsService,
    private formBuilder: FormBuilder,
    private countries: CountriesService,
    public dialog: MatDialog
  ) {}

  organisations: Organisation[];
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  displayedColumns: string[] = [
    'Organisation Name',
    'Owner',
    'Address',
    'City',
    'State',
    'Country',
    'View',
  ];
  dbColumns: string[] = [
    'organisation_name',
    'owner',
    'address',
    'city',
    'state',
    'country',
    'id',
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  addOrg: boolean = false;
  addOrgForm = this.formBuilder.group({
    orgName: ['', [Validators.required]],
    owner: ['', Validators.required],
    address: [''],
    city: [''],
    state: [''],
    country: [''],
  });
  errorMsg: string = '';
  saveMsg: string = '';
  editMsg: string = '';

  ngOnInit(): void {
    this.getCountries();
    this.orgService
      .getOrganisations(this.tokenService.token)
      .subscribe((orgs) => {
        this.organisations = orgs['results'];
      });
  }

  getCountries() {
    this.countries.allCountries().subscribe((data) => {
      this.countryInfo = data.Countries;
    });
  }

  onChangeCountry(countryValue) {
    this.stateInfo = this.countryInfo[countryValue].States;
    this.cityInfo = this.stateInfo[0].Cities;
  }

  onChangeState(stateValue) {
    this.cityInfo = this.stateInfo[stateValue].Cities;
  }

  openForms() {
    this.addOrg = !this.addOrg;
  }

  addNewOrg() {
    let orgName = this.addOrgForm.controls['orgName'].value;
    let owner = this.addOrgForm.controls['owner'].value;
    let address = this.addOrgForm.controls['address'].value;
    let country = this.checkFormValue('country', 'CountryName');
    let state = this.checkFormValue('state', 'StateName');
    let city = this.checkFormValue('city', 'CityName');
    if (this.addOrgForm.valid) {
      // valid details
      this.errorMsg = '';
      if (this.tokenService.loggedIn) {
        this.orgService
          .addOrganisation(
            this.tokenService.token,
            orgName,
            owner,
            address,
            city,
            state,
            country
          )
          .toPromise()
          .then((res) => {
            this.saveMsg = 'Entry saved successfully';
            this.errorMsg = '';
            this.orgService
              .getOrganisations(this.tokenService.token)
              .subscribe((orgs) => {
                this.organisations = orgs['results'];
              });
            return res;
          })
          .catch((err) => {
            this.saveMsg = '';
            this.errorMsg = 'This entry already exists';
            return err;
          });
      } else {
        // login failed
        this.errorMsg = 'Please login!';
      }
    } else {
      //invalid email or missing pw
      this.saveMsg = '';
      if (this.addOrgForm.get('orgName').status != 'VALID')
        this.errorMsg = 'Please enter an organisation name!';
      else if (this.addOrgForm.get('owner').status != 'VALID')
        this.errorMsg = 'Please enter the owner name!';
    }
  }
  checkFormValue(input: string, output: string) {
    let value;
    if (input == 'country')
      value = this.countryInfo[this.addOrgForm.get(input).value];
    else if (input == 'state')
      value = this.stateInfo[this.addOrgForm.get(input).value];
    else {
      value = this.cityInfo[this.addOrgForm.get(input).value];
      if (value == undefined) return null;
      return value;
    }

    if (value == undefined) return null;
    return value[output];
  }

  openOrgDetails(id: number) {
    let data = this.organisations.find((row) => row.id === id);
    this.editMsg = '';
    const dialogRef = this.dialog.open(DialogComponent, {
      data: data,
      panelClass: 'edit-org',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.orgService
          .updateOrg(
            this.tokenService.token,
            result['organisation_name'],
            result['owner'],
            result['address'],
            result['city'],
            result['state'],
            result['country']
          )
          .toPromise()
          .then(() => (this.editMsg = 'Changes saved successfully'));
      }
    });
  }

  sortData(sort: Sort) {
    const data = this.organisations.slice();
    if (!sort.active || sort.direction === '') {
      this.organisations = data;
      return;
    }

    this.organisations = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Organisation Name':
          return compare(a.organisation_name, b.organisation_name, isAsc);
        case 'Owner':
          return compare(a.owner, b.owner, isAsc);
        case 'Address':
          return compare(a.address, b.address, isAsc);
        case 'City':
          return compare(a.city, b.city, isAsc);
        case 'State':
          return compare(a.state, b.state, isAsc);
        case 'Country':
          return compare(a.country, b.country, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
