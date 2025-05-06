import "./App.css";

import { useState } from "react";
import axios from "axios";


function App() {
  const [numbers, setNumbers] = useState("");
  const [feedback, setFeedback] = useState("");

  function clickButton() {
    // Enviar para a API os valores
    if (feedback === "Carregando...") {
      return;
    }
    const list = numbers.replace(/\s/g, "").split(",");

    console.log(list);

    if (!list.length || !numbers) {
      alert("error: Voce deve preencher algo");
      return;
    }

    const listNumbers: number[] = [];

    let error = false;

    list.forEach((item) => {
      if (isNaN(+item)) {
        alert("erro: Utilize apenas números");
        error = true;
      } else {
        listNumbers.push(+item);
      }
    });

    if (error) {
      return;
    }

    console.log(listNumbers);

    setFeedback("Carregando...");

    axios
      .post("https://coding-dojo-api.lucasanes.com/heapsort", listNumbers)
      .then((response) => {
        console.log(response);
      }).catch(()=>{
        setFeedback("Falha ao se comunicar com API")
      })
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
        {feedback}
      </div>
    </>
  );
}

export default App;
