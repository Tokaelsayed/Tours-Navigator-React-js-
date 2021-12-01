import logo from './logo.svg';
import './App.css';
import Tours from './Tours';
import Loading from './Loading';
import { useEffect, useState } from 'react';

const url = 'https://course-api.com/react-tours-project' //Tours APi


function App() {
  const [loading,SetLoading]=useState(false);
  const[tours,SetTours]=useState([]);
  const fetchtours = async () =>
  {
   SetLoading(true);
   try
    {
    const response = await fetch(url);
    const tours= await response.json();
    SetLoading(false);
    SetTours(tours);
    } 
    catch (error)
     {
     SetLoading(false);
     console.log(error);
     }
  
  };
  //Remove tour if user not interested in it.
  const removeTour = (id) =>{
  const newTours = tours.filter((tour)=>tour.id!==id);
    SetTours(newTours);
  }
  //Note: Useeffect Run a code for every render.
  useEffect(()=>{
   fetchtours();
  },[]);
  if(loading)
  {
    return (
    <main>
      <Loading />
    </main>);
  }
  if(tours.length==0)
  {
    return(
      <div className="title">
        <h2>No Tours Left</h2>
        <button className="tour-price" onClick={fetchtours}>Refresh</button>
      </div>

    )
  }
 
  return( <main><Tours tours={tours} removeTour={removeTour}  /></main>);
}

export default App;
