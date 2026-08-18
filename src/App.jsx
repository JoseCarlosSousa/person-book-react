import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // 1. Criar o estado para guardar a lista de pessoas
  const [persons, setPersons] = useState([]);

  // 2. Chamar a API quando a página carrega
  useEffect(() => {
    const url = import.meta.env.VITE_API_URL;

    fetch(`${url}/api/person/v1`, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const lista = data._embedded?.personVOList || data;
        setPersons(lista);
      })
      .catch((error) =>
        console.error("Erro ao procurar dados:", error),
      );
  }, []);

  // 3. Desenhar a tabela no ecrã com os dados recebidos
  return (
    <div className="container">
      <h1>Livro de Pessoas</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Apelido</th>
            <th>Morada</th>
            <th>Género</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id}>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td>{person.address}</td>
              <td>{person.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
