import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { bookService } from "../services/api"; // Verify correct relative path
import BookForm from "../components/BookForm";
import BookTable from "../components/BookTable";

const initialFormState = {
  id: null,
  title: "",
  author: "",
  launchDate: "",
  price: "",
};

export default function BooksPage() {
  const { t } = useTranslation();
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(initialFormState);

  const carregarLivros = async () => {
    try {
      setBooks(await bookService.findAll());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  const lidarComSelecao = async (id) => {
    try {
      setForm(await bookService.findById(id));
    } catch (error) {
      console.error(error);
    }
  };

  const lidarComSalvar = async (e) => {
    e.preventDefault();
    try {
      if (form.id !== null) await bookService.update(form);
      else await bookService.create(form);
      carregarLivros();
      limparFormulario();
    } catch (error) {
      console.error(error);
    }
  };

  const lidarComEliminar = async (id) => {
    if (window.confirm("Tens a certeza?")) {
      try {
        const res = await bookService.delete(id);
        if (res.ok) carregarLivros();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const limparFormulario = () => setForm(initialFormState);

  return (
    <>
      <h1>{t("booksTitle")}</h1>
      <BookForm
        form={form}
        setForm={setForm}
        onSalvar={lidarComSalvar}
        onCancelar={limparFormulario}
      />
      <BookTable
        books={books}
        onEditar={lidarComSelecao}
        onEliminar={lidarComEliminar}
      />
    </>
  );
}
