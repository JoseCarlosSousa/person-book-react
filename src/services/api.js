const URL_BASE = import.meta.env.VITE_API_URL;

// Default headers for JSON communication
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const personService = {
  // Fetch all persons from the database
  findAll: async () => {
    const response = await fetch(
      `${URL_BASE}/api/person/v1`,
      { headers: { Accept: "application/json" } },
    );
    const data = await response.json();
    return data._embedded?.personVOList || data;
  },

  // Fetch a single person by their unique ID
  findById: async (id) => {
    const response = await fetch(
      `${URL_BASE}/api/person/v1/${id}`,
      { headers: { Accept: "application/json" } },
    );
    return await response.json();
  },

  // Create a new person record
  create: async (person) => {
    return await fetch(`${URL_BASE}/api/person/v1`, {
      method: "POST",
      headers,
      body: JSON.stringify(person),
    });
  },

  // Update an existing person record
  update: async (person) => {
    return await fetch(`${URL_BASE}/api/person/v1`, {
      method: "PUT",
      headers,
      body: JSON.stringify(person),
    });
  },

  // Delete a person record by ID
  delete: async (id) => {
    return await fetch(`${URL_BASE}/api/person/v1/${id}`, {
      method: "DELETE",
    });
  },
};
