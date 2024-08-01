import { ChangeEvent, SetStateAction } from 'react'
import { ICountry } from '../types/main'

export function checkLenghtSymbols(string: string, amount: number) {
    return string.length > amount ? string.slice(0, amount) + '...' : string
}
export function getCurrentPopulation(population: number) {
    const stringPopulation = String(population)
    let reversed = stringPopulation.split('').reverse().join('')
    if(stringPopulation.length < 4) return population
    if(stringPopulation.length < 7 && stringPopulation.length > 3) reversed =  `${reversed.slice(0, 3)} ${reversed.slice(3)}` 
    if(stringPopulation.length < 10 && stringPopulation.length > 6) reversed = `${reversed.slice(0, 3)} ${reversed.slice(3, 6)} ${reversed.slice(6)}`
    if(stringPopulation.length < 14 && stringPopulation.length > 9) reversed = `${reversed.slice(0, 3)} ${reversed.slice(3, 6)} ${reversed.slice(6, 9)} ${reversed.slice(9)}`
    return reversed.split('').reverse().join('')
}

function getCurrencies(obj: {}) {
  
    if(typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
        let value = Object.values(obj)[0]
        if(typeof value === 'object' && value !== null) {
            return `(${value.symbol}) ${value.name}`
        }
    }
}

export function getRegion(arr: ICountry[]){
 
    let region = []
    for (let country of arr) {
        region.push(country.region)
    }
    return Array.from(new Set(region)).sort()
}


export  function getLanguages(obj: {}) {

    if(typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
        let value = Object.values(obj)
        return value.slice(0, 2).join(' - ')
    }
}


export  function getCarsInfo(obj: {side: string, signs: string[]}) {
 
    if(typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
        let result = [];
        const {side, signs} = obj
        if(side) result.push(side)
        if(Array.isArray(signs)) result.push(signs[0])
        return result.join(' - ')
    }
}

export  function getTimezone(arr: []) {
   if(Array.isArray(arr)) return arr.slice(0, 3).join(', ')
}


export function switchPage(_event: ChangeEvent<unknown>, page: number, pagination: { pageCount: any; directive?: number }, setPagination: { (value: SetStateAction<{ pageCount: number; directive: number }>): void; (arg0: any): void }) {
    window.scrollTo({top: 0, behavior: "smooth"})
    const directive = --page * pagination.pageCount
    setPagination({...pagination, directive})
}




export function setDarkTheme(setTheme: (loader: boolean) => void) {
    setTheme(true)
    localStorage.setItem('isDark', String(true))
}
export function setLightTheme(setTheme: (loader: boolean) => void) {
    setTheme(false)
    localStorage.clear()
}


export function getData(country: ICountry | any) {

    return {
		steps: [
				{
					id: 1,
					step:  country.region
				},
				{
					id: 2,
					step:  country.subregion
				},
				{
					id: 3,
					step:  !country.capital ? 'Capital is no find' : country.capital[0] || '-'
				} 
			],
		info: [
				{
					id: 1,
					label: getCurrentPopulation(country.population) ,
                    title: 'Population'
				},
				{
					id: 2,
					label: checkLenghtSymbols(country.translations.rus.common, 30) ,
                    title: 'Into Russian'
				},
				{
					id: 3,
					label: country.landlocked ? 'yes' : 'no',
                    title: 'Landlocked'
				},
				{
					id: 4,
					label: getCarsInfo(country.car),
                    title: 'Car (side-signs)'
				},
				{
					id: 5,
					label: getLanguages(country.languages),
                    title: 'Languages'
				},
				{
					id: 6,
					label: getTimezone(country.timezones),
                    title: 'Timezone'
				},
				{
					id: 7,
					label: getCurrencies(country.currencies),
                    title: 'Currency'
				},
		]
	}
}