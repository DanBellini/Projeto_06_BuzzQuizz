const API = "https://mock-api.driven.com.br/api/v6/buzzquizz";
let quizzes = [];
let statusDasRespostas = [];
let containerSelecionado = 0;
let quizzSelecionado = {}


function solicitarQuizzes() {
    const promisse = axios.get(`${API}/quizzes`);
    promisse.then(function (resposta){
        quizzes = resposta.data;
        renderizarListagemQuizz();
    })
}
solicitarQuizzes();

function renderizarListagemQuizz() {

    const todosQuizzes = document.querySelector(".todos.quizzes");
    todosQuizzes.innerHTML = "";

    for (let i = 0; i < quizzes.length; i++) {

		let identificador = quizzes[i].id
        let titulo = quizzes[i].title;
        let imagem = quizzes[i].image;

        todosQuizzes.innerHTML += `
        <div id="${identificador}" class="quizz" onclick="abrirQuizz(this)">
            <img src=${imagem} alt="">
            <div class="gradiente"></div>
            <h3>${titulo}</h3>
        </div>`;
    }
}

function abrirQuizz(quizz) {
    const paginaInicial = document.querySelector(".pagina-inicial")
    paginaInicial.style.display = "none"

	quizzSelecionado = quizzes.find(arr => arr.id === Number(quizz.id))

	renderizarQuizz()

	const paginaQuizz = document.querySelector(".pagina-do-quizz")
	paginaQuizz.style.display = "unset"
}

function renderizarQuizz() {
	const quizz = quizzSelecionado;

	const imagemDoQuizz = document.querySelector(".imagem-do-quizz");
	imagemDoQuizz.src = quizz.image;
	imagemDoQuizz.scrollIntoView()
	
	const tituloQuizz = document.querySelector(".titulo-do-quizz");
	tituloQuizz.innerHTML = quizz.title;

	const quantidaPerguntas = quizz.questions.length;

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
		if (statusDasRespostas[containerSelecionado][i] === true) {
			respostas[i].querySelector("h3").style.color = "#009C22";
		} else {
			respostas[i].querySelector("h3").style.color = "#FF4B4B";
		}
	}
}

function criarQuizz() {
    const paginaInicial = document.querySelector(".pagina-inicial")
    paginaInicial.style.display = "none"

	const paginaCriarQuizz = document.querySelector(".paginaCrieQuizz")
	paginaCriarQuizz.style.display = "unset"
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
