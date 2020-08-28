export type SimpleTypes = string | boolean | number;

export interface ICountry {
  name: string;
  topLevelDomain: string[] | [];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[] | [];
  capital: string;
  altSpellings: string[] | [];
  region: string;
  subregion: string;
  population: number;
  latlng: number[] | [];
  demonym: string;
  area: number;
  gini: number;
  timezones: string[] | [];
  borders: string[] | [];
  nativeName: string;
  numericCode: string;
  currencies: any[] | [];
  languages: any[] | [];
  translations: object;
  flag: string;
  regionalBlocs: any[] | [];
  cioc: any[] | [];
}
