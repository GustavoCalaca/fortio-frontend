// src/pages/CadastrarCliente.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarCliente } from "../api";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const formatCNPJ = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 18);
};

const formatCEP = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
};

export default function CadastrarCliente() {
  const [form, setForm] = useState({
    nome: "", cnpj: "", segmento: "",
    cep: "", endereco: "", numero: "",
    bairro: "", cidade: "", estado: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "cnpj" ? formatCNPJ(value) :
        name === "cep" ? formatCEP(value) :
        value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await cadastrarCliente(form);
    navigate("/");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, green, orange)",
        p: 4,
        backgroundImage: "url('/gestaotech.png')",   // 🔹 logo no fundo
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",                // 🔹 centralizada
        backgroundSize: "300px auto",                // 🔹 tamanho da logo
        opacity: 0.95                                // 🔹 leve transparência
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 400, bgcolor: "rgba(255,255,255,0.9)" }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          color="primary"
        >
          Cadastrar Cliente
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Nome" name="nome" value={form.nome} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="CNPJ" name="cnpj" value={form.cnpj} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Segmento" name="segmento" value={form.segmento} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="CEP" name="cep" value={form.cep} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Endereço" name="endereco" value={form.endereco} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Número" name="numero" value={form.numero} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Bairro" name="bairro" value={form.bairro} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Cidade" name="cidade" value={form.cidade} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Estado" name="estado" value={form.estado} onChange={handleChange} fullWidth margin="normal" />

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              Salvar
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}