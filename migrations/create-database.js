require('dotenv').config();
const { Client } = require('pg'); 
const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PWD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT || 5432;

const createDatabase = async () => {
  const client = new Client({
    user: username,
    host: host,
    password: password,
    port: port,
  });
  console.log('Tentando criar o banco de dados:', database);

  try {
    await client.connect();

    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${database}';`);
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${database};`);
      console.log(`Banco de dados '${database}' criado com sucesso!`);
    } else {
      console.log(`Banco de dados '${database}' já existe.`);
    }
  } catch (error) {
    console.error('Erro ao criar o banco de dados:', error);
  } finally {
    await client.end();
  }
};

createDatabase();