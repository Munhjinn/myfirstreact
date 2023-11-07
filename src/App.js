
import { useState } from 'react';
import './App.css';
import {Auth} from "./components/auth"
import{db} from  "./config/firebase"

function App()  {
    const [movieList, setMovieList] = useState([])

    const getMovieList = () => {

        
    }
    return (
        <div className="App">
            <Auth/>


        </div>
    );
        

}


export default App;
