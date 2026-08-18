import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation dictionaries for Portuguese, English, and German
const resources = {
  pt: {
    translation: {
      title: "Livro de Pessoas",
      addPerson: "Adicionar Nova Pessoa",
      editPerson: "Editar Pessoa",
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
    },
  },
  en: {
    translation: {
      title: "Book of People",
      addPerson: "Add New Person",
      editPerson: "Edit Person",
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
    },
  },
  de: {
    translation: {
      title: "Personenbuch",
      addPerson: "Neue Person hinzufügen",
      editPerson: "Person bearbeiten",
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
    },
  },
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
