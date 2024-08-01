export interface ICountry {
	altSpellings: string[]
	area: number
	capital: string[] | undefined
	capitalInfo: {
		latlng: number[]
	}
	car: {
		signs: string[]
		side: string
	}
	cca2: string
	cca3: string
	ccn3: string
	coatOfArms : any
	continents: string[]
	currencies: any
	demonyms: any
	flag: string
	flags: any
	idd: any
	independent: boolean | undefined
	landlocked: boolean
	languages: any
	latlng: number[]
	maps: {
		googleMaps: string 
		openStreetMaps: string
	}
	name: any
	population: number
	region: string
	startOfWeek: string
	status: string
	timezones: string[] | any
	tld: string[]
	translations: any
	unMember: boolean
	subregion: any
}

export interface ICardProps {
	getPageCountries: (id: string) => void
	country: ICountry
}

export interface IFormProps {
	filters: {value: string, option: string}
	setFilters: (filters: {value: string, option: string}) => void
}

export interface IDataPage {
	steps: {id: number, step: string}[]
	info: {id: number, label: string | number | undefined ,title: string}[]
}

export interface ICountryProps {
	country: ICountry
	setSelected: (country: ICountry) => void
}