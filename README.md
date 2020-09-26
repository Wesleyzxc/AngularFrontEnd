# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.2. 

## Backend
To run this app, please clone and run the [API](https://github.com/Wesleyzxc/Resync-backend) with the included database structure.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Structure
The structure of this project includes 3 services; `tokenService`, `organisationService` and `countriesService`

`tokenService` and `organisationService` connects to the database, with the [API](https://github.com/Wesleyzxc/Resync-backend) hosted on localhost:3000. 

`countriesService` is an online API hosted on [GitHub](https://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json) by [sagarshirbhate](https://github.com/sagarshirbhate).

The only completed components are: `login`, `register`, `organisation`. Other components such as `header` and `home` are partially complete and the rest were generated in advance but was left untouched.

## Model
One model was also created for `Organisation` which has the JSON response from the API.

## Graph/Chart
The basic chart used was provided by [ChartJS](https://www.chartjs.org/) but no work has been done to modify data to match data from API.

## License
[MIT](https://choosealicense.com/licenses/mit/)
