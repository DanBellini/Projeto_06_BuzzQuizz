const API = "https://mock-api.driven.com.br/api/v6/buzzquizz";
let quizzes = [];
let statusDasRespostas = [];
let containerSelecionado = 0;
let quizzSelecionado = {}
let acertos = 0
let perguntasRespondidas = 0
let quantidaPerguntas = 0


function solicitarQuizzes() {
	carregarPagina();
    const promisse = axios.get(`${API}/quizzes`);
    promisse.then(function (resposta){
        quizzes = resposta.data;
		buscandoquizzsalvos();
        renderizarListagemQuizz();
		carregarPagina();
    })
}
solicitarQuizzes();

function renderizarListagemQuizz() {

    const todosQuizzes = document.querySelector(".todos.quizzes");
    todosQuizzes.innerHTML = "";

	const meusQuizzes = document.querySelector(".meus.quizzes");
	meusQuizzes.innerHTML = "";

    for (let i = 0; i < quizzes.length; i++) {

		let identificador = quizzes[i].id;
        let titulo = quizzes[i].title;
        let imagem = quizzes[i].image;

		if (quizzsalvos.length !== 0) {

			for (let j = 0; j < quizzsalvos.length; j++) {

				if (quizzsalvos[j] === identificador) {

					if (document.querySelector(".pagina-inicial section:nth-child(2)").style.display === "none") {
						document.querySelector(".pagina-inicial section:nth-child(2)").style.display = "block"
						document.querySelector(".lista-vazia").style.display = "none"   
					}

					meusQuizzes.innerHTML += `
					<div id="${identificador}" class="quizz" onclick="abrirQuizz(this)">
						<img src=${imagem} alt="">
						<div class="gradiente"></div>
						<h3>${titulo}</h3>
					</div>`;
	
				} else {
	
					todosQuizzes.innerHTML += `
					<div id="${identificador}" class="quizz" onclick="abrirQuizz(this)">
						<img src=${imagem} alt="">
						<div class="gradiente"></div>
						<h3>${titulo}</h3>
					</div>`;
				}
			}

		} else {
	
			todosQuizzes.innerHTML += `
			<div id="${identificador}" class="quizz" onclick="abrirQuizz(this)">
				<img src=${imagem} alt="">
				<div class="gradiente"></div>
				<h3>${titulo}</h3>
			</div>`;

		}
    }
}

function abrirQuizz(quizz) {
	
	carregarPagina();

    const paginaInicial = document.querySelector(".pagina-inicial");
    paginaInicial.style.display = "none";

	const paginaCriarQuizz = document.querySelector(".paginaCrieQuizz");
    paginaCriarQuizz.style.display = "none";

	quizzSelecionado = quizzes.find(arr => arr.id === Number(quizz.id));

	renderizarQuizz();

	const paginaQuizz = document.querySelector(".pagina-do-quizz");
	paginaQuizz.style.display = "unset";

	carregarPagina();
}

function renderizarQuizz() {
	const quizz = quizzSelecionado;

	const imagemDoQuizz = document.querySelector(".imagem-do-quizz");
	imagemDoQuizz.src = quizz.image;
	imagemDoQuizz.scrollIntoView();
	
	const tituloQuizz = document.querySelector(".titulo-do-quizz");
	tituloQuizz.innerHTML = quizz.title;

	quantidaPerguntas = quizz.questions.length;

	const perguntas = document.querySelector(".perguntas");
	perguntas.innerHTML = "";

	for (let i = 0; i < quantidaPerguntas; i++) {
		
		let respostasQuizz = quizz.questions[i].answers;
		let quanidadeRespostas = respostasQuizz.length;

		respostasQuizz = respostasQuizz.sort(function () { 
			return Math.random() - 0.5;
		});

		let respostas = "";
		let statusDaResposta = [];

		for (let j = 0; j < quanidadeRespostas; j++) {

			let texto = respostasQuizz[j].text;
			let imagem = respostasQuizz[j].image;
			statusDaResposta[j] = respostasQuizz[j].isCorrectAnswer;

			respostas += `
			<div class="resposta" onclick="selecionarResposta(this)">
				<img src=${imagem} alt="">
				<h3>${texto}</h3>
			</div>`;
		}

		let tituloPergunta = quizz.questions[i].title;
		let corPergunta = quizz.questions[i].color;

		perguntas.innerHTML += `
		<div class="container-pergunta">
			<div class="pergunta" style="background: ${corPergunta};">${tituloPergunta}</div>
			${respostas}
		</div>`;

		statusDasRespostas[i] = statusDaResposta;
	}
}

function reiniciarQuizz() {

	const paginaResultado = document.querySelector(".resultado");
	paginaResultado.style.display = "none";

	acertos = 0;
	perguntasRespondidas = 0;

	renderizarQuizz();

}

function selecionarResposta(selecionada) {

	const container = selecionada.parentElement;
	const respostas = container.querySelectorAll(".resposta");

	const todosContainers = document.querySelectorAll(".container-pergunta");

	for (let i = 0; i < todosContainers.length; i++) {
		if (container === todosContainers[i]) {

			if (i+1 < todosContainers.length) {
				setTimeout(function () {
					todosContainers[i+1].scrollIntoView();
				}, 2000) 
			}

			containerSelecionado = i;
		}
	}

	for (let i = 0; i < respostas.length; i++) {

		respostas[i].removeAttribute("onclick");

		if (selecionada !== respostas[i]) {
			respostas[i].classList.add("opacidade");
		}

		if (selecionada === respostas[i] && statusDasRespostas[containerSelecionado][i] === true) {
			acertos += 1;
		}

		if (statusDasRespostas[containerSelecionado][i] === true) {
			respostas[i].querySelector("h3").style.color = "#009C22";
		} else {
			respostas[i].querySelector("h3").style.color = "#FF4B4B";
		}
	}

	perguntasRespondidas += 1;

	if (perguntasRespondidas === quantidaPerguntas) {
		setTimeout(mostrarResultado, 2000) ;
	}
}

function mostrarResultado() {

	const paginaResultado = document.querySelector(".resultado");
	paginaResultado.style.display = "flex";

	const quizz = quizzSelecionado;

	const quantidadeLevels = quizz.levels.length;

	const porcentagemAcerto = Math.round(acertos/quantidaPerguntas*100);
	
	for (let i = 0; i < quantidadeLevels; i++) {

		if (porcentagemAcerto >= Math.round(quizz.levels[i].minValue)) {

			const cabecalhoResultado = document.querySelector(".cabecalho-resultado");
			cabecalhoResultado.innerHTML = `${porcentagemAcerto}% de acerto: ${quizz.levels[i].title}`;

			const imagemResultado = document.querySelector(".img-resultado");
			imagemResultado.src = quizz.levels[i].image;

			const descricaoResultado = document.querySelector(".descricao-resultado");
			descricaoResultado.innerHTML = quizz.levels[i].text;

			cabecalhoResultado.scrollIntoView();

			break;
		}
	}
}

function criarQuizz() {
    const paginaInicial = document.querySelector(".pagina-inicial");
    paginaInicial.style.display = "none";

	const paginaCriarQuizz = document.querySelector(".paginaCrieQuizz");
	paginaCriarQuizz.style.display = "unset";
}

function voltarHome() {
	window.location.reload();
}

function carregarPagina() {

	const telaCarregamento = document.querySelector(".loading");

	if (telaCarregamento.style.display === "flex") {
		telaCarregamento.style.display = "none";
	} else {
		telaCarregamento.style.display = "flex";
	}
}

/* [
	{
		id: 1,
		title: "Título do quizz",
		image: "https://http.cat/411.jpg",
		questions: [
			{
				title: "Título da pergunta 1",
				color: "#123456",
				answers: [
					{
						text: "Texto da resposta 1",
						image: "https://http.cat/411.jpg",
						isCorrectAnswer: true
					},
					{
						text: "Texto da resposta 2",
						image: "https://http.cat/412.jpg",
						isCorrectAnswer: false
					}
				]
			},
			{
				title: "Título da pergunta 2",
				color: "#123456",
				answers: [
					{
						text: "Texto da resposta 1",
						image: "https://http.cat/411.jpg",
						isCorrectAnswer: true
					},
					{
						text: "Texto da resposta 2",
						image: "https://http.cat/412.jpg",
						isCorrectAnswer: false
					}
				]
			},
			{
				title: "Título da pergunta 3",
				color: "#123456",
				answers: [
					{
						text: "Texto da resposta 1",
						image: "https://http.cat/411.jpg",
						isCorrectAnswer: true
					},
					{
						text: "Texto da resposta 2",
						image: "https://http.cat/412.jpg",
						isCorrectAnswer: false
					}
				]
			}
		],
		levels: [
			{
				title: "Título do nível 1",
				image: "https://http.cat/411.jpg",
				text: "Descrição do nível 1",
				minValue: 0
			},
			{
				title: "Título do nível 2",
				image: "https://http.cat/412.jpg",
				text: "Descrição do nível 2",
				minValue: 50
			}
		]
	}
] */