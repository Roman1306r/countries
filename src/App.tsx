import GridLoader from "react-spinners/GridLoader"
import './App.css'
import Main from "./components/Main/Main"
import useCustomContext from './common/hooks/useCustomContext'
import Header from './components/Header/Header'

function App() {

    const { loader, isDark } = useCustomContext()
    
    return (<div className={isDark ? "App dark" : "App"}>
                {loader && <div className="loader"><GridLoader color={isDark ? "white" : "black"} size={35} /></div>}
                <Header />
                <Main />
            </div>)
}
export default App
