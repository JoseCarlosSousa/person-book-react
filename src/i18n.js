import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation dictionaries including both People and Books management
const resources = {
  pt: {
    translation: {
      title: "Livro de Pessoas",
      booksTitle: "Catálogo de Livros",
      navPeople: "Pessoas",
      navBooks: "Livros",
      addPerson: "Adicionar Nova Pessoa",
      editPerson: "Editar Pessoa",
      addBook: "Adicionar Novo Livro",
      editBook: "Editar Livro",
      name: "Nome",
      lastName: "Apelido",
      address: "Morada",
      gender: "Género",
      actions: "Ações",
      male: "Male",
      female: "Female",
      save: "Guardar",
      update: "Atualizar",
      cancel: "Cancelar",
      edit: "Editar",
      delete: "Eliminar",
      // Book fields
      bookTitle: "Título",
      author: "Autor",
      launchDate: "Data de Lançamento",
      price: "Preço"
    }
  },
  en: {
    translation: {
      title: "Book of People",
      booksTitle: "Books Catalog",
      navPeople: "People",
      navBooks: "Books",
      addPerson: "Add New Person",
      editPerson: "Edit Person",
      addBook: "Add New Book",
      editBook: "Edit Book",
      name: "First Name",
      lastName: "Last Name",
      address: "Address",
      gender: "Gender",
      actions: "Actions",
      male: "Male",
      female: "Female",
      save: "Save",
      update: "Update",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      // Book fields
      bookTitle: "Title",
      author: "Author",
      launchDate: "Launch Date",
      price: "Price"
    }
  },
  de: {
    translation: {
      title: "Personenbuch",
      booksTitle: "Bücherkatalog",
      navPeople: "Personen",
      navBooks: "Bücher",
      addPerson: "Neue Person hinzufügen",
      editPerson: "Person bearbeiten",
      addBook: "Neues Buch hinzufügen",
      editBook: "Buch bearbeiten",
      name: "Vorname",
      lastName: "Nachname",
      address: "Adresse",
      gender: "Geschlecht",
      actions: "Aktionen",
      male: "Männlich",
      female: "Weiblich",
      save: "Speichern",
      update: "Aktualisieren",
      cancel: "Abbrechen",
      edit: "Bearbeiten",
      delete: "Löschen",
      // Book fields
      bookTitle: "Titel",
      author: "Autor",
      launchDate: "Erscheinungsdatum",
      price: "Preis"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt", // Force default language
  fallbackLng: "pt", // Fallback language if one is missing
  initImmediate: false, // Prevent asynchronous render loops
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false, // Prevents React from suspending and looping
  },
});

export default i18n;
