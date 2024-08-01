import { useEffect } from "react";
import { MdDarkMode } from "react-icons/md";
import { PiSunDimLight } from "react-icons/pi";
import useCustomContext from '../../common/hooks/useCustomContext'
import { setDarkTheme, setLightTheme } from '../../common/utils/utils'
import { memo } from 'react';

const Header = memo(() => {

    const {isDark, setIsDark} = useCustomContext()

    useEffect(() => {
        if(localStorage.getItem('isDark')) setIsDark(true)
    }, [setIsDark])

    return <header className="header">
                <h1>Where in the world?</h1>
                {isDark ? <span onClick={() => setLightTheme(setIsDark)}><MdDarkMode /> Dark mode</span> : <span onClick={() => setDarkTheme(setIsDark)}><PiSunDimLight /> Light mode</span>}
           </header>
})
export default Header;