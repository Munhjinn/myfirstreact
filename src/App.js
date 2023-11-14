import React from 'react';
import { useState,useEffect } from 'react';
import './App.css';
import {Auth} from "./components/auth"
import{db} from  "./config/firebase"
import{getDocs, collection,addDoc,deleteDoc,doc}  from 'firebase/firestore'

function App()  {
    const [movieList, setMovieList] = useState([])

    // NEw movie staties
    const [newMovieTitle, setNewMovieTitle] = useState("");
    const [newReleaseDate, setNewReleaseDate] = useState(0);
    const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);


    const moviesCollectionRef = collection(db, "movies")


const onSubmitMovie = async () => {
    try{

    await addDoc(moviesCollectionRef,
        {
        title: newMovieTitle, 
        releaseDate: newReleaseDate, 
        receivedAnOscar: isNewMovieOscar,

    }) ;

    const deleteMovie = async (id) => {
        const movieDoc = doc(db, "movies", id)
        await deleteDoc(movieDoc);
    };
            
} catch(err) {
    console.error(err)
}

}

useEffect(() => { 
    const getMovieList = async () => {
        //READ THE DATA
        //SET THE MOVIE LIST
        try{
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id,}));
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
                <input
                    placeholder="Movie title..." onChange={(e) => setNewMovieTitle(e.target.value)}/>
                <input
                    placeholder="Release date..."  
                    type="number"
                    onChange={(e) => setNewReleaseDate(e.target.value)} />
                <input 
                    type="checkbox "
                    // checked={isnewMovieAward} 
                    onChange={(e) => setIsNewMovieOscar(e.target.checked)}  />
                <label>Received an Oscar</label>
                <button onCLick={onSubmitMovie} > Submit Movie.. </button>

                
            </div>
            
            <div>
            { movieList.map((movie)=> (
                <div>
                    <h1 style={{color: movie.receivedAnOscar ? "blue" : "red"}} >{movie.title}</h1>
                    <p> Date: {movie.releaseDate} </p>
                </div>
            ))}

            <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>
 
        </div>
        </div>

    );
        

}


export default App;
