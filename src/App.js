import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import bgImage from './images/bg.jpg';  // Import the background image
import iconImage from './images/icon.png';

function App  ()  {
  const [search,setSearch] = useState('');
  const [data,setData] = useState([]);
  const submitHandler = (e) =>{
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=864fac25`).then(
      response => response.json()
    ).then(value => setData(value.Search))
}
const download = url => {
  fetch(url).then(response =>{
    response.arrayBuffer().then(function(buffer){
      const url = window.URL.createObjectURL(new Blob([buffer]))
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "image.png");
      document.body.appendChild(link);
      link.click();
    });
  })
}
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`, // Use the imported image here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >

    <div>
      <center>
        <h1>Search Your Favorite Movie</h1>
        <form onSubmit={submitHandler}>
          <input type="text" value={search } onChange={(e) => setSearch (e.target.value)}/><br/><br/>
          <input type="submit" value="Search" />
        </form><br/>
        <div className="row" >
          {data.length>=1?data.map(movie=>
          <div className="col-md-4" key={movie.imdbID}>
            <div className="card" style={{"width": "18rem"}}>
              <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
              <div className="card-body">
                <h4 className="card-title">{movie.Title}</h4>
                <a className="btn btn-primary" onClick={()=>download(movie.Poster)}>Download Poster</a>
              </div>
            </div>
          </div>
            ):null}
            </div>
        
        
      
      </center>
    </div>
    </div>
  )
}

export default App;
