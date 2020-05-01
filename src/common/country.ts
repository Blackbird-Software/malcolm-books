import {countries} from 'typed-countries';
import CountryInterface from './country.interface';

export default class Country implements CountryInterface {
    name: string;
    code: string;

    constructor(code: string, name: string) {
        this.code = code;
        this.name = name;
    }

    static createFromCode(code: string): CountryInterface {
        const country = countries.find(country => country.iso === code);

        return new Country(country.iso, country.name);
    }
}
