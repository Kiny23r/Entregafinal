import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';  // Adicionando a importação do 'path'
import routes from './routes/route.js';
import methodOverride from 'method-override'; // Importando o method-override

const app = express();

// Configuração do middleware para interpretar dados de formulário e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

// Usar o method-override para permitir métodos como DELETE e PUT no formulário
app.use(methodOverride('_method'));

app.use((req, res, next) => {
  console.log('Método original:', req.method);  // Exibe o método original
  console.log('Método final:', req.method);     // Exibe o método após o override
  next();
});


// Conectar ao MongoDB Atlas
const url = "mongodb+srv://renan:123@202501.ulvez8l.mongodb.net/202501?retryWrites=true&w=majority&appName=202501";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB conectado com sucesso!"))
  .catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));

// Configurar caminho para arquivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Express configurando a pasta 'public' para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '/public')));

// Usar as rotas
app.use(routes);

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`));
