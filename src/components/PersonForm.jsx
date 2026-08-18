import { useTranslation } from "react-i18next";

// Component responsible for rendering the add/edit form
export default function PersonForm({
  form,
  setForm,
  onSalvar,
  onCancelar,
}) {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSalvar} className="person-form">
      <h3>{form.id ? t("editPerson") : t("addPerson")}</h3>
      <div className="form-grid">
        <input
          type="text"
          placeholder={t("name")}
          value={form.firstName}
          onChange={(e) =>
            setForm({ ...form, firstName: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder={t("lastName")}
          value={form.lastName}
          onChange={(e) =>
            setForm({ ...form, lastName: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder={t("address")}
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
          {/* FIXED: Dynamic translation for gender options */}
          <option value="Male">{t("male")}</option>
          <option value="Female">{t("female")}</option>
        </select>
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
