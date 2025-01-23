import mongoose from 'mongoose';

const FilmeSchema = new mongoose.Schema({
    title: String,
    genere: String,
    videoPath: String, 
    img: String,
    synopsis: String,
});

const Filmes = mongoose.model('Filmes', FilmeSchema);
export default Filmes;

