import { useTranslation } from "react-i18next";

// Component responsible for rendering the books grid and action buttons
export default function BookTable({
  books,
  onEditar,
  onEliminar,
}) {
  const { t } = useTranslation();

  // Helper function to cleanly format ISO dates into readable timestamps
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="table-container">
      <table className="person-table">
        <thead>
          <tr>
            <th>{t("bookTitle")}</th>
            <th>{t("author")}</th>
            <th>{t("launchDate")}</th>
            <th>{t("price")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{formatDate(book.launchDate)}</td>
              <td>
                {typeof book.price === "number"
                  ? `${book.price.toFixed(2)}€`
                  : book.price}
              </td>
              <td className="actions-cell">
                <button
                  onClick={() => onEditar(book.id)}
                  className="btn-edit"
                >
                  {t("edit")}
                </button>
                <button
                  onClick={() => onEliminar(book.id)}
                  className="btn-delete"
                >
                  {t("delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
