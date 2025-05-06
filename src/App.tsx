import "./App.css";

import { useState } from "react";


function App() {
  const [numbers, setNumbers] = useState("");

  function clickButton() {
    // pegar os valores inputados 
    // transformar em uma lista quebrando por "," ou ", "
    // validar se cada item é um número
    // Enviar para a API os valores

    const list = numbers.replace(/\s/g, "").split(",");

    console.log(list);
    
    if(!list.length || !numbers){
      alert("error: Voce deve preencher algo")
      return
    }

    const listNumbers: number[] = [];

    let error = false;

    list.forEach((item)=>{
      if(isNaN(+item)){
        alert("erro: Utilize apenas números");
        error = true;
      } else{
        listNumbers.push(+item)
      }
    })
    
    if (error) {
      return;
    }

    console.log(listNumbers)
  }

  return (
    <>
      <div className="card">
        <label htmlFor="numbers">Lista de números</label>
        <input
          id="numbers"
          type="text"
          placeholder="ex: 1, 5, 7, 2"
          onChange={(e) => setNumbers(e.target.value)}
          value={numbers}
        />
        <button onClick={clickButton}> Enviar </button>
      </div>
    </>
  );
}

export default App;
