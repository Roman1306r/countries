import Pagination from '@mui/material/Pagination'
import { useCallback, useEffect, useState } from "react"
import useCustomContext from '../../common/hooks/useCustomContext'
import { switchPage } from "../../common/utils/utils"
import { getAllCountries } from '../../common/api/api'
import Alert from '@mui/material/Alert';
import PageCountry from '../PageCountry/PageCountry'
import MainForm from '../MainForm/MainForm'
import Card from '../Card/Card'
import { ICountry } from '../../common/types/main'
import { initCountry } from '../../common/data/data'

const Main = () => {

    const [selected, setSelected] = useState<ICountry>(initCountry)
    const [pagination, setPagination] = useState({pageCount: 12, directive: 0})
    const { setLoader, countries, setCountries } = useCustomContext()
    const [filters, setFilters] = useState<{value: string, option: string}>({value: '', option: ''}) 
    const [filtered, setFiltered] = useState(countries) 
    
    useEffect(() => {
        countries.length > 1 ? setFiltered(countries) : getCountries()
    }, [selected])
    useEffect(() => { 
        setFiltered(countries.filter(country => country.name.official.toLowerCase().includes(filters.value.toLowerCase())))
    }, [filters.value])
    useEffect(() => {  
        setFiltered(countries.filter(country => country.region === filters.option))
    }, [filters.option])

    const getPageCountries = (id: string) => setSelected(countries.filter(c => c.name.common === id)[0])
     
    const onClose = useCallback(() => {
        setFiltered(countries)
        setFilters({...filters, value: ''})
    }, [])
    
    async function getCountries() {
        try {
            setLoader(true)
            const responce = await getAllCountries()
            setCountries(responce)			
            setFiltered(responce)     
        } finally {
            setLoader(false)
        }
    }
 
    return (<div className="main">
                {selected.status 
                ? <PageCountry country={selected} setSelected={setSelected} />
                : <>
                    <MainForm filters={filters} setFilters={setFilters} />
                    <div className="cards__country">
                        {filtered
                            .filter((_c, i) => i >= pagination.directive && i < pagination.directive + pagination.pageCount)
                            .map((country) => <Card getPageCountries={getPageCountries} key={country.name.common} country={country} />)
                        }
                    </div>
                    <div className='pagination'>
                        {!filtered.length && <Alert sx={{width: '100%', fontSize: '20px'}} onClose={onClose} severity="warning">Please enter correct information!</Alert>}
                        {filtered.length > pagination.pageCount && <Pagination className='pagination__item' size={window.innerWidth <= 767 ? 'medium' : 'large'} onChange={(event, page) => switchPage(event, page, pagination, setPagination)} count={Math.ceil(filtered.length / pagination.pageCount)} variant="outlined" shape="rounded" />}
                    </div>
                </>
                }   
            </div>)
}
export default Main
