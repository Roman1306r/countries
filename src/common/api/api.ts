import axios, { AxiosError } from 'axios'

const URL = 'https://restcountries.com/v3.1/'
const instance = axios.create({
	baseURL: URL
});

export const getAllCountries = async () => {
	try {
		const response = await instance.get('all')	
		return response.data
	} catch (error) {
		console.error(AxiosError);
	}
}