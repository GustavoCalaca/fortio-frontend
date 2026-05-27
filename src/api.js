import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // endereço do seu backend
});

export const cadastrarCliente = async (cliente) => {
  const response = await api.post("/clientes", cliente);
  return response.data;
};

export const listarCliente = async () => {
  const response = await api.get("/clientes");
  return response.data;
};

export const deletarCliente = async (id) => {
  await api.delete(`/clientes/${id}`);
};
