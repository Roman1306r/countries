import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { AiOutlineRollback } from "react-icons/ai";
import { FaMapMarkedAlt } from "react-icons/fa"
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Chip from '@mui/material/Chip';
import { RiInformationOffLine } from "react-icons/ri";
import Alert from '@mui/material/Alert';
import useCustomContext from '../../common/hooks/useCustomContext'
import { IoManSharp } from "react-icons/io5";
import { MdOutlineGTranslate } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { MdOutlineLanguage } from "react-icons/md";
import { RiTimeZoneFill } from "react-icons/ri";
import { RiCurrencyFill } from "react-icons/ri";
import { getData } from '../../common/utils/utils'
import { ICountryProps, IDataPage } from '../../common/types/main'
import { initCountry, initDataPage } from '../../common/data/data'
import { memo } from 'react';

const icons = [<IoManSharp />, <MdOutlineGTranslate />, <IoLockClosedOutline />, <FaCar />, <MdOutlineLanguage />, <RiTimeZoneFill />, <RiCurrencyFill />]
const PageCountry = memo(({country, setSelected}: ICountryProps) => {

    const {setLoader} = useCustomContext()
	const [data, setData] = useState<IDataPage>(initDataPage)
	
    useEffect(() => {
        try {
            setLoader(true)
			setData(() => getData(country))
        } finally {
            setTimeout(() => setLoader(false), 500)
        }
    }, [country])
	
    return <div className="page__country">
                <div className="page__country-container">
                    <div className='btn__container'>
                        <Button color='inherit' size='large' onClick={() => setSelected(initCountry)} variant="outlined"><AiOutlineRollback /></Button>
                        <Button color='inherit' size='large' onClick={() => window.open(country.maps.googleMaps)} variant="outlined"><FaMapMarkedAlt /></Button>
                    </div>
                    <div className="page__block">
                        <div className="page__left">
                            <img src={country.flags.png} alt={country.flags.alt} />
                            {country.coatOfArms.png && <img className='gerb' src={country.coatOfArms.png} alt="coatOfArms" />}
                        </div>
                        <div className="page__body">
                            <h1>{country.name.official}</h1>

                            {country.status === 'user-assigned' ? <Alert className='alert' variant="filled" color='warning' severity="warning">{country.status.toUpperCase()}</Alert> : <Alert className='alert' variant="filled" color='success' severity="success">{country.status.toUpperCase()}</Alert>}

                            <Stepper activeStep={3} alternativeLabel>
                                {data?.steps.map((label) => (
                                <Step  key={label.id}>
                                    <StepLabel>{label.step}</StepLabel>
                                </Step>
                                ))}
                            </Stepper>   
                            
                            <div className="page__block-name">
                                <div>{data?.info.map(info => <p key={info.id}><Chip component={'span'} className='chip' icon={icons[info.id - 1]} label={info.title}  /></p>)}</div>
                                <div>{data?.info.map(info => <p key={info.id}><Chip component={'span'} className='chip' label={info.label || <RiInformationOffLine />}  /></p>)}</div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
})
export default PageCountry;