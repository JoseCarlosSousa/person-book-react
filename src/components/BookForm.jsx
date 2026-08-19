import { useTranslation } from "react-i18next";

// Component responsible for rendering the add/edit form for books
export default function BookForm({
  form,
  setForm,
  onSalvar,
  onCancelar,
}) {
  const { t } = useTranslation();

  // Helper function to convert Java Date format into HTML datetime-local safe string
  const formatForInput = (dateValue) => {
    if (!dateValue) return "";

    try {
      // Create a clean date object handling numbers or strings from Java
      const date = new Date(dateValue);

      // If the date is invalid, return empty string safely
      if (isNaN(date.getTime())) return "";

      // Format to exact HTML standard: YYYY-MM-DDTHH:MM
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(
        2,
        "0",
      );
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(
        2,
        "0",
      );
      const minutes = String(date.getMinutes()).padStart(
        2,
        "0",
      );

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch (e) {
      console.error("Error parsing form date:", e);
      return "";
    }
  };

  return (
    <form onSubmit={onSalvar} className="person-form">
      <h3>{form.id ? t("editBook") : t("addBook")}</h3>
      <div className="form-grid">
        <input
          type="text"
          placeholder={t("bookTitle")}
          value={form.title || ""}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder={t("author")}
          value={form.author || ""}
          onChange={(e) =>
            setForm({ ...form, author: e.target.value })
          }
          required
        />
        <input
          type="datetime-local"
          placeholder={t("launchDate")}
          // FIXED: Using safe helper method instead of raw substring call
          value={formatForInput(form.launchDate)}
          onChange={(e) =>
            setForm({ ...form, launchDate: e.target.value })
          }
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder={t("price")}
          value={form.price || ""}
          onChange={(e) =>
            setForm({
              ...form,
              price: parseFloat(e.target.value) || "",
            })
          }
          required
        />
      </div>
      <div className="form-buttons">
        <button type="submit" className="btn-save">
          {form.id ? t("update") : t("save")}
        </button>
        {form.id && (
          <button
            type="button"
            onClick={onCancelar}
            className="btn-cancel"
          >
            {t("cancel")}
          </button>
        )}
      </div>
    </form>
  );
}
