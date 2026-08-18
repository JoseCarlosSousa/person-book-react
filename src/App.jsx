import { useEffect, useState } from "react";
import { personService } from "./services/api";
import PersonForm from "./components/PersonForm";
import PersonTable from "./components/PersonTable";
import "./App.css";

// Initial state object to clean or reset the form fields
const initialFormState = {
  id: null,
  firstName: "",
  lastName: "",
  address: "",
  gender: "Male",
};

function App() {
  const [persons, setPersons] = useState([]);
  const [form, setForm] = useState(initialFormState);

  // Load the full list of persons when the application boots up
  const carregarPessoas = async () => {
    try {
      const lista = await personService.findAll();
      setPersons(lista);
    } catch (error) {
      console.error("Error fetching persons list:", error);
    }
  };

  useEffect(() => {
    carregarPessoas();
  }, []);

  // Fetch a single person profile and load it into the form state
  const lidarComSelecao = async (id) => {
    try {
      const data = await personService.findById(id);
      setForm({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender,
      });
    } catch (error) {
      console.error("Error fetching person by ID:", error);
    }
  };

  // Handle form submission for both creating (POST) and updating (PUT)
  const lidarComSalvar = async (e) => {
    e.preventDefault();
    try {
      if (form.id !== null) {
        await personService.update(form);
      } else {
        await personService.create(form);
      }
      carregarPessoas();
      limparFormulario();
    } catch (error) {
      console.error("Error persisting person data:", error);
    }
  };

  // Trigger record deletion after user confirmation
  const lidarComEliminar = async (id) => {
    if (
      window.confirm(
        "Tens a certeza que queres eliminar esta pessoa?",
      )
    ) {
      try {
        const response = await personService.delete(id);
        if (response.ok) carregarPessoas();
      } catch (error) {
        console.error(
          "Error deleting person record:",
          error,
        );
      }
    }
  };

  // Reset the form state back to its initial empty values
  const limparFormulario = () => setForm(initialFormState);

  return (
    <div className="container">
      <h1>Livro de Pessoas</h1>

      <PersonForm
        form={form}
        setForm={setForm}
        onSalvar={lidarComSalvar}
        onCancelar={limparFormulario}
      />

      <PersonTable
        persons={persons}
        onEditar={lidarComSelecao}
        onEliminar={lidarComEliminar}
      />
    </div>
  );
}

export default App;
