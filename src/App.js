import logo from './logo.svg';
import './App.css';
import HelloWorld from './components/HelloWorld';
import Months from './components/Months';
import {useRef, useState, useEffect, useReducer} from 'react'

const monthsName = ["January", "February", "March", "April", "May", "June", "July", "August"];
const monthsKeyVal = monthsName.map((month, i) => ({id: i, title:month}));

const query = `
query {
  allLifts {
    name
    elevationGain
    status
  }
}
`;

const opts = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query })
};

function Header(props){
  return(
    <h2>Welcome to {props.title}. Let's read more about the above days</h2>
  );
}

function Footer(props){
  return(
    <p>All rights reserved. Copyrights @ {props.year}</p>
  )
}
function GraphQLExecute({name, elevationGain, status}) {
  return(
    <>
      <h1>{name}</h1>
      <p>
        {elevationGain} {status}
      </p>
    </>
  )
}
function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  /*useEffect(() => {
    fetch('https://api.github.com/users/rashidjorvee').then((response) => response.json())
    .then(setData);
  }, []);
  console.log(data);
  if(data)
  return(
    <pre>{JSON.stringify(data)}</pre>
  );*/

  useEffect(() => {
    setLoading(true);
    fetch(`https://snowtooth.moonhighway.com/`, opts)
      .then((response) => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, []);
  console.log(data);
  if (loading) return <h1>Loading...</h1>;
  if (error)
    return <pre>{JSON.stringify(error)}</pre>;
  if (!data) return null;
  return (
    <div>
      {data.data.allLifts.map((lift) => (
        <GraphQLExecute
          name={lift.name}
          elevationGain={lift.elevationGain}
          status={lift.status}
        />
      ))}
    </div>
  );
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        

        <HelloWorld />
        <Header title="Clothing Shop"/>
        <Months monthsName={monthsKeyVal}/>
        
        <Footer year={2022}/>
      </header>
    </div>
  );
}
const peaks = [
  {name:"rashid", elevation: 530},
  {name:"raza", elevation: 430},
  {name:"rashd", elevation: 630}
];

function Lift ({data, renderItem, renderEmpty}){
  return !data.length ? renderEmpty : (
    <ul>
      {data.map((item) => (
      <li key={item.name}>
        {renderItem(item)}
      </li>))}
    </ul>
  ) 
}
function CustomLift(){
  return(
    <Lift data={peaks} 
    renderEmpty={<p>This list is empty.</p>}
    renderItem={(item)=> (
      <>
      {item.name} - {item.elevation}
      </>
    )}
    />
  )
}

export default CustomLift;
