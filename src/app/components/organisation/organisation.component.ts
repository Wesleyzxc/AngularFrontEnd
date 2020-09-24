import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { FormBuilder, Validators } from '@angular/forms';
import { OrganisationsService } from '../../services/organisations/organisations.service';
import { Organisation } from '../../model';
import { CountriesService } from '../../services/countries.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css'],
})
export class OrganisationComponent implements OnInit {
  constructor(
    public tokenService: TokenService,
    private orgService: OrganisationsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private countries: CountriesService
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
  ];
  dbColumns: string[] = [
    'organisation_name',
    'owner',
    'address',
    'city',
    'state',
    'country',
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
  ngOnInit(): void {
    this.getCountries();
    this.orgService
      .getDepartments(this.tokenService.token)
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
        //TODO add org here
        this.orgService
          .addDepartment(
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
              .getDepartments(this.tokenService.token)
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
}
