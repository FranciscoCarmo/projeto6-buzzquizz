let quizzes;
let conteudo = document.querySelector('.conteudo');
let idQuiz = [];
let todosQuizes;
let caixaPerguntastemplate = "";
let escolhido = null;
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
    const promise = axios.get('https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes');
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

    const promise = axios.get(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${id}`)
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
        perguntas[i].answers.sort(embaralhar);
    }


    for (let j = 0; j < perguntas.length; j++) {

        let resposta = perguntas[j].answers;

        caixaPerguntastemplate = `<div class="caixa-pergunta fechada">
        <div class="pergunta" style = "background-color: ${perguntas[j].color}">
        ${perguntas[j].title}</div>`

        for (let k = 0; k < resposta.length; k++) {
            caixaPerguntastemplate += `<div class="caixa-respostas" onclick="responder(this)" >
            <img class = "img-resposta" src="${resposta[k].image}"  alt="">
            <div class="resposta"><p>${resposta[k].text}<p></div></div>
            `

        }
        
        caixaPerguntastemplate += `</div>`
        console.log(caixaPerguntastemplate)
        conteudo.innerHTML += caixaPerguntastemplate;
       
        
    }


}

function embaralhar() {
    return Math.random() - 0.5;
} 

function responder(elemento) {

    let caixaResposta = elemento.parentNode;
    let naoEscolhida = caixaResposta.querySelectorAll('.img-resposta');
    console.log(caixaResposta)
    console.log(caixaResposta.classList.contains('fechada'))


    if (caixaResposta.classList.contains('fechada')) {
       for (let i = 0; i < naoEscolhida.length; i++) {
            naoEscolhida[i].classList.add('branco');
            elemento.classList.remove('branco')
        }

        caixaResposta.classList.remove('fechada')
       
        elemento.classList.add('selecionado');
        

        escolhido = caixaResposta.querySelector('.selecionado');


        console.log(escolhido)
    } 


}