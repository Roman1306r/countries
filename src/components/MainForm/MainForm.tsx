import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { IoIosSearch } from "react-icons/io";
import useCustomContext from '../../common/hooks/useCustomContext'
import { getRegion } from '../../common/utils/utils'
import { IFormProps } from '../../common/types/main'
import { memo } from 'react';

const MainForm = memo(({filters, setFilters}: IFormProps) => {

    const [regions, setRegions] = useState<string[]>([])
    const {countries} = useCustomContext()
    useEffect(() => {
       setRegions(() => getRegion(countries))  
    }, [countries])

    return (<div className="main__form">

                <div className="main__form-search">
                    <TextField className='search' color="primary" value={filters.value} onChange={(e) => setFilters({...filters, value: e.target.value})} id="outlined-basic" label="Enter country" variant="outlined" InputProps={{
                            startAdornment: <InputAdornment position="start"><IoIosSearch /></InputAdornment>,
                    }} /> 
                </div>
                <div className="main__form-select">
                    <Autocomplete
                        className='select'
                        disableClearable
                        onChange={((_event, option) => setFilters({...filters, option}))}
                        disablePortal
                        id="combo-box-demo"
                        options={regions}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Filter by Region" />}
                    />
                </div>
            </div>);
})
export default MainForm;
