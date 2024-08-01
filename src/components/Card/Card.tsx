import { ICardProps } from '../../common/types/main'
import { getCurrentPopulation } from '../../common/utils/utils'
import { memo } from 'react';

const Card = memo(({getPageCountries, country}: ICardProps) => {

    return (<div className="card">
                <img onClick={() => getPageCountries(country?.name.common)} src={country?.flags.png} alt={country?.name.official} />
                <div className="card__body">
                        <h2 onClick={() => getPageCountries(country?.name.common)}>{country?.name.official}</h2>
                        <p><b>Population:</b> {getCurrentPopulation(country?.population)} </p>
                        <p><b>Region:</b> {country?.region}</p>
                        <p><b>Capital:</b> {!country?.capital ? 'Capital is no find' : country?.capital[0]}</p>
                </div>
            </div>);
})
export default Card;
