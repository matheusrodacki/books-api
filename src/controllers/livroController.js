import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (erro) {
      next(erro);
    }
  }
  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (erro) {
      next(erro);
    }
  }
  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);

      if(autorEncontrado !== null ){

        const livroCompleto = {
          ...novoLivro,
          autor: { ...autorEncontrado._doc },
        };
        const livroCriado = await livro.create(livroCompleto);
  
        res
          .status(201)
          .json({ message: "Livro criado com sucesso!", livro: livroCriado });


      }else{
        throw "autorNaoEncontrado";
      }

      
    } catch (erro) {
      next(erro);
    }
  }
  static async atualizarLivro(req, res, next) {
    const id = req.params.id;
    try {
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Livro alterado com sucesso!" });
    } catch (erro) {
      next(erro);
    }
  }
  static async deletarLivro(req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "Livro deletado com sucesso!" });
    } catch (erro) {
      next(erro);
    }
  }
  static async listaLivrosPorEditora(req, res, next) {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livro.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (erro) {
      next(erro);
    }
  }
}

export default LivroController;
