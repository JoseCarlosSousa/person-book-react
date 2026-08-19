import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { personService } from "../services/api"; // Verify correct relative path
import PersonForm from "../components/PersonForm";
import PersonTable from "../components/PersonTable";

const initialFormState = {
  id: null,
  firstName: "",
  lastName: "",
  address: "",
  gender: "Male",
};

export default function PeoplePage() {
  const { t } = useTranslation();
  const [persons, setPersons] = useState([]);
  const [form, setForm] = useState(initialFormState);

  const carregarPessoas = async () => {
    try {
      setPersons(await personService.findAll());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    carregarPessoas();
  }, []);

  const lidarComSelecao = async (id) => {
    try {
      setForm(await personService.findById(id));
    } catch (error) {
      console.error(error);
    }
  };

  const lidarComSalvar = async (e) => {
    e.preventDefault();
    try {
      if (form.id !== null)
        await personService.update(form);
      else await personService.create(form);
      carregarPessoas();
      limparFormulario();
    } catch (error) {
      console.error(error);
    }
  };

  const lidarComEliminar = async (id) => {
    if (window.confirm("Tens a certeza?")) {
      try {
        const res = await personService.delete(id);
        if (res.ok) carregarPessoas();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const limparFormulario = () => setForm(initialFormState);

  return (
    <>
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
    </>
  );
}
