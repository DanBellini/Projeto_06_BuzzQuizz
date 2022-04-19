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
    if (inputSeuTexto.length < 20 || inputSeuTexto.length > 65){
        document.querySelector(".erroTitulo").innerHTML = "Seu titulo deve ter entre 20 e 65 caracteres";
    }
    //if (inputSuaImagem !== URL){
    //   document.querySelector(".erroImagem").innerHTML = "O valor informado não é uma URL válida";
    //}
    if (inputSuasQuestoes < 3 ){
        document.querySelector(".erroQuestoes").innerHTML = "O quizz deve ter no mínimo 3 perguntas";
    }
    if (inputSeusNiveis < 2){
        document.querySelector(".erroNiveis").innerHTML = "O quizz deve ter no mínimo 2 niveis";
    }
    else{
        quizz.title = inputSeuTexto;
        quizz.image = inputSuaImagem;
        quizz.questions.length = inputSuasQuestoes;
        quizz.levels.length = inputSeusNiveis;
    }
}




