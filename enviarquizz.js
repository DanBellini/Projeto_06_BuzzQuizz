const quizz ={
    title: "",
    image: "",
    questions: [],
    levels: []
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
    if (inputSuasQuestoes < 3 ){
        erroQuestoes.innerHTML = "O quizz deve ter no mínimo 3 perguntas";
    }
    if (inputSeusNiveis < 2){
        erroNiveis.innerHTML = "O quizz deve ter no mínimo 2 niveis";
    }
    else{
        quizz.title = inputSeuTexto;
        quizz.image = inputSuaImagem;
        quizz.questions.length = inputSuasQuestoes;
        quizz.levels.length = inputSeusNiveis;

        renderizarEtapa2 ()
    }
}

function renderizarEtapa2 (){
    const corpo = document.querySelector(".paginaCrieQuizz");
    corpo.querySelector(".instrucao").innerHTML = `<span>Crie suas perguntas</span>`;

    const conteiner = document.querySelector(".conteiner");
    conteiner.innerHTML = "";


    for (let i=0; i < quizz.questions.length; i++){
        const num = i+1
 
        conteiner.innerHTML += `
        <div class="criar-pergunta">
                <p>Pergunta ${num} </p>

                <input class="suaPergunta${num}" type="text" placeholder="Texto da pergunta">
                <div class="erroPergunta${num}"></div>

                <input class="suaCor${num}" type="text" placeholder="Cor de fundo da pergunta">
                <div class="erroCor${num}"></div>

                <p>Resposta correta</p>

                <input class="respostaCorreta${num}" type="text" placeholder="Resposta Correta">
                <div class="erroResposta${num}"></div>
    
                <input class="respostaImagemCorreta${num}" type="text" placeholder="URL da Imagem">
                <div class="erroImagemCorreta${num}"></div>

                <p> Respostas Incorretas </p>

                <input class="respostaIncorreta${num}" type="text" placeholder="Resposta incorreta 1">
                <div class="erroRespostaIncorreta${num}"></div>
    
                <input class="respostaImagemIncorreta${num}" type="text" placeholder="URL da imagem 1">
                <div class="erroImagemIncorreta${num}"></div>

                <div class="espaco"></div>

                <input class="respostaIncorreta${num}" type="text" placeholder="Resposta incorreta 2">
                <div class="erroRespostaIncorreta${num}"></div>
    
                <input class="erroImagemIncorreta${num}" type="text" placeholder="URL da imagem 2">
                <div class="erroImagemIncorreta${num}"></div>

                <div class="espaco"></div>
    
                <input class="respostaIncorreta${num}" type="text" placeholder="Resposta incorreta 3">
                <div class="erroRespostaIncorreta${num}"></div>
    
                <input class="erroImagemIncorreta${num}" type="text" placeholder="URL da imagem 3">
                <div class="erroImagemIncorreta${num}"></div>
            </div>

        `
    }

    conteiner.innerHTML += `
    <button class="primeiraEtapa" onclick="avancarEtapa2()">
        <span>Prosseguir pra criar níveis</span>
    </button>
    `
}
