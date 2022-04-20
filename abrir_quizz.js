const API = "https://mock-api.driven.com.br/api/v6/buzzquizz"
let listaQuizzes = []


function solicitarQuizzes() {
    const promisse = axios.get(`${API}/quizzes`)
    promisse.then(function (resposta){
        quizzes = resposta.data
        renderizarQuizzes()
    })
}
solicitarQuizzes()

function renderizarQuizzes() {

    const todosQuizzes = document.querySelector(".todos.quizzes")
    todosQuizzes.innerHTML = ""

    for (let i = 0; i < quizzes.length; i++) {
        let titulo = quizzes[i].title
        let imagem = quizzes[i].image

        todosQuizzes.innerHTML += `
        <div class="quizz" onclick="abrirQuizz()">
            <img src=${imagem} alt="">
            <div class="gradiente"></div>
            <h3>${titulo}</h3>
        </div>`
                
    }
}

function abrirQuizz() {
    const paginaInicial = document.querySelector(".pagina-inicial")
    paginaInicial.style.display = "none"
}

function criarQuizz() {
    
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