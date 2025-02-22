import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';



import Filmes from './models/filmes.js';  // Importa o modelo de filmes
import Visitas from './models/visitas.js';

const app = express();
const port = 3000;


app.use(cors());  // Permite requisições de diferentes origens
app.use(express.json());  // Permite que o corpo das requisições seja em formato JSON



// Rota para pegar todos os filmes
app.get("/filmes", async (req, res) => {
    try {
        const filmes = await Filmes.find();
        res.json(filmes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar filmes' });
    }
});

// Rota para pegar um filme específico pelo ID
app.get("/filmes/:id", async (req, res) => {
    const movieId = req.params.id;
    try {
        const movie = await Filmes.findById(movieId);  // Busca pelo _id
        if (!movie) return res.status(404).json({ error: 'Filme não encontrado' });
        res.json({ videoPath: movie.videoPath });  // Retorna apenas o caminho do vídeo
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar filme' });
    }
});



app.get('/img/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT imagem_url FROM imagens WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json({ img: result.rows[0].img });
        } else {
            res.status(404).json({ message: 'Imagem não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar imagem' });
    }
});
// Rota para criar um novo filme
app.post("/filmes", async (req, res) => {
    const filme = req.body;
    try {
        const newFilme = await Filmes.create(filme);
        res.json(newFilme);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar filme' });
    }
});

app.use(async (req, res, next) => {
    try {
        const novaVisita = new Visitas(); // Cria uma nova visita
        await novaVisita.save(); // Salva no banco de dados
        console.log('Visita registrada no banco.');
        next(); // Continua para a próxima rota ou middleware
    } catch (error) {
        console.error('Erro ao registrar visita:', error);
        next(error); // Passa o erro adiante
    }
});

app.get('/total-visitas', async (req, res) => {
    try {
        const totalVisitas = await Visitas.contarVisitas(); // Conta o total de visitas no banco
        res.json({ totalVisitas }); // Retorna o total como JSON
    } catch (error) {
        console.error('Erro ao contar visitas:', error);
        res.status(500).json({ error: 'Erro ao contar visitas' });
    }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Banco de dados conectado'))
    .catch(err => console.error('Erro ao conectar ao banco de dados:', err, process.env.MONGO_URI));

app.listen(3000);