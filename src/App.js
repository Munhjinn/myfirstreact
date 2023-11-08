import React from 'react';
import { useState,useEffect } from 'react';
import './App.css';
import {Auth} from "./components/auth"
import{db} from  "./config/firebase"
import{getDocs, collection}  from 'firebase/firestore'

function App()  {
    const [movieList, setMovieList] = useState([])
    const moviesCollectionRef = collection(db, "Movie")

    useEffect(() => {
    const getMovieList = async () => {
        //READ THE DATA
        //SET THE MOVIE LIST
        try{
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id,}))
        setMovieList(filteredData)
        } catch (err) {
            console.error(err);
        }

    }
    getMovieList();
}, [])

    return (
        <div className="App">
            <Auth/>

            <div>
                <input placeholder="Movie title..." />
                <input placeholder="Release date..." type="number" />
                <input type="checkbox " />
                <label>Received an Award</label>
                <button> Aublit Movie </button>

                
            </div>
            
            <div>
            { movieList.map((Movie)=> (
                <div>
                    <h1 style={{color: Movie.receivedAnAward ? "blue" : "red"}} >{Movie.title}</h1>
                    <p> Date: {Movie.releaseDate} </p>
                </div>
            ))}

        </div>
        </div>

    );
        

}


export default App;
