import React from 'react';
import { useState,useEffect } from 'react';
import './App.css';
import {Auth} from "./components/auth"
import{db} from  "./config/firebase"
import{getDocs, collection,addDoc,deleteDoc}  from 'firebase/firestore'

function App()  {
    const [movieList, setMovieList] = useState([])

    // NEw movie staties
    const [newMovieTitle, setNewMovieTitle] = useState("")
    const [newReleaseDate, setNewReleaseDate] = useState(0)
    const [isnewMovieAward, setIsNewMovieAward] = useState(false)


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

const onSubmitMovie = async () => {
    try{

    await addDoc(moviesCollectionRef,{
        title: newMovieTitle, 
        releaseDate: newReleaseDate,
        award: isnewMovieAward,

    }) ;

    const deleteMovie = async (id) => {
        const movieDoc = doc(db, "Movie", id)
        await deleteDoc();
    };
            
} catch(err) {
    console.error(err)
}

}

    return (
        <div className="App">
            <Auth/>

            <div>
                <input
                    placeholder="Movie title..." onChange={(e) => setNewMovieTitle(e.target.value)}/>
                <input
                    placeholder="Release date..."  
                    type="number"
                    onChange={(e) => setNewReleaseDate(e.target.value)} />
                <input 
                    type="checkbox "
                    // checked={isnewMovieAward} 
                    onChange={(e) => setIsNewMovieAward(e.target.checked)}  />
                <label>Received an Award</label>
                <button onCLick={onSubmitMovie} > Submit Movie.. </button>

                
            </div>
            
            <div>
            { movieList.map((Movie)=> (
                <div>
                    <h1 style={{color: Movie.receivedAnAward ? "blue" : "red"}} >{Movie.title}</h1>
                    <p> Date: {Movie.releaseDate} </p>
                </div>
            ))}

            <button onClick={() => deleteMovie(Movie.id)}> Delete Movie</button>
 
        </div>
        </div>

    );
        

}


export default App;
