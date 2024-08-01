import React, { useState } from 'react';
import { Children, IContext } from '../../common/types/context'

export const AppContext = React.createContext<IContext>({
	loader: true,
	setLoader: () => {},
	countries: [],
	setCountries: () => {},
	isDark: false,
	setIsDark: () => {}
});

export const AppProvider =({children}: Children) => {
	
  const [loader, setLoader] = useState(true)
  const [countries, setCountries] = useState([])
  const [isDark, setIsDark] = useState(false)

  return (	<AppContext.Provider value={{loader, setLoader, countries, setCountries, isDark, setIsDark}}>
				{children}
        	</AppContext.Provider>)
}
