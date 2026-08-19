const URL_BASE = import.meta.env.VITE_API_URL;
const URL_BASE_PERSON = URL_BASE + "/api/person/v1";
const URL_BASE_BOOK = URL_BASE + "/api/book/v1";

// Default headers for JSON communication
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const personService = {
  // Fetch all persons from the database
  findAll: async () => {
    const response = await fetch(
      `${URL_BASE_PERSON}`,
      { headers: { Accept: "application/json" } },
    );
    const data = await response.json();
    return data._embedded?.personVOList || data;
  },

  // Fetch a single person by their unique ID
  findById: async (id) => {
    const response = await fetch(
      `${URL_BASE_PERSON}/${id}`,
      { headers: { Accept: "application/json" } },
    );
    return await response.json();
  },

  // Create a new person record
  create: async (person) => {
    return await fetch(`${URL_BASE_PERSON}`, {
      method: "POST",
      headers,
      body: JSON.stringify(person),
    });
  },

  // Update an existing person record
  update: async (person) => {
    return await fetch(`${URL_BASE_PERSON}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(person),
    });
  },

  // Delete a person record by ID
  delete: async (id) => {
    return await fetch(`${URL_BASE_PERSON}/${id}`, {
      method: "DELETE",
    });
  },
};


export const bookService = {
  findAll: async () => {
    const response = await fetch(`${URL_BASE_BOOK}`);
    return await response.json();
  },
  findById: async (id) => {
    const response = await fetch(`${URL_BASE_BOOK}/${id}`);
    return await response.json();
  },
  create: async (book) => {
    const response = await fetch(`${URL_BASE_BOOK}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    return await response.json();
  },
  update: async (book) => {
    const response = await fetch(`${URL_BASE_BOOK}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    return await response.json();
  },
  delete: async (id) => {
    return await fetch(`${URL_BASE_BOOK}/${id}`, { method: "DELETE" });
  }
};
