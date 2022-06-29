let quizzes;
let quizTemplate;
let botaoCriar= document.querySelector('.botao-criar');
let todosQuizes = document.querySelector('.quizes');
let idQuiz = [];

quizzesDoUsuario();
obterQuizz();

function quizzesDoUsuario() {

    const botaoTemplate = `<div class="botao-criar-quiz">
    <p>Você não criou nenhum <br> quizz ainda :(</p>
    <button onclick="">Criar Quizz</button>
</div>`
   botaoCriar.innerHTML += botaoTemplate;

}

function obterQuizz() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promise.then(exibirQuizzes);

}

function exibirQuizzes(resposta) {
    quizzes = {}
    quizzes = resposta.data;
    console.log(quizzes)

    for (let i = 0; i < quizzes.length; i++) {
        idQuiz.push(quizzes[i].id) 

        quizTemplate = `<div class = "caixa-quiz" onclick="localizarQuiz(${idQuiz[i]})">
        <div class="caixa-imagem">
        <img class ="imagem-quiz" src="${quizzes[i].image}" alt="">
        <div class="gradiente"></div></div>
        <div class="titulo">${quizzes[i].title}</div></div>
        `
                
        todosQuizes.innerHTML += `${quizTemplate}`
    }

}

function localizarQuiz(id) {
    todosQuizes.innerHTML = "";
    botaoCriar.innerHTML = "";
    document.querySelector('h2').innerHTML = "";
    
    const promise = axios.get (`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`)
    promise.then(abrirQuiz);

}
function abrirQuiz (resposta){
    const quiz = resposta.data;
    console.log(quiz);

}