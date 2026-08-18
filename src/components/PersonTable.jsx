// Component responsible for rendering the grid and action buttons
export default function PersonTable({
  persons,
  onEditar,
  onEliminar,
}) {
  return (
    <div className="table-container">
      <table className="person-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Apelido</th>
            <th>Morada</th>
            <th>Género</th>
            <th>Ações</th>
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
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(person.id)}
                  className="btn-delete"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
