import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // FIXED: Added missing import
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
  const { t, i18n } = useTranslation(); // Destructuring translation function and instance
  const [persons, setPersons] = useState([]);
  const [form, setForm] = useState(initialFormState);

  // FIXED: Added missing language changer function to prevent loop/crash
  const changeLanguage = (lng) => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  };

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
      {/* Language Selector Controls */}
      <div className="lang-selector">
        <button
          type="button"
          onClick={() => changeLanguage("pt")}
          className={
            i18n.resolvedLanguage === "pt" ? "active" : ""
          }
        >
          PT
        </button>
        <button
          type="button"
          onClick={() => changeLanguage("en")}
          className={
            i18n.resolvedLanguage === "en" ? "active" : ""
          }
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => changeLanguage("de")}
          className={
            i18n.resolvedLanguage === "de" ? "active" : ""
          }
        >
          DE
        </button>
      </div>

      {/* Dynamic Title */}
      <h1>{t("title")}</h1>

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
