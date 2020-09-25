import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Organisation } from '../../model';
import { TokenService } from '../token.service';
@Injectable({
  providedIn: 'root',
})
export class OrganisationsService {
  constructor(private http: HttpClient, public tokenService: TokenService) {}

  url: string = 'http://localhost:3000'; // local env
  getOrganisations(token: string) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.http.get(this.url + '/org/select', { headers: reqHeader });
  }

  addOrganisation(
    token: string,
    orgName,
    owner,
    address,
    city,
    state,
    country
  ) {
    let params = [
      { name: 'address', value: address },
      { name: 'city', value: city },
      { name: 'state', value: state },
      { name: 'country', value: country },
    ];
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      organisation_name: orgName,
      owner: owner,
    });
    params.map((data) => {
      if (data.value) reqHeader = reqHeader.append(data.name, data.value);
    });
    return this.http.post(this.url + '/org/add', null, { headers: reqHeader });
  }

  updateOrg(token: string, orgName, owner, address, city, state, country) {
    let params = [
      { name: 'address', value: address },
      { name: 'city', value: city },
      { name: 'state', value: state },
      { name: 'country', value: country },
    ];
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      organisation_name: orgName,
      owner: owner,
    });
    params.map((data) => {
      if (data.value) reqHeader = reqHeader.append(data.name, data.value);
    });

    return this.http.put(this.url + '/org/update', null, {
      headers: reqHeader,
    });
  }
}
