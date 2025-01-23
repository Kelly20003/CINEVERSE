import mongoose from 'mongoose';

// Define o esquema de Visitas
const VisitaSchema = new mongoose.Schema({
    data: { type: String, required: true }, // Armazena a data (ex: "2025-01-23")
    hora: { type: String, required: true }, // Armazena a hora (ex: "14:30:45")
});

// Função estática para contar o total de visitas
VisitaSchema.statics.contarVisitas = async function () {
    return await this.countDocuments(); // Conta o total de documentos (visitas registradas)
};

// Antes de salvar, preenche automaticamente os campos `data` e `hora`
VisitaSchema.pre('save', function (next) {
    const now = new Date();
    this.data = now.toISOString().split('T')[0]; // Extrai a data no formato "YYYY-MM-DD"
    this.hora = now.toTimeString().split(' ')[0]; // Extrai a hora no formato "HH:mm:ss"
    next();
});

// Cria o modelo
const Visitas = mongoose.model('Visitas', VisitaSchema);

export default Visitas;
