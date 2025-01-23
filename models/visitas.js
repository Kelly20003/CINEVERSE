import mongoose from 'mongoose';

// Define o esquema de Visitas
const VisitaSchema = new mongoose.Schema({
    data: { type: String, required: true }, // Armazena a data no formato "YYYY-MM-DD"
    hora: { type: String, required: true }, // Armazena a hora no formato "HH:mm:ss"
});

// Middleware para preencher os campos `data` e `hora` antes de salvar
VisitaSchema.pre('validate', function (next) {
    const now = new Date();
    if (!this.data) {
        this.data = now.toISOString().split('T')[0]; // Gera "YYYY-MM-DD"
    }
    if (!this.hora) {
        this.hora = now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(' ')[1];// Gera "HH:mm:ss"
    }
    next();
});

// Função estática para contar o total de visitas
VisitaSchema.statics.contarVisitas = async function () {
    return await this.countDocuments();
};

// Cria o modelo
const Visitas = mongoose.model('Visitas', VisitaSchema);

export default Visitas;
