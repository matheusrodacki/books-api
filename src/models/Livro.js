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
      enum: {
        values: ["Clássicos", "JK Publisher"],
        message: "A editora '{VALUE}' não é um valor aceito!",
      },
    },
    preco: {
      type: Number,
      required: [true, "O parâmetro `preco` é obrigatório!"],
    },
    paginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message:
          "O número de páginas deve estar entra 10 e 5000. Valor fornecido: '{VALUE}'",
      },
    },
    autor: autorSchema,
  },
  { versionKey: false }
);

const livro = mongoose.model("livros", livroSchema);

export default livro;
