import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
      type: String,
      required: [true, "O parâmetro `titulo` é obrigatório"],
    },
    editora: {
      type: String,
      required: [true, "O parâmetro `editora` é obrigatório"],
    },
    preco: {
      type: Number,
      required: [true, "O parâmetro `preco` é obrigatório"],
    },
    paginas: { type: Number },
    autor: autorSchema
    
  },
  { versionKey: false }
);

const livro = mongoose.model("livros", livroSchema);

export default livro;
