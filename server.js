import express from 'express';
import cors from 'cors';
import route from './routes.js';
import dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(cors({
    origin: 'https://taskflow-fs.netlify.app',
    credentials: true,
}));

app.use(express.json());
app.use(route);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor conectado na porta ${PORT}`);
});
