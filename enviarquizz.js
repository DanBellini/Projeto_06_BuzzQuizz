const quizz ={
    title: "",
    image: "",
    questions: [],
    levels: []
}

let qtdquestoes = 0;
let qtdniveis = 0;
let variavelinutil = 0;
let quizzsalvos

function buscandoquizzsalvos() {
    quizzsalvos = localStorage.getItem("id");
    if (quizzsalvos === null) {
        quizzsalvos = []
    } else {
        quizzsalvos = JSON.parse(localStorage.getItem("id"))     
    }
}

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
    if((cor.length<7) || (cor.length>7)){
        return false;
    }
}

let validacaoPergunta = [];

function verificarEtapa2(){

    quizz.questions = [];
    validacaoPergunta = [];
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

            const respostas = []

            respostaCorreta ={
                text: inputRespostaCorreta,
                image: inputRespostaImagemCorreta,
                isCorrectAnswer: true
            }
            respostas.push(respostaCorreta)

            for (j=0; j<inputRespostaIncorreta.length; j++){
                if (inputRespostaIncorreta[j].value.length !== 0){
                    respostaIncorreta = {
                        text: inputRespostaIncorreta[j].value,
                        image: inputRespostaImagemIncorreta[j].value,
                        isCorrectAnswer: false
                    }
                    respostas.push(respostaIncorreta)
                }
            }

            quizz.questions.push({
                title: inputSuaPergunta,
                color: inputSuaCor,
                answers: respostas
            })
            validacaoPergunta.push(true)
        }
    i++
    }
}

function avancarEtapa2 (){
    verificarEtapa2();
    if(validacaoPergunta.length === qtdquestoes){
        renderizarEtapa3();
    }
}

function renderizarEtapa3(){
    const corpo = document.querySelector(".paginaCrieQuizz");
    corpo.querySelector(".instrucao").innerHTML = `<span>Crie seus Níveis</span>`;

    const conteiner = document.querySelector(".conteiner");
    conteiner.innerHTML = "";

    for (let i=1; i <= qtdniveis; i++){
 
        conteiner.innerHTML += `
        <div class="criar-nivel">
            <p>Nível ${i} </p>

            <input class="tituloNivel${i}" type="text" placeholder="Texto do Nível">
            <div class="erroTituloNivel${i}"></div>

            <input class="porcentagemAcerto${i}" type="number" placeholder="% de acerto mínima">
            <div class="erroPorcentagemAcerto${i}"></div>

            <input class="imagemNivel${i}" type="text" placeholder="URL da imagem do nível">
            <div class="erroImagemNivel${i}"></div>

            <input class="descricaoNivel${i} descricao" placeholder="Descrição do nível">
            <div class="erroDescricao${i}"></div>
        `
    }

    conteiner.innerHTML += `
    <button class="primeiraEtapa" onclick="avancarEtapa3()">
        <span>Finalizar Quizz</span>
    </button>
    `
}

let validacaoNivel = [];

function verificarEtapa3 (){
    quizz.levels = [];
    validacaoNivel = [];
    let i = 1
    while(i<=qtdniveis){
        const inputTituloNivel = document.querySelector(`.tituloNivel${i}`).value;
        const inputPorcentagem = Number(document.querySelector(`.porcentagemAcerto${i}`).value);
        const inputImagemNivel = document.querySelector(`.imagemNivel${i}`).value;
        const inputDescricaoNivel = document.querySelector(`.descricaoNivel${i}`).value;

        const erroTituloNivel = document.querySelector(`.erroTituloNivel${i}`);
        const erroPorcentagem = document.querySelector(`.erroPorcentagemAcerto${i}`);
        const erroImagemNivel = document.querySelector(`.erroImagemNivel${i}`);
        const erroDescricaoNivel = document.querySelector(`.erroDescricao${i}`);

        erroTituloNivel.innerHTML = "";
        erroPorcentagem.innerHTML = "";
        erroImagemNivel.innerHTML = "";
        erroDescricaoNivel.innerHTML = "";

        if(inputTituloNivel.length < 10){
            erroTituloNivel.innerHTML = "O título do nível deve ter 10 caracteres no mínimo"
        }
        if(inputPorcentagem > 100 || inputPorcentagem < 0){
            erroPorcentagem.innerHTML = "Escolha um valor de 0 a 100"
        }
        if(!validarURL(inputImagemNivel)){
            erroImagemNivel.innerHTML = "Por favor, digite uma URL válida"
        }
        if(inputDescricaoNivel.length < 30){
            erroDescricaoNivel.innerHTML = "A descrição deve ter 30 caracteres no mínimo"
        }
        else{
            validacaoNivel.push(inputPorcentagem);

            const niveis = {
                title: inputTituloNivel,
                image: inputImagemNivel,
                text: inputDescricaoNivel,
                minValue: inputPorcentagem
            }

            quizz.levels.push(niveis);
        }
        i++
    }
}

function avancarEtapa3 (){
    verificarEtapa3();

    let validarporcentagen = 0
    let i=0
    while(i < validacaoNivel.length){
        if (validacaoNivel[i] === 0){
            validarporcentagen += 1
            carregarPagina()
            const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes", quizz)
            requisicao.then(finalizarQuizz)
            requisicao.catch(tratarErro)
            i++
        } else{
            i++
        }
    }
    if (validarporcentagen !== 1){
    alert("Um, e apenas um, dos campos de % de acerto mínimo deve ter valor o 0")
    }
}

function tratarErro (erro){
    alert(`Não foi possivel finalizar o seu Quizz :( \n Erro:${erro.response.status}`)
}

function finalizarQuizz (resposta){
    
    carregarPagina()
    solicitarQuizzes()

    tituloDoQuizz = resposta.data.title;
    imagemDoQuizz = resposta.data.image;
    iddoQuizz = resposta.data.id;

    quizzsalvos.push(iddoQuizz);

    let quizzSerializado = JSON.stringify(quizzsalvos)

    localStorage.setItem("id", quizzSerializado);
    
    const corpo = document.querySelector(".paginaCrieQuizz");
    corpo.querySelector(".instrucao").innerHTML = `
    <div class="sucesso-criacao">
        <h2>Seu Quizz está pronto!</h2>
        <div class="quizz-sucesso">
            <img src=${imagemDoQuizz} alt="">
            <div class="gradiente"></div>
            <h3>${tituloDoQuizz}</h3>
        </div>
        <div class="botoes-container">
            <div id="${iddoQuizz}" class="bnt-reiniciar-quizz" onclick="abrirQuizz(this)">Acessar Quizz</div>
            <div class="btn-voltar-home" onclick="voltarHome()">Voltar para home</div>
        </div>
    </div>`;

    const conteiner = document.querySelector(".conteiner");
    conteiner.innerHTML = "";
}
