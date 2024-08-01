import { ICountry } from './main'

export interface IContext {
	loader: boolean,
	setLoader: (loader: boolean) => void,
	countries: ICountry[],
	setCountries: (countries: []) => void,
	isDark: boolean,
	setIsDark: (isDark: boolean) => void
}

export type Children = {
    children: JSX.Element | JSX.Element[]
}