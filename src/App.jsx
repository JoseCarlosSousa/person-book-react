import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [persons, setPersons] = useState([]);

  // Estado para controlar os campos do formulário
  const [form, setForm] = useState({
    id: null,
    firstName: "",
    lastName: "",
    address: "",
    gender: "Male",
  });

  const url = import.meta.env.VITE_API_URL;

  // 1. CARREGAR TODAS AS PESSOAS (GET)
  const carregarPessoas = () => {
    fetch(`${url}/api/person/v1`, {
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        const lista = data._embedded?.personVOList || data;
        setPersons(lista);
      })
      .catch((error) =>
        console.error("Erro ao procurar dados:", error),
      );
  };

  useEffect(() => {
    carregarPessoas();
  }, []);

  // 2. IR BUSCAR APENAS 1 PESSOA PARA EDITAR (GET por ID)
  const selecionarPessoa = (id) => {
    fetch(`${url}/api/person/v1/${id}`, {
      headers: {
        Accept: "application/json", // Avisa a API que o React quer receber JSON
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setForm({
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          gender: data.gender,
        });
      })
      .catch((error) =>
        console.error("Erro ao buscar pessoa:", error),
      );
  };

  // 3. ADICIONAR (POST) OU ATUALIZAR (PUT)
  const salvarPessoa = (e) => {
    e.preventDefault();

    const ehEditar = form.id !== null;
    const metodo = ehEditar ? "PUT" : "POST";

    fetch(`${url}/api/person/v1`, {
      method: metodo,
      headers: {
        "Content-Type": "application/json", // Avisa que o React está a ENVIAR JSON
        Accept: "application/json", // Avisa que o React quer RECEBER JSON
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.ok) {
          carregarPessoas();
          limparFormulario();
        }
      })
      .catch((error) =>
        console.error("Erro ao salvar:", error),
      );
  };

  // 4. ELIMINAR (DELETE)
  const eliminarPessoa = (id) => {
    if (
      window.confirm(
        "Tens a certeza que queres eliminar esta pessoa?",
      )
    ) {
      fetch(`${url}/api/person/v1/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            carregarPessoas(); // Recarrega a tabela imediato
          }
        })
        .catch((error) =>
          console.error("Erro ao eliminar:", error),
        );
    }
  };

  const limparFormulario = () => {
    setForm({
      id: null,
      firstName: "",
      lastName: "",
      address: "",
      gender: "Male",
    });
  };

  return (
    <div className="container">
      <h1>Livro de Pessoas</h1>

      {/* FORMULÁRIO */}
      <form
        onSubmit={salvarPessoa}
        style={{
          marginBottom: "30px",
          background: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h3>
          {form.id
            ? "Editar Pessoa"
            : "Adicionar Nova Pessoa"}
        </h3>
        <div
          style={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <input
            type="text"
            placeholder="Nome"
            value={form.firstName}
            onChange={(e) =>
              setForm({
                ...form,
                firstName: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Apelido"
            value={form.lastName}
            onChange={(e) =>
              setForm({ ...form, lastName: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Morada"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            required
          />
          <select
            value={form.gender}
            onChange={(e) =>
              setForm({ ...form, gender: e.target.value })
            }
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div style={{ marginTop: "10px" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              marginRight: "10px",
            }}
          >
            {form.id ? "Atualizar" : "Guardar"}
          </button>
          {form.id && (
            <button
              type="button"
              onClick={limparFormulario}
              style={{ backgroundColor: "#ccc" }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* TABELA */}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Apelido</th>
            <th>Morada</th>
            <th>Género</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id}>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td>{person.address}</td>
              <td>{person.gender}</td>
              <td>
                <button
                  onClick={() =>
                    selecionarPessoa(person.id)
                  }
                  style={{
                    backgroundColor: "#2196F3",
                    color: "white",
                    marginRight: "5px",
                    padding: "3px 8px",
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarPessoa(person.id)}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    padding: "3px 8px",
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
