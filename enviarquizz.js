const quizz ={
    title: "",
    image: "",
    questions: [],
    levels: []
}

let qtdquestoes = 0;
let qtdniveis = 0;

function validarURL(urlImagem){
    let verificarhttps = "";
    for (i=0; i<6; i++){
        verificarhttps += urlImagem[i];
    }
    if ( verificarhttps === "https:"){
        return true
    }
    return false
}

function avancarEtapa1 (){
    const inputSeuTexto = String(document.querySelector(".seuTitulo").value);
    const inputSuaImagem = document.querySelector(".suaImagem").value;
    const inputSuasQuestoes = Math.floor(document.querySelector(".suasQuestoes").value);
    const inputSeusNiveis = Math.floor(document.querySelector(".seusNiveis").value);

    const erroTitulo = document.querySelector(".erroTitulo");
    const erroImagem = document.querySelector(".erroImagem");
    const erroQuestoes = document.querySelector(".erroQuestoes");
    const erroNiveis = document.querySelector(".erroNiveis");

    erroTitulo.innerHTML = "";
    erroImagem.innerHTML = "";
    erroQuestoes.innerHTML = "";
    erroNiveis.innerHTML = "";



    if (inputSeuTexto.length < 20 || inputSeuTexto.length > 65){
        erroTitulo.innerHTML = "Seu titulo deve ter entre 20 e 65 caracteres";
    }
    if (!validarURL(inputSuaImagem)){
        erroImagem.innerHTML = "Insira uma URL Válida";
    }
    if (inputSuasQuestoes < 3 ){
        erroQuestoes.innerHTML = "O quizz deve ter no mínimo 3 perguntas";
    }
    if (inputSeusNiveis < 2){
        erroNiveis.innerHTML = "O quizz deve ter no mínimo 2 niveis";
    }
    else{
        quizz.title = inputSeuTexto;
        quizz.image = inputSuaImagem;
        qtdquestoes = inputSuasQuestoes;
        qtdniveis = inputSeusNiveis;

        renderizarEtapa2 ()
    }
}

function renderizarEtapa2 (){
    const corpo = document.querySelector(".paginaCrieQuizz");
    corpo.querySelector(".instrucao").innerHTML = `<span>Crie suas perguntas</span>`;

    const conteiner = document.querySelector(".conteiner");
    conteiner.innerHTML = "";


    for (let i=1; i <= qtdquestoes; i++){

 
        conteiner.innerHTML += `
        <div class="criar-pergunta">
                <p>Pergunta ${i} </p>

                <input class="suaPergunta${i}" type="text" placeholder="Texto da pergunta">
                <div class="erroPergunta${i}"></div>

                <input class="suaCor${i}" type="text" placeholder="Cor de fundo da pergunta">
                <div class="erroCor${i}"></div>

                <p>Resposta correta</p>

                <input class="respostaCorreta${i}" type="text" placeholder="Resposta Correta">
                <div class="erroResposta${i}"></div>
    
                <input class="respostaImagemCorreta${i}" type="text" placeholder="URL da Imagem">
                <div class="erroImagemCorreta${i}"></div>

                <p> Respostas Incorretas </p>

                <input class="respostaIncorreta${i}" type="text" placeholder="Resposta incorreta 1">
                <div class="erroRespostaIncorreta${i}"></div>
    
                <input class="respostaImagemIncorreta${i}" type="text" placeholder="URL da imagem 1">
                <div class="erroImagemIncorreta${i}"></div>

                <div class="espaco"></div>

                <input class="respostaIncorreta${i}" type="text" placeholder="Resposta incorreta 2">
                <div class="erroRespostaIncorreta${i}"></div>
    
                <input class="respostaImagemIncorreta${i}" type="text" placeholder="URL da imagem 2">
                <div class="erroImagemIncorreta${i}"></div>

                <div class="espaco"></div>
    
                <input class="respostaIncorreta${i}" type="text" placeholder="Resposta incorreta 3">
                <div class="erroRespostaIncorreta${i}"></div>
    
                <input class="respostaImagemIncorreta${i}" type="text" placeholder="URL da imagem 3">
                <div class="erroImagemIncorreta${i}"></div>
            </div>

        `
    }

    conteiner.innerHTML += `
    <button class="primeiraEtapa" onclick="avancarEtapa2()">
        <span>Prosseguir pra criar níveis</span>
    </button>
    `
}

function validarCor(cor){
    let verificarCor = "";
    for (i=0; i<1; i++ ){
        verificarCor += cor[i];
    }
    if ((verificarCor === "#") && (cor.length === 7)){
        return true;
    }
    else{
        return false;
    }
}

let validacao = [];

function verificarEtapa2(){

    validacao = [];
    let i = 1
    while(i<=qtdquestoes){

        const inputSuaPergunta = document.querySelector(`.suaPergunta${i}`).value;
        const inputSuaCor = document.querySelector(`.suaCor${i}`).value;
        const inputRespostaCorreta = document.querySelector(`.respostaCorreta${i}`).value;
        const inputRespostaImagemCorreta = document.querySelector(`.respostaImagemCorreta${i}`).value;

        const inputRespostaIncorreta = document.querySelectorAll(`.respostaIncorreta${i}`);
        const inputRespostaImagemIncorreta = document.querySelectorAll(`.respostaImagemIncorreta${i}`);

        const erroPergunta = document.querySelector(`.erroPergunta${i}`);
        const erroCor = document.querySelector(`.erroCor${i}`);
        const erroResposta = document.querySelector(`.erroResposta${i}`);
        const erroImagemCorreta = document.querySelector(`.erroImagemCorreta${i}`);
        const erroRespostaIncorreta = document.querySelector(`.erroRespostaIncorreta${i}`);
        const erroImagemIncorreta = document.querySelector(`.erroImagemIncorreta${i}`);

        erroPergunta.innerHTML = "";
        erroCor.innerHTML = "";
        erroResposta.innerHTML = "";
        erroImagemCorreta.innerHTML = "";
        erroRespostaIncorreta.innerHTML = "";
        erroImagemIncorreta.innerHTML = "";


        if(inputSuaPergunta.length < 20){
            erroPergunta.innerHTML = "Sua pergunta deve ter no mínimo 20 caracteres";
        }

        if(!validarCor(inputSuaCor)){
            erroCor.innerHTML = "Escolha uma cor em formato Hexadecimal. Exemplo: #EC362D (vermelho)";
        }

        if(inputRespostaCorreta < 1){
            erroResposta.innerHTML = "Esse campo não pode estar vazio";
        }

        if(!validarURL(inputRespostaImagemCorreta)){
            erroImagemCorreta.innerHTML = "Insira uma url válida";
        }

        if(inputRespostaIncorreta[0].value < 1){
            erroRespostaIncorreta.innerHTML = "Esse campo não pode estar vazio";
        }

        if(!validarURL(inputRespostaImagemIncorreta[0].value)){
            erroImagemIncorreta.innerHTML = "Insira uma url válida";
        }

        else{
            const respostas = [{
                text: inputRespostaCorreta,
                image: inputRespostaImagemCorreta,
                isCorrectAnswer: true
            },
            {
                text: inputRespostaIncorreta[0].value,
                image: inputRespostaImagemIncorreta[0].value,
                isCorrectAnswer: false
            },
            {
                text: inputRespostaIncorreta[1].value,
                image: inputRespostaImagemIncorreta[1].value,
                isCorrectAnswer: false
            },
            {
                text: inputRespostaIncorreta[2].value,
                image: inputRespostaImagemIncorreta[2].value,
                isCorrectAnswer: false
            }]

            quizz.questions.push({
                title: inputSuaPergunta,
                color: inputSuaCor,
                answers: respostas
            })
            validacao.push(true)
        }
    i++
    }
}

function avancarEtapa2 (){
    verificarEtapa2();
    console.log(validacao.length);
    console.log(qtdquestoes);
    if(validacao.length === qtdquestoes){
        renderizarEtapa3();
    }
}

function renderizarEtapa3(){
    const corpo = document.querySelector(".paginaCrieQuizz");
    corpo.querySelector(".instrucao").innerHTML = `<span>Crie seus Níveis</span>`;

    const conteiner = document.querySelector(".conteiner");
    conteiner.innerHTML = "";
}


