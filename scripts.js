let quizzes;
let conteudo = document.querySelector('.conteudo');
let idQuiz = [];
let todosQuizes;
let caixaPerguntastemplate = "";
quizzesDoUsuario();
obterQuizz();

function quizzesDoUsuario() {

    const botaoTemplate = `<div class="botao-criar-quiz">
    <p>Você não criou nenhum <br> quizz ainda :(</p>
    <button onclick="">Criar Quizz</button>
    </div><h2>Todos os Quizes</h2>
    <div class="quizes"></div>`
    conteudo.innerHTML += `${botaoTemplate}`;

}

function obterQuizz() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promise.then(exibirQuizzes);

}

function exibirQuizzes(resposta) {
    quizzes = {}
    quizzes = resposta.data;
    todosQuizes = document.querySelector('.quizes');

    for (let i = 0; i < quizzes.length; i++) {
        idQuiz.push(quizzes[i].id)

        const quizTemplate = `<div class = "caixa-quiz" onclick="localizarQuiz(${idQuiz[i]})">
        <div class="caixa-imagem">
        <img class ="imagem-quiz" src="${quizzes[i].image}" alt="">
        <div class="gradiente"></div></div>
        <div class="titulo">${quizzes[i].title}</div></div>
        `

        todosQuizes.innerHTML += `${quizTemplate}`
    }

}

function localizarQuiz(id) {
    conteudo.innerHTML = "";

    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`)
    promise.then(abrirQuiz);

}

function abrirQuiz(response) {

    const quiz = response.data;
    const perguntas = quiz.questions;

    /*  Gerando titulo do Quiz */

    const tituloQuiz = `<div class="titulo-quiz">
    <p>${quiz.title}</p>
    <img class="img-titulo" src="${quiz.image}" alt="">
    <div class="sombra"></div>
   </div>`

    conteudo.innerHTML += tituloQuiz;


    /* Gerando perguntas do quiz */

    for (let i = 0; i < perguntas.length; i++) {

        let resposta = perguntas[i].answers;

        caixaPerguntastemplate += `<div class="caixa-pergunta">
        <div class="pergunta">${perguntas[i].title}</div>`



        for (let i = 0; i < resposta.length; i++) {
            caixaPerguntastemplate += `<div class="caixa-respostas">
            <img class = "img-resposta" src="${resposta[i].image}" alt="">
            <div class="resposta"><p>${resposta[i].text}<p></div></div>
            `

        }
        caixaPerguntastemplate += `</div>`
        conteudo.innerHTML += caixaPerguntastemplate;
        caixaPerguntastemplate = `<div class="caixa-pergunta">`
    }


}

function embaralhar() {
    return Math.random() - 0.5;
}

function escolherPerguntas() {

}