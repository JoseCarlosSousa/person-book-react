// Component responsible for rendering the add/edit form
export default function PersonForm({
  form,
  setForm,
  onSalvar,
  onCancelar,
}) {
  return (
    <form onSubmit={onSalvar} className="person-form">
      <h3>
        {form.id
          ? "Editar Pessoa"
          : "Adicionar Nova Pessoa"}
      </h3>
      <div className="form-grid">
        <input
          type="text"
          placeholder="Nome"
          value={form.firstName}
          onChange={(e) =>
            setForm({ ...form, firstName: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Apelido"
          value={form.lastName}
          onChange={(e) =>
            setForm({ ...form, lastName: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Morada"
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
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="form-buttons">
        <button type="submit" className="btn-save">
          {form.id ? "Atualizar" : "Guardar"}
        </button>
        {form.id && (
          <button
            type="button"
            onClick={onCancelar}
            className="btn-cancel"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
