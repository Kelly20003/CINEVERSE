import mongoose from 'mongoose';

const VisitaSchema = new mongoose.Schema({
    dataHora: { type: Date, default: Date.now },
});

const Visitas = mongoose.model('Visitas', VisitaSchema);

export default Visitas;
