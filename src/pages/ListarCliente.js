// src/pages/ListarCliente.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarCliente, deletarCliente, listarClientePorId } from "../api";

// Material UI
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

export default function ListarCliente() {
  const [clientes, setClientes] = useState([]);
  const [searchId, setSearchId] = useState("");
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

  const handleSearch = async () => {
    if (searchId.trim() === "") {
      carregarClientes();
      return;
    }
    try {
      const cliente = await listarClientePorId(searchId);
      setClientes(cliente ? [cliente] : []);
    } catch {
      setClientes([]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Lista de Clientes</h1>

      {/* Barra de busca + botão novo */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Buscar por ID"
          variant="outlined"
          size="small"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          Buscar
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/novo")}
        >
          Novo
        </Button>
      </Box>

      {/* Tabela */}
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
