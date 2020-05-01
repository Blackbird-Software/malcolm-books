import Country from './country';
import {countries as tmpCountries} from 'typed-countries';
import {Injectable} from '@nestjs/common';
import CountryInterface from './country.interface';

@Injectable()
export default class CountriesList {
    countries: CountryInterface[] = [];

    constructor() {
        for (const tmpCountry of tmpCountries) {
            const country = new Country(tmpCountry.iso, tmpCountry.name);
            this.countries.push(country);
        }
    }

    all(): CountryInterface[] {
        return this.countries;
    }

    keys(): string[] {
        return this.countries.map(country => country.code);
    }
}
