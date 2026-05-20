const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// Configuração de conexão com o banco usando variáveis de ambiente
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'dimdim',
  password: process.env.DB_PASSWORD || 'dimdim123',
  port: 5432,
});

// CREATE - Adicionar uma nova conta
app.post('/contas', async (req, res) => {
  const { titular, saldo } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO contas (titular, saldo) VALUES ($1, $2) RETURNING *',
      [titular, saldo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar conta' });
  }
});

// READ - Listar todas as contas
app.get('/contas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contas');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar contas' });
  }
});

// READ - Buscar conta específica por ID
app.get('/contas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM contas WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Conta não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar conta' });
  }
});

// UPDATE - Atualizar saldo da conta
app.put('/contas/:id', async (req, res) => {
  const { id } = req.params;
  const { saldo } = req.body;
  try {
    const result = await pool.query(
      'UPDATE contas SET saldo = $1 WHERE id = $2 RETURNING *',
      [saldo, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Conta não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar conta' });
  }
});

// DELETE - Remover conta
app.delete('/contas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM contas WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Conta não encontrada' });
    }
    res.status(200).json({ message: 'Conta deletada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar conta' });
  }
});

// Health check para certificar que a API está rodando
app.get('/ping', (req, res) => res.send('pong'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`DimDim API rodando na porta ${port}`);
});
