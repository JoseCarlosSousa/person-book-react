import { useTranslation } from "react-i18next";

// Component responsible for rendering the add/edit form for books
export default function BookForm({
  form,
  setForm,
  onSalvar,
  onCancelar,
}) {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSalvar} className="person-form">
      <h3>{form.id ? t("editBook") : t("addBook")}</h3>
      <div className="form-grid">
        <input
          type="text"
          placeholder={t("bookTitle")}
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder={t("author")}
          value={form.author}
          onChange={(e) =>
            setForm({ ...form, author: e.target.value })
          }
          required
        />
        <input
          type="datetime-local"
          placeholder={t("launchDate")}
          value={
            form.launchDate
              ? form.launchDate.substring(0, 16)
              : ""
          }
          onChange={(e) =>
            setForm({ ...form, launchDate: e.target.value })
          }
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder={t("price")}
          value={form.price}
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
