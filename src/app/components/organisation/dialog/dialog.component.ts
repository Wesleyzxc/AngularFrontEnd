import { Component, OnInit, Inject } from '@angular/core';
import { Organisation } from '../../../model';
import { CountriesService } from '../../../services/countries.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  ngOnInit(): void {
    this.getCountries();
  }
  constructor(
    private countries: CountriesService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Organisation
  ) {}

  getCountries() {
    this.countries.allCountries().subscribe((data) => {
      this.countryInfo = data.Countries;
    });
  }

  onChangeCountry(countryValue) {
    this.stateInfo = this.countryInfo.find(
      (name) => name.CountryName === countryValue
    ).States;
    this.cityInfo = this.stateInfo[0].Cities;
  }

  onChangeState(stateValue) {
    this.cityInfo = this.stateInfo.find(
      (name) => name.StateName === stateValue
    ).Cities;
    // this.cityInfo = this.stateInfo[stateValue].Cities;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
