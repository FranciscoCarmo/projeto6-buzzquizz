let quizzes;
let conteudo = document.querySelector(".conteudo");
let idQuiz = [];
let todosQuizes;

let caixaPerguntastemplate = "";
let urlAPI = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";
let respostaCerta = 0;
let tamanhoQuiz = 0;
let acertos = 0;
let perguntas;
let quiz;
let level;
let identificador;
let userQuiz = localStorage.getItem("quizUsuario");
let arrayUsuario = [];
let botaoTemplate;
let user;
let listaUsuario;
let play;

quizzesDoUsuario();

function quizzesDoUsuario() {
  conteudo.innerHTML = `<div class = "play"></div>`;

  listaUsuario = JSON.parse(userQuiz);
  play = document.querySelector('.play')
  if (userQuiz === null) {
    let botaoTemplate = `<div class="botao-criar-quiz">
    <p>Você não criou nenhum <br> quizz ainda :(</p>
    <button onclick="displayCriaInformacoesBasicas()">Criar Quizz</button>
    </div>
    <div class="quizes"><h2>Todos os Quizes</h2>
    <div class = "todos-quizes"></div></div>`;
    play.innerHTML += `${botaoTemplate}`;
    obterQuizz();
  }

  for (let i = 0; i < listaUsuario.length; i++) {
    let promise = axios.get(`${urlAPI}/${listaUsuario[i].data.id}`);
    promise.then(criarArrayUsario);
  }

  botaoTemplate = `<div class="lista">
  <div class ="topo-quizes-user"> <h3>Seus Quizes</h3>
  <ion-icon name="add-circle" onclick="displayCriaInformacoesBasicas()">
  </ion-icon></div><div class="lista-usuario">`
  play.innerHTML += `${botaoTemplate}`;

}

function criarArrayUsario(resposta) {
  arrayUsuario.push(resposta.data);
  if (arrayUsuario.length === listaUsuario.length) {
    listarQuizzesUsuario();
  }
}

function listarQuizzesUsuario() {
  user = document.querySelector(".lista-usuario");

  for (let i = 0; i < arrayUsuario.length; i++) {
    let usuarioTemplate = `
    <div class="quiz-usuario">
    <div class="caixa-quiz" onclick="localizarQuiz(${arrayUsuario[i].id})">
      <div class="caixa-imagem">
        <img class="imagem-quiz" src="${arrayUsuario[i].image}" alt="">
        <div class="gradiente"></div>
      </div>
      <div class="titulo">${arrayUsuario[i].title}</div>
    </div>
  `;

    user.innerHTML += `${usuarioTemplate}`;
  }
  play.innerHTML += `</div></div></div>
  <div class="quizes">
    <h2>Todos os Quizes</h2>
    <div class="todos-quizes"></div>
  </div>`;
  obterQuizz();
}

function obterQuizz() {
  todosQuizes = document.querySelector(".todos-quizes");
  todosQuizes.innerHTML = "";
  const promise = axios.get(`${urlAPI}`);
  promise.then(verificarQuizzes);
}

function verificarQuizzes(resposta) {
  quizzes = {};
  quizzes = resposta.data;

  for (let i = 0; i < quizzes.length; i++) {
    let repetido = false;

    for (let j = 0; j < arrayUsuario.length; j++) {
      if (quizzes[i].id === arrayUsuario[j].id) {
        repetido = true;
      }
    }
    if (!repetido) {
      exibirQuizz(quizzes[i]);
    }
  }
}

function exibirQuizz(quizzesGerais) {
  const quizTemplate = `<div class = "caixa-quiz" onclick="localizarQuiz(${quizzesGerais.id})">
        <div class="caixa-imagem">
        <img class ="imagem-quiz" src="${quizzesGerais.image}" alt="">
        <div class="gradiente"></div></div>
        <div class="titulo">${quizzesGerais.title}</div>
        `;

  todosQuizes.innerHTML += `${quizTemplate}`;

  todosQuizes.innerHTML += `</div></div>`;
}

function varreAPI() {
  for (let i = 0; i < quizzes.length; i++) {
    quizzes.id !== 711;
    return quizzes;
  }
}

function localizarQuiz(id) {
  conteudo.innerHTML = "";
  respostaCerta = 0;
  const promise = axios.get(`${urlAPI}/${id}`);
  promise.then(abrirQuiz);
  identificador = id;
}

function abrirQuiz(response) {
  quiz = response.data;

  perguntas = quiz.questions;

  /*  Gerando titulo do Quiz */

  const tituloQuiz = `
  <div class="titulo-quiz">
    <p>${quiz.title}</p>
    <img class="img-titulo" src="${quiz.image}" alt="">
    <div class="sombra"></div>
   </div><div class = "play"></div>`;

  conteudo.innerHTML += tituloQuiz;

  /* Gerando perguntas do quiz */

  for (let i = 0; i < perguntas.length; i++) {
    perguntas[i].answers.sort(embaralhar);
  }

  for (let j = 0; j < perguntas.length; j++) {
    let resposta = perguntas[j].answers;

    caixaPerguntastemplate = `<div class="caixa-pergunta fechada">
        <div class="perguntaCaixa" style = "background-color: ${perguntas[j].color}">
        ${perguntas[j].title}</div><div class = "container-respostas"> `;

    for (let k = 0; k < resposta.length; k++) {
      if (resposta[k].isCorrectAnswer === true) {
        caixaPerguntastemplate += `
                <div class="caixa-respostas certa" onclick="responder(this)" >
            <img class = "img-resposta" src="${resposta[k].image}"  alt="">
            <div class="resposta"><p>${resposta[k].text}<p></div></div>
            `;
      } else {
        caixaPerguntastemplate += `<div class="caixa-respostas" onclick="responder(this)" >
            <img class = "img-resposta" src="${resposta[k].image}"  alt="">
            <div class="resposta"><p>${resposta[k].text}<p></div></div>`;
      }
    }
    caixaPerguntastemplate += `</div></div>`
    document.querySelector('.play').innerHTML += caixaPerguntastemplate;
    setTimeout(perguntaSeguinte, 2000);
  }
  /* caixaPerguntastemplate += `</div>` */
}

function embaralhar() {
  return Math.random() - 0.5;
}

function responder(elemento) {
  let caixaResposta = elemento.parentNode.parentNode;
  let naoEscolhida = caixaResposta.querySelectorAll(".img-resposta");

  if (caixaResposta.classList.contains("fechada")) {
    //Adicionando opacidade em todas menos a escolhida

    for (let i = 0; i < naoEscolhida.length; i++) {
      naoEscolhida[i].classList.add("branco");
      elemento.classList.remove("branco");
    }

    // verificando se escolheu a opcao correta

    if (elemento.classList.contains("certa")) {
      respostaCerta++;
    }

    // impedindo de que o usuario mude a resposta
    caixaResposta.classList.remove("fechada");
    elemento.classList.add("selecionado");

    for (let i = 0; i < naoEscolhida.length; i++) {
      naoEscolhida[i].classList.add("branco");
      elemento.classList.remove("branco");
    }

    // chamando a funcao que calcula os pontos

    let finalizada = document.querySelectorAll(".fechada");

    if (finalizada.length === 0) {
      calcularPontos();
      setTimeout(function () {
        document.querySelector(".tela-level").scrollIntoView();
      }, 2000);
    } else {
      setTimeout(perguntaSeguinte, 2000);
    }
  }
}

function perguntaSeguinte() {
  if (document.querySelector(".fechada")) {
    document.querySelector(".fechada").scrollIntoView();
  }
}

function calcularPontos() {
  tamanhoQuiz = perguntas.length;
  acertos = Math.round((respostaCerta / tamanhoQuiz) * 100);

  let controle = 0;
  let indice = 0;
  level = quiz.levels;

  for (let i = 0; i < level.length; i++) {
    let nivel = level[i].minValue;

    if (acertos >= nivel && nivel >= controle) {
      controle = nivel;
      indice = i;
    }
  }
  level = level[indice];
  exibirPontuacao();
}

function exibirPontuacao() {
  let pontuacaoTemplate = `<div class = "tela-level">
    <div class="titulo-level"><p>${acertos}% de acerto: ${level.title}</p></div>
    <div class = "caixa-level"> <div><img src="${level.image}" alt=""></div>
    <div class = "texto-level"> <p>${level.text}</p></div></div>
    </div>`;

  let posQuiz = `<div class="finalizar">
    <button class="reiniciar" onclick="reiniciarQuiz()">
    <p>Reiniciar Quiz</p></button>
    <button class="home" onclick="voltarHome()"><p>Voltar para Home</p></button></div>`;
  conteudo.innerHTML += pontuacaoTemplate;
  conteudo.innerHTML += posQuiz;
}

function reiniciarQuiz() {
  document.querySelector("header").scrollIntoView();
  setTimeout(localizarQuiz(identificador), 1000);
}
