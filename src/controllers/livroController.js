import { livro, autor } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

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
      let livroEncontrado = await livro.findById(id);
      if (livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);
      } else {
        next(new NaoEncontrado("Id do Livro não encontrado!"));
      }
    } catch (erro) {
      next(erro);
    }
  }
  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);

      if (autorEncontrado !== null) {
        const livroCompleto = {
          ...novoLivro,
          autor: { ...autorEncontrado._doc },
        };
        const livroCriado = await livro.create(livroCompleto);

        res
          .status(201)
          .json({ message: "Livro criado com sucesso!", livro: livroCriado });
      } else {
        next(new NaoEncontrado("ID do Autor não encontrado!"));
      }
    } catch (erro) {
      next(erro);
    }
  }
  static async atualizarLivro(req, res, next) {
    const id = req.params.id;
    try {
      let livroEncontrado = await livro.findByIdAndUpdate(id, req.body);

      if (livroEncontrado !== null) {
        res.status(200).json({ message: "Livro alterado com sucesso!" });
      } else {
        next(new NaoEncontrado("Id do Livro não encontrado!"));
      }
    } catch (erro) {
      next(erro);
    }
  }
  static async deletarLivro(req, res, next) {
    try {
      const id = req.params.id;
      let livroEncontrado = await livro.findByIdAndDelete(id);
      if (livroEncontrado !== null) {
        res.status(200).json({ message: "Livro deletado com sucesso!" });
      } else {
        next(new NaoEncontrado("Id do Livro não encontrado!"));
      }
    } catch (erro) {
      next(erro);
    }
  }
  static async listaLivrosPorFiltro(req, res, next) {
    try {
      const busca = processaBusca(req.query);

      const livrosBuscados = await livro.find(busca);
      if (livrosBuscados.length > 0) {
        res.status(200).json(livrosBuscados);
      } else {
        next(new NaoEncontrado("não encontrado!"));
      }
    } catch (erro) {
      next(erro);
    }
  }
}

function processaBusca(prametros) {
  const { editora, titulo, minPaginas, maxPaginas } = prametros;

  const busca = {};
  if (editora) busca.editora = { $regex: editora, $options: "i" };
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.paginas = {};

  if (minPaginas) busca.paginas.$gte = minPaginas;
  if (maxPaginas) busca.paginas.$lte = maxPaginas;

  return busca;
}

export default LivroController;
