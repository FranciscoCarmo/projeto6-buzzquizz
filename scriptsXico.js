let quizz = {
  title: "Título do quizz",
  image: "https://http.cat/411.jpg",
  questions: [],
  levels: [],
};

let qtdPerguntasQuizz = 0;
let qtdNiveisQuizz = 0;

let pergunta = {
  title: "Título da pergunta 1",
  color: "#123456",
  answers: [
    {
      text: "Texto da resposta 1",
      image: "https://http.cat/411.jpg",
      isCorrectAnswer: true,
    },
  ],
};

let umaResposta = {
  text: "Texto da resposta 2",
  image: "https://http.cat/411.jpg",
  isCorrectAnswer: false,
};

let levelCriar = {
  title: "Título do nível 1",
  image: "https://http.cat/411.jpg",
  text: "Descrição do nível 1",
  minValue: 0,
};

let idUsuario;

function displayCriaInformacoesBasicas() {
  console.log("entrei");

  conteudo.innerHTML = `
    <div class="criacaoQuizz">
    <h2 class="comeceDoComeco"> Comece pelo começo</h2>

    <div class="secaoForms">
      <input
        class="tituloQuizz"
        type="text"
        placeholder="Título do seu quizz"
      />
      <div class="caixaErro"> 
      <p class="erro hidden">Errouuuuu</p>
      </div>
      <input
        class="urlImagemQuizz"
        type="text"
        placeholder="URL da imagem do seu quizz"
      />
      <div class="caixaErro"> 
      <p class="erro hidden"></p>
      </div>

      <input
        class="qtdPerguntasQuizz"
        type="text"
        placeholder="Quantidade de perguntas do quizz"
      />
      <div class="caixaErro">
      <p class="erro hidden"></p>
      </div>

      <input
        class="qtdNiveisQuizz"
        type="text"
        placeholder="Quantidade de níveis do quizz"
      />
      <div class="caixaErro"> 
      <p class="erro hidden"></p>
      </div>
    </div>
    <button onclick="confereInformacoesBasicasEAdicionaNoObjetoQuizz()" >Prossegir pra criar perguntas</button>
  </div>
    `;
}

function ValidURL(str) {
  var regex =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if (!regex.test(str)) {
    return false;
  } else {
    return true;
  }
}

function confereInformacoesBasicasEAdicionaNoObjetoQuizz() {
  let tituloQuizz = document.querySelector(".tituloQuizz").value;
  let urlImagemQuizz = document.querySelector(".urlImagemQuizz").value;
  qtdPerguntasQuizz = document.querySelector(".qtdPerguntasQuizz").value;
  qtdNiveisQuizz = document.querySelector(".qtdNiveisQuizz").value;

  let TitleIsCorrect = tituloQuizz.length > 19 && tituloQuizz.length < 66;
  let urlIsCorrect = ValidURL(urlImagemQuizz);
  let qtdPerguntasIsCorrect = qtdPerguntasQuizz >= 3;
  let qtdNiveisIsCorrect = qtdNiveisQuizz >= 2;

  if (
    TitleIsCorrect &&
    urlIsCorrect &&
    qtdPerguntasIsCorrect &&
    qtdNiveisIsCorrect
  ) {
    // Colocar no objeto

    quizz.title = tituloQuizz;
    quizz.image = urlImagemQuizz;

    // Chama a página 2
    displayCriaPerguntas();
  } else {
    alert("Por favor, preencha os dados corretamente.");

    //Se acertar o campo
    if (TitleIsCorrect) removeError(0);
    if (urlIsCorrect) removeError(1);
    if (qtdPerguntasIsCorrect) removeError(2);
    if (qtdNiveisIsCorrect) removeError(3);

    //Se errar o campo
    if (!TitleIsCorrect) displayErro(0);
    if (!urlIsCorrect) displayErro(1);
    if (!qtdPerguntasIsCorrect) displayErro(2);
    if (!qtdNiveisIsCorrect) displayErro(3);
  }
}

function displayErro(index, frase = "Preencha corretamente este campo") {
  let erro = document.querySelectorAll(".erro");

  erro[index].innerHTML = frase;
  erro[index].classList.remove("hidden");
}

function removeError(index) {
  let erro = document.querySelectorAll(".erro");

  erro[index].classList.add("hidden");
}

function displayCriaPerguntas() {
  conteudo.innerHTML = `<div class="criacaoQuizz">
    <h2><span>Crie suas perguntas</span></h2>
    <div class="secaoToda">
    </div>


    <button onclick="conferePerguntas()">
          Prossegir pra criar níveis
        </button>
      </div>
</div>`;

  let secaoToda = document.querySelector(".secaoToda");

  for (let i = 1; i <= qtdPerguntasQuizz; i++) {
    let unidadePergunta = document.createElement("div");
    unidadePergunta.classList.add("unidadePergunta");

    if (i != 1) unidadePergunta.classList.add("barra");

    unidadePergunta.innerHTML = `
    
    <div class="pergunta">
              <h3 class="tituloPergunta">Pergunta ${i} <ion-icon name="create-outline"></ion-icon></h3>
            </div>
            <div class="secaoPergunta">
              <input
                class="textoPergunta"
                type="text"
                placeholder="Texto da pergunta"
              />
              <input
                class="corPergunta"
                type="text"
                placeholder="Cor de fundo da pergunta"
              />

              <h3><span>Resposta correta</span></h3>
              <input
                class="respostaCorreta"
                type="text"
                placeholder="Resposta correta"
              />
              <input
                class="urlCorreta"
                type="url"
                placeholder="URL da imagem"
              />
              <!-- Incorreta 1 -->
              <h3><span>Respostas incorreta</span></h3>
              <input
                class="respostaIncorreta"
                type="text"
                placeholder="Resposta incorreta 1"
              />
              <input
                class="urlIncorreta"
                type="url"
                placeholder="URL da imagem 1"
              />
              <br /><br />
    

              <!-- Incorreta 2 -->
              <input
                class="respostaIncorreta"
                type="text"
                placeholder="Resposta incorreta 2"
              />
              <input
                class="urlIncorreta"
                type="url"
                placeholder="URL da imagem 2"
              />
              <br /><br />

              <!-- Incorreta 3 -->
              <input
                class="respostaIncorreta"
                type="text"
                placeholder="Resposta incorreta 3"
              />
              <input
                class="urlIncorreta"
                type="url"
                placeholder="URL da imagem 3"
              />
              <br /><br />
            </div>
          </div>
              `;

    secaoToda.appendChild(unidadePergunta);
  }
  addAbrirPergunta();
}

function addAbrirPergunta() {
  let undPerguntas = document.querySelectorAll(".unidadePergunta");

  for (let pergunta of undPerguntas) {
    let tituloDaPergunta = pergunta.querySelector(".tituloPergunta");

    tituloDaPergunta.addEventListener("click", togglePergunta);
  }
}

function togglePergunta() {
  this.parentNode.parentNode.classList.toggle("barra");
  console.log("to executando o toggle");
}

function conferePerguntas() {
  let textoPergunta = document.querySelectorAll(".textoPergunta");
  let corPergunta = document.querySelectorAll(".corPergunta");
  let respostaCorreta = document.querySelectorAll(".respostaCorreta");
  let respostaIncorreta = document.querySelectorAll(".respostaIncorreta");
  let urlCorreta = document.querySelectorAll(".urlCorreta");
  let urlIncorreta = document.querySelectorAll(".urlIncorreta");

  //Confere text da pergunta
  let textoIsCorrect = true;

  for (let texto of textoPergunta) {
    if (texto.value.length < 20) textoIsCorrect = false;
  }

  //Confere cor da pergunta
  let corIsCorrect = true;

  for (let cor of corPergunta) {
    if (!isHexColor(cor.value)) corIsCorrect = false;
  }

  //Confere resposta correta
  let respostaCorretaIsCorrect = true;

  for (let resposta of respostaCorreta) {
    if (resposta.value == "") respostaCorretaIsCorrect = false;
  }

  //Confere resposta correta
  let respostaIncorretaIsCorrect = true;

  for (let i = 0; i < respostaIncorreta.length; i++) {
    if (i % 3 == 0 && respostaIncorreta[i].value == "") {
      console.log("i =" + i);
      console.log("Resposta" + respostaIncorreta[i].value);
      respostaIncorretaIsCorrect = false;
    }
  }

  //   for (let i = 0; i < respostaIncorreta.length / 3; i++) {
  //     let temRespostaIncorreta = false;
  //     for (let j = 0; j < 3; j++) {
  //       if (respostaIncorreta[i * 3 + j].value !== "") {
  //         temRespostaIncorreta = true;
  //       }
  //     }
  //     if (!temRespostaIncorreta) respostaIncorretaIsCorrect = false;
  //   }
  //Confere apenas a primeira resposta incorreta

  // Confere a url
  let urlCorretaIsCorrect = true;
  let urlIncorretaIsCorrect = true;

  for (let i = 0; i < urlCorreta.length; i++) {
    if (ValidURL(urlCorreta[i].value) == false) urlCorretaIsCorrect = false;
  }

  for (let i = 0; i < urlIncorreta.length; i++) {
    if (
      respostaIncorreta[i].value !== "" &&
      ValidURL(urlIncorreta[i].value) == false
    )
      urlIncorretaIsCorrect = false;
  }

  if (
    textoIsCorrect &&
    corIsCorrect &&
    respostaCorretaIsCorrect &&
    respostaIncorretaIsCorrect &&
    urlCorretaIsCorrect &&
    urlIncorretaIsCorrect
  ) {
    // Adiciona ao objeto pergunta

    for (let i = 0; i < qtdPerguntasQuizz; i++) {
      pergunta = {
        title: "Título da pergunta 1",
        color: "#123456",
        answers: [
          {
            text: "Texto da resposta 1",
            image: "https://http.cat/411.jpg",
            isCorrectAnswer: true,
          },
        ],
      };

      umaResposta = {
        text: "Texto da resposta 2",
        image: "https://http.cat/411.jpg",
        isCorrectAnswer: false,
      };

      pergunta.title = textoPergunta[i].value;
      pergunta.color = corPergunta[i].value;

      pergunta.answers[0].text = respostaCorreta[i].value;
      pergunta.answers[0].image = urlCorreta[i].value;
      pergunta.answers[0].isCorrectAnswer = true;

      for (let j = 0; j < 3; j++) {
        // Adiciona nos atributos da umaResposta
        let index = 3 * i + j;

        if (respostaIncorreta[index].value !== "") {
          console.log("index = " + index);
          console.log("respostaInc = " + respostaIncorreta[index].value);

          umaResposta.text = respostaIncorreta[index].value;
          umaResposta.image = urlIncorreta[index].value;
          umaResposta.isCorrectAnswer = false;

          console.log("objeto resposta  --" + umaResposta.text);

          pergunta.answers.push({
            ...umaResposta,
          });
        }
      }

      quizz.questions.push({
        ...pergunta,
      });
    }

    // Passa para a pagina niveis

    console.log(quizz);
    displayCriaNiveis();
  } else {
    //TESTE
    console.log("Teste");
    console.log(textoIsCorrect);
    console.log(corIsCorrect);
    console.log(respostaCorretaIsCorrect);
    console.log(respostaIncorretaIsCorrect);
    console.log(urlCorretaIsCorrect);
    console.log(urlIncorretaIsCorrect);

    // //Se acertar o campo
    // if (textoIsCorrect) removeError(0);
    // if (corIsCorrect) removeError(1);
    // if (respostaCorretaIsCorrect) removeError(2);
    // if (respostaIncorretaIsCorrect) removeError(3);
    // if (urlCorretaIsCorrect) removeError(3);
    // if (urlIncorretaIsCorrect) removeError(3);

    // //Se errar o campo
    // if (!textoIsCorrect) displayErro(0);
    // if (!corIsCorrect) displayErro(1);
    // if (!respostaCorretaIsCorrect) displayErro(2);
    // if (!urlCorretaIsCorrect) displayErro(3);
    // if (!respostaIncorretaIsCorrect) displayErro(3);
    // if (!urlIncorretaIsCorrect) displayErro(3);
    alert("Por favor, preencha os dados corretamente.");
  }
}

function displayCriaNiveis() {
  conteudo.innerHTML = `<div class="criacaoQuizz">
    <h2 class="comeceDoComeco"><span>Agora, decida os níveis!</span></h2>
    <div class="secaoToda">
    </div>


    <button onclick="confereNiveis()">
          Finalizar Quizz
        </button>
      </div>
</div>`;

  let secaoToda = document.querySelector(".secaoToda");

  for (let i = 1; i <= qtdNiveisQuizz; i++) {
    let unidadePergunta = document.createElement("div");
    unidadePergunta.classList.add("unidadePergunta");

    if (i != 1) unidadePergunta.classList.add("barra");

    unidadePergunta.innerHTML = `
    
    <div class="pergunta">
              <h3 class="tituloPergunta">Nível ${i} <ion-icon name="create-outline"></ion-icon></h3>
            </div>
            <div class="secaoPergunta">
              <input
                class="tituloNivel"
                type="text"
                placeholder="Título do nível"
              />
              <input
                class="acertoMin"
                type="text"
                placeholder="% de acerto mínima"
              />
              <input
                class="urlImagemNivel"
                type="url"
                placeholder="URL da imagem do nível"
              />
              <input
                class="descricaoNivel"
                type="text"
                placeholder="Descrição do nível"
              />
            </div>
          </div>
              `;

    secaoToda.appendChild(unidadePergunta);
  }
  addAbrirPergunta();
}

function confereNiveis() {
  let tituloNivel = document.querySelectorAll(".tituloNivel");
  let acertoMin = document.querySelectorAll(".acertoMin");
  let descricaoNivel = document.querySelectorAll(".descricaoNivel");
  let urlImagemNivel = document.querySelectorAll(".urlImagemNivel");

  //Confere titulo
  let tituloNivelIsCorrect = true;

  for (let titulo of tituloNivel) {
    if (titulo.value.length < 10) tituloNivelIsCorrect = false;
  }

  //Confere acerto minimo
  let acertoMinIsCorrect = true;

  for (let acerto of acertoMin) {
    if (isNaN(acerto.value) || acerto.value < 0 || acerto.value > 100) {
      acertoMinIsCorrect = false;
    }
  }

  //Confere cse tem um acerto minimo que é zero
  let acertoMinZeroIsCorrect = false;

  for (let acerto of acertoMin) {
    if (acerto.value == 0) acertoMinZeroIsCorrect = true;
  }

  //Confere descricao
  let descricaoNivelIsCorrect = true;

  for (let descricao of descricaoNivel) {
    if (descricao.value.length < 30) descricaoNivelIsCorrect = false;
  }

  // confere url
  let urlLevelIsCorrect = true;

  for (let url of urlImagemNivel) {
    if (!ValidURL(url.value)) urlLevelIsCorrect = false;
    console.log(ValidURL(url.value));
  }

  if (
    tituloNivelIsCorrect &&
    acertoMinIsCorrect &&
    acertoMinZeroIsCorrect &&
    descricaoNivelIsCorrect &&
    urlLevelIsCorrect
  ) {
    console.log("tudo Certinho");

    for (let i = 0; i < qtdNiveisQuizz; i++) {
      levelCriar = {
        title: "Título do nível 1",
        image: "https://http.cat/411.jpg",
        text: "Descrição do nível 1",
        minValue: 0,
      };

      levelCriar.title = tituloNivel[i].value;
      levelCriar.image = urlImagemNivel[i].value;
      levelCriar.text = descricaoNivel[i].value;
      levelCriar.minValue = acertoMin[i].value;

      quizz.levels.push({
        ...levelCriar,
      });
    }

    enviaQuizzAPI();

    console.log(quizz);
  } else {
    alert("Por favor, preencha os dados corretamente.");
  }

  console.log(tituloNivelIsCorrect);
  console.log(acertoMinIsCorrect);
  console.log(acertoMinZeroIsCorrect);
  console.log(descricaoNivelIsCorrect);
}

function enviaQuizzAPI() {
  let promisse = axios.post(
    "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes",
    quizz
  );

  promisse.then(guardarQuizUsuario);
}

function guardarQuizUsuario(resposta) {
  if (verificarQuizDoUsuario().length === 0) {
    idUsuario = JSON.stringify([resposta]);
    localStorage.setItem("quizUsuario", idUsuario);
  } else {
    idUsuario = verificarQuizDoUsuario();
    idUsuario.push(resposta);
    localStorage.setItem("quizUsuario", JSON.stringify(idUsuario));
  }
  displaySucessoDoQuizz(resposta.data);
}

function verificarQuizDoUsuario() {
  if (!localStorage.getItem("quizUsuario")) {
    return [];
  }
  return JSON.parse(localStorage.getItem("quizUsuario"));
}

function displaySucessoDoQuizz(data) {
  conteudo.innerHTML = `<div class="criacaoQuizz">
    <h2><span>Seu quizz está pronto!</span></h2>
    <div class="secaoToda">

    <div class="caixa-quiz" onclick="localizarQuiz(${data.id})">
      <div class="caixa-imagem">
        <img class="imagem-quiz" src="${data.image}" alt="">
        <div class="gradiente"></div>
      </div>
      <div class="titulo">${data.title}</div>
    </div>
    
    </div>
    <button onclick="localizarQuiz(${data.id})">
         Acessa quizz
        </button>
        <div class="caixaVoltarPraHome" onclick="voltarHome()"><span class="voltarPraHome">Voltar pra home</span> </div>
        </div>
      </div>
</div>`;
}

function voltarHome() {
  conteudo.innerHTML = ``;
  window.location.reload();
}

function isHexColor(hex) {
  let hexNum = hex.slice(1);
  return (
    typeof hex === "string" &&
    hex.length === 7 &&
    hex[0] == "#" &&
    !isNaN(Number("0x" + hexNum))
  );
}

// Testeeeeee

// qtdPerguntasQuizz = 3;
// qtdNiveisQuizz = 2;

// displayCriaNiveis();

// Código real

// displayCriaInformacoesBasicas();
