import ErroBase  from "./ErroBase.js";

class NaoEncontrado extends ErroBase {
  constructor(menssagem = "Página não encontrada!") {
    super(menssagem, 404);
  }
}

export default NaoEncontrado;