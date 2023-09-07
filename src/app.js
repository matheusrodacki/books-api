import express from "express";

const app = express();
app.use(express.json());

const livros = [
  {
    id: 1,
    título: "O Senhor dos Anéis",
  },
  {
    id: 2,
    título: "O Hobbit",
  },
];

app.get("/", (req, res) => {
  res.status(200).send("***Curso de Node.JS***");
});

app.get("/livros", (req, res) => {
  res.status(200).json(livros);
});

app.get("/livros/:id", (req, res) => {
  const index = buscalivro(req.params.id);

  if (index != -1) {
    res.status(200).json(livros[index]);
  } else {
    res.status(404).send("Erro! Livro não encontrado!");
  }
});

function buscalivro(id) {
  return livros.findIndex((livro) => {
    return livro.id === Number(id);
  });
}

app.post("/livros", (req, res) => {

  const livro = req.body;

  const index = buscalivro(livro.id);

  if (index != -1) {
    res.status(400).send("Erro! Esse livro já existe!");
  } else {
    livros.push(req.body);
    res.status(200).send("Livro cadastrado com sucesso!");
  }

  
});

app.put("/livros/:id", (req, res) => {
  const index = buscalivro(req.params.id);

  if (index != -1) {
    livros[index].título = req.body.título;
    res.status(200).json(livros[index]);
  } else {
    res.status(404).send("Erro! Livro não encontrado!");
  }
});

app.delete("/livros/:id", (req, res) => {
  const index = buscalivro(req.params.id);

  if (index != -1) {
    livros.splice(index, 1);
    res.status(200).send("Livro apagado com sucesso!");
  } else {
    res.status(404).send("Erro! Livro não encontrado!");
  }
});

export default app;
