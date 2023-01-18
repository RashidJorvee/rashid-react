import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

function App(){
  const [name, setName] = useState("RASHID");
  useEffect(() => {document.title= `Celebrate ${name}`})
  return(
    <>
      <h2>Congratulation {name}</h2>
      <button onClick={() => setName("Raza")}>Change Name</button>
    </>
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
