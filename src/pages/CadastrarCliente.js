// src/pages/CadastrarCliente.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarCliente } from "../api";

export default function CadastrarCliente() {
  const [form, setForm] = useState({
    nome: "", cnpj: "", segmento: "",
    cep: "", endereco: "", numero: "",
    bairro: "", cidade: "", estado: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await cadastrarCliente(form);
    navigate("/");
  };

  return (
    <div>
      <h1>Cadastrar Cliente</h1>
      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
        <input name="cnpj" placeholder="CNPJ" value={form.cnpj} onChange={handleChange} />
        <input name="segmento" placeholder="Segmento" value={form.segmento} onChange={handleChange} />
        <input name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} />
        <input name="endereco" placeholder="Endereço" value={form.endereco} onChange={handleChange} />
        <input name="numero" placeholder="Número" value={form.numero} onChange={handleChange} />
        <input name="bairro" placeholder="Bairro" value={form.bairro} onChange={handleChange} />
        <input name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} />
        <input name="estado" placeholder="Estado" value={form.estado} onChange={handleChange} />
        <button type="submit">SALVAR</button>
      </form>
    </div>
  );
}
