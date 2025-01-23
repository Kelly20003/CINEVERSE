import mongoose from 'mongoose';

const FilmeSchema = new mongoose.Schema({
    title: String,
    genere: String,
    videoPath: String, 
    img: String,
    synopsis: String,
});

