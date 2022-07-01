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

quizzesDoUsuario();
obterQuizz();

function quizzesDoUsuario() {
  const botaoTemplate = `<div class="botao-criar-quiz">
    <p>Você não criou nenhum <br> quizz ainda :(</p>
    <button onclick="displayCriaInformacoesBasicas()">Criar Quizz</button>
    </div><h2>Todos os Quizes</h2>
    <div class="quizes"></div>`;
  conteudo.innerHTML += `${botaoTemplate}`;
}

function obterQuizz() {
  const promise = axios.get(`${urlAPI}`);
  promise.then(exibirQuizzes);
}

function exibirQuizzes(resposta) {
  quizzes = {};
  quizzes = resposta.data;
  todosQuizes = document.querySelector(".quizes");

  for (let i = 0; i < quizzes.length; i++) {
    idQuiz.push(quizzes[i].id);

    const quizTemplate = `<div class = "caixa-quiz" onclick="localizarQuiz(${idQuiz[i]})">
        <div class="caixa-imagem">
        <img class ="imagem-quiz" src="${quizzes[i].image}" alt="">
        <div class="gradiente"></div></div>
        <div class="titulo">${quizzes[i].title}</div></div>
        `;

    todosQuizes.innerHTML += `${quizTemplate}`;
  }
}

function localizarQuiz(id) {
  conteudo.innerHTML = "";
respostaCerta =0;
  const promise = axios.get(`${urlAPI}/${id}`)
  promise.then(abrirQuiz);
  identificador = id;
}

function abrirQuiz(response) {
  quiz = response.data;
  console.log(quiz);
  perguntas = quiz.questions;

  /*  Gerando titulo do Quiz */

  const tituloQuiz = `<div class="titulo-quiz">
    <p>${quiz.title}</p>
    <img class="img-titulo" src="${quiz.image}" alt="">
    <div class="sombra"></div>
   </div>`;

  conteudo.innerHTML += tituloQuiz;

  /* Gerando perguntas do quiz */

  for (let i = 0; i < perguntas.length; i++) {
    perguntas[i].answers.sort(embaralhar);
  }

  for (let j = 0; j < perguntas.length; j++) {
    let resposta = perguntas[j].answers;

    caixaPerguntastemplate = `<div class="caixa-pergunta fechada">
        <div class="perguntaCaixa" style = "background-color: ${perguntas[j].color}">
        ${perguntas[j].title}</div><div class = "container-respostas"> `

    for (let k = 0; k < resposta.length; k++) {
      if (resposta[k].isCorrectAnswer) {
        caixaPerguntastemplate += `
                <div class="caixa-respostas certa" onclick="responder(this)" >
            <img class = "img-resposta" src="${resposta[k].image}"  alt="">
            <div class="resposta"><p>${resposta[k].text}<p></div></div>
            `;
      } else {
        caixaPerguntastemplate += `<div class="caixa-respostas" onclick="responder(this)" >
            <img class = "img-resposta" src="${resposta[k].image}"  alt="">
            <div class="resposta"><p>${resposta[k].text}<p></div></div>`
      }

    }
    caixaPerguntastemplate += `</div></div>`
    conteudo.innerHTML += caixaPerguntastemplate;
    setTimeout(perguntaSeguinte, 2000);
  }
}

function embaralhar() {
  return Math.random() - 0.5;
}

function responder(elemento) {

  let caixaResposta = elemento.parentNode.parentNode;
  let naoEscolhida = caixaResposta.querySelectorAll('.img-resposta');

  if (caixaResposta.classList.contains('fechada')) {

    //Adicionando opacidade em todas menos a escolhida

    for (let i = 0; i < naoEscolhida.length; i++) {
      naoEscolhida[i].classList.add('branco');
      elemento.classList.remove('branco')
    }

    // verificando se escolheu a opcao correta

    if (elemento.classList.contains("certa")) {
      respostaCerta++;
      console.log(respostaCerta)
    }

    // impedindo de que o usuario mude a resposta
    caixaResposta.classList.remove('fechada')
    elemento.classList.add('selecionado');

    for (let i = 0; i < naoEscolhida.length; i++) {
      naoEscolhida[i].classList.add("branco");
      elemento.classList.remove("branco");
    }


    // chamando a funcao que calcula os pontos

    let finalizada = document.querySelectorAll(".fechada");
    console.log(finalizada.length === 0);
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
  document.querySelector(".fechada").scrollIntoView();
}

function calcularPontos() {
  tamanhoQuiz = perguntas.length;
  acertos = Math.round((respostaCerta / tamanhoQuiz) * 100);
  console.log(acertos);
  

  level = quiz.levels;
  level.sort((a, b) => b.minValue - a.minValue);

  for (let i = 0; i < level.length; i++) {
    if (acertos < level[i].minValue) {
      level = level[i + 1];
      console.log(level);
      break;
    }
    level = level[i];
    console.log(level);
  }
  exibirPontuacao();
}

function exibirPontuacao() {
  let pontuacaoTemplate = `<div class = "tela-level">
    <div class="titulo-level"><p>${acertos}% de acerto: ${level.title}</p></div>
    <div class = "caixa-level"> <div><img src="${level.image}" alt=""></div>
    <div> <p>${level.text}</p></div></div>
    </div>`;

  let posQuiz = `<div class="finalizar">
    <button class="reiniciar" onclick="localizarQuiz(${identificador})">
    <p>Reiniciar Quiz</p></button>
    <button class="home" onclick="voltarHome()"><p>Voltar para Home</p></button></div>`
  conteudo.innerHTML += pontuacaoTemplate;
  conteudo.innerHTML += posQuiz;
}

function voltarHome() {
  document.location.reload(true)
}