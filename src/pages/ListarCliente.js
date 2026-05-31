import { useEffect, useState, useMemo } from "react";
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
  Typography,
  Paper,
  TableContainer,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

// 🔹 Gráfico do MUI X Charts
import { PieChart } from '@mui/x-charts/PieChart';

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

  // 🔹 Gerar dados do gráfico dinamicamente com porcentagem
  const segmentosData = useMemo(() => {
    const counts = clientes.reduce((acc, cliente) => {
      const segmento = cliente.segmento || "Não informado";
      acc[segmento] = (acc[segmento] || 0) + 1;
      return acc;
    }, {});

    const total = clientes.length || 1; 

    return Object.entries(counts).map(([label, value], index) => {
      const percent = ((value / total) * 100).toFixed(1);
      return {
        id: index,
        value,
        label: `${label} (${percent}%)`,
      };
    });
  }, [clientes]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        color="primary"
        gutterBottom
        sx={{ mb: 3, fontWeight: "bold" }}
      >
        Lista de Clientes
      </Typography>

      {/* Barra de busca + botão novo */}
      <Box display="flex" gap={2} mb={3}>
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

      {/* Tabela com rolagem */}
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ mb: 4, maxHeight: 300 }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Nome</strong></TableCell>
              <TableCell><strong>CNPJ</strong></TableCell>
              <TableCell><strong>Segmento</strong></TableCell>
              <TableCell><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((c) => (
              <TableRow key={c.id} hover>
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
                    sx={{ borderRadius: 2 }}
                  >
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

{/* Gráfico + logo em cada extremidade */}
<Paper elevation={1} sx={{ p: 1, borderRadius: 3 }}>
  <Typography variant="h6" color="primary" gutterBottom>
    Segmentos de Clientes
  </Typography>

  <Box display="flex" alignItems="center" justifyContent="space-between">
    {/* Gráfico totalmente à esquerda */}
    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
      <PieChart
        series={[
          {
            data: segmentosData,
          },
        ]}
        width={250}
        height={200}
      />
    </Box>

    {/* Logo totalmente à direita */}
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      <img
        src="/gestaotech.png"
        alt="Logo Gestão Tech"
        style={{ width: 160, height: "auto" }} 
      />
      <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
        Gestão Tech
      </Typography>
    </Box>
  </Box>
</Paper>


    </Box>
  );
}
