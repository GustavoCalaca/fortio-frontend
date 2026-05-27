// src/pages/ListarCliente.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarCliente, deletarCliente } from "../api";

// importações do Material UI
import { Button, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ListarCliente() {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    const data = await listarCliente();
    setClientes(data);
  };

  const handleDelete = async (id) => {
    await deletarCliente(id);
    carregarClientes();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Lista de Clientes</h1>

      {/* Botão Novo estilizado */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => navigate("/novo")}
        style={{ marginBottom: "20px" }}
      >
        Novo
      </Button>

      {/* Tabela estilizada */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>CNPJ</TableCell>
            <TableCell>Segmento</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.id}</TableCell>
              <TableCell>{c.nome}</TableCell>
              <TableCell>{c.cnpj}</TableCell>
              <TableCell>{c.segmento}</TableCell>
              <TableCell>
                <Button
                  color="error"
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(c.id)}
                >
                  Deletar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
