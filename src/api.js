import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // endereço do seu backend
});

// cadastrar cliente
export const cadastrarCliente = async (cliente) => {
  const response = await api.post("/clientes", cliente);
  return response.data;
};

// listar todos os clientes
export const listarCliente = async () => {
  const response = await api.get("/clientes");
  return response.data;
};

// buscar cliente por ID
export const listarClientePorId = async (id) => {
  const response = await api.get(`/clientes/${id}`);
  return response.data;
};

// deletar cliente
export const deletarCliente = async (id) => {
  await api.delete(`/clientes/${id}`);
};
