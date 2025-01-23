import mongoose from 'mongoose';

const FilmeSchema = new mongoose.Schema({
    title: String,
    genere: String,
    videoPath: String, 
    img: String,
    synopsis: String,
});

const VisitaSchema = new mongoose.Schema({
    dataHora: { type: Date, default: Date.now },
});

const Visitas = mongoose.model('Visitas', VisitaSchema);

export default Visitas;