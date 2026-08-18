import { useTranslation } from "react-i18next";

// Component responsible for rendering the grid and action buttons
export default function PersonTable({
  persons,
  onEditar,
  onEliminar,
}) {
  // FIXED: Destructured the translation function inside the component
  const { t } = useTranslation();

  return (
    <div className="table-container">
      <table className="person-table">
        <thead>
          <tr>
            <th>{t("name")}</th>
            <th>{t("lastName")}</th>
            <th>{t("address")}</th>
            <th>{t("gender")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id}>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td>{person.address}</td>
              <td>{person.gender}</td>
              <td className="actions-cell">
                <button
                  onClick={() => onEditar(person.id)}
                  className="btn-edit"
                >
                  {t('edit')}
                </button>
                <button
                  onClick={() => onEliminar(person.id)}
                  className="btn-delete"
                >
                  {t('delete')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
