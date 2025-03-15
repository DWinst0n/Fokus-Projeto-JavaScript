const botoesContexto = document.querySelectorAll(".app__card-button");
const timer = document.getElementById("timer");
let minutos;
let segundos;
let isRunning = false;
let currentContextIndex = 0;

window.addEventListener("load", () => {
    botoesContexto[0].click();
    carregarTarefasDoLocalStorage();
});

const title = document.querySelector(".app__title");
botoesContexto.forEach((botao, index) => {
    botao.addEventListener("click", () => {
        document.querySelector(".active")?.classList.remove("active");
        botao.classList.add("active");
        currentContextIndex = index;

        let btnTxt = botao.textContent.trim().toLowerCase().split(" ");
        let contexto = btnTxt.join("-");
        document.querySelector("html").dataset.contexto = contexto;
        document.querySelector(".app__image").src = `imagens/${contexto}.png`;
        switch (botao.dataset.contexto) {
            case "short":
                minutos = 5;
                segundos = 0;
                title.innerHTML = `                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
                timer.textContent = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`
                break;
            case "long":
                minutos = 15;
                segundos = 0;
                title.innerHTML = `                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
                timer.textContent = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`
                break;
            default:
                minutos = 25;
                segundos = 0;
                title.innerHTML = `                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
                timer.textContent = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`
                break;
        }
    });
});

let intervalId;
const mainButton = document.getElementById("start-pause");
const mainBtnTxt = document.querySelector(`.${mainButton.className} span`);

mainButton.addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        const playSom = new Audio("sons/play.wav");
        playSom.play();
        mainBtnTxt.textContent = "Pausar";
        startTimer();
        botoesContexto.forEach(b => {b.style.display = "none";})
    } else {
        isRunning = false;
        const pauseSom = new Audio("sons/pause.mp3");
        pauseSom.play();
        mainBtnTxt.textContent = "Começar";
        clearInterval(intervalId);
        botoesContexto.forEach(b => {b.style.display = "block";})
    }
});

function startTimer() {
    intervalId = setInterval(() => {
        if (segundos === 0) {
            if (minutos === 0) {
                clearInterval(intervalId);
                isRunning = false;
                mainBtnTxt.textContent = "Começar";
                const terminouSom = new Audio("sons/beep.mp3");
                terminouSom.play();
                botoesContexto.forEach(b => {b.style.display = "block";})
                
                autoAlternarProximoContexto();
                return;
            } else {
                minutos--;
                segundos = 59;
            }
        } else {
            segundos--;
        }
        timer.textContent = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
    }, 1000);
}

function autoAlternarProximoContexto() {
    let nextIndex;
    
    if (currentContextIndex === 0) {
        nextIndex = Math.random() < 0.5 ? 1 : 2;
    } else {
        nextIndex = 0;
    }
    
    currentContextIndex = nextIndex;
    botoesContexto[nextIndex].click();
}

const botaoMusica = document.getElementById("alternar-musica");
const musica = new Audio("sons/luna-rise-part-one.mp3");
botaoMusica.addEventListener("click", () => {
    if (botaoMusica.checked) {
        musica.play();
        musica.addEventListener("ended", () => {
            musica.currentTime = 0;
            musica.play();
        })
    } else {
        musica.pause();
    }
})

const tarefaNome =  document.getElementById("tarefaNome");
const tasksList = document.getElementById("listaTarefas");
const btnDeteleTasks = document.querySelector(".tasks-title span");
const idsGerados = new Set();

btnDeteleTasks.addEventListener("click", () => {
    const confirmar = confirm("Realmente deseja apagar todos os itens da lista?");
    if (confirmar) {
        tasksList.innerHTML = "";
        idsGerados.clear();
        tarefaNome.textContent = "Nome da Tarefa em andamento";
        salvarTarefasNoLocalStorage(); 
    }
})

const addTaskBtn = document.getElementById("btnAddTask");
const addTaskCard = document.querySelector(".add__task__container");

addTaskBtn.addEventListener("click", (e) => {
    if (addTaskCard.classList.contains("invisivel")) {
        addTaskCard.classList.remove("invisivel");
        e.currentTarget.classList.add("invisivel");
    }
})

const taskDescricao = document.getElementById("taskDescription");
const botoesAddTask = document.querySelectorAll(".botoes__tasks__container button");

botoesAddTask.forEach(botao => {
    botao.addEventListener("click", (e) => {
        let acao = e.target.className.split("__")[1];
        switch (acao) {
            case "delete":
                taskDescricao.value = "";
                break;
            case "cancel":
                taskDescricao.value = "";
                addTaskCard.classList.add("invisivel");
                addTaskBtn.classList.remove("invisivel");
                break;
            case "save":
                if (taskDescricao.value.trim()) {
                    const novaTarefa = criarItemLista(taskDescricao.value);
                    tasksList.innerHTML += novaTarefa;
                    accionarEventos();
                    taskDescricao.value = "";
                    addTaskCard.classList.add("invisivel");
                    addTaskBtn.classList.remove("invisivel");
                    salvarTarefasNoLocalStorage(); 
                }
                break;
            default:
                break;
        }
    })
})

function gerarId() {
    let id;
    do {
        id = Math.floor(Math.random() * 1e3);
    } while(idsGerados.has(id));
    
    idsGerados.add(id);
    return id;
}

function criarItemLista(descricao) {
    const id = gerarId();
    return `<li class="task__item" id="TaskID-${id}">
        <div class="checkboxTask__container">
            <input type="checkbox" class="input-checkboxTask invisivel" id="checkboxTask${id}">
            <label for="checkboxTask${id}" class="checkboxTask-customizado"></label>
            <p class="task__name">${descricao}</p>
        </div>
        <span class="material-icons task-delete">delete</span>
    </li>`;
}

const listaItensTasks = document.getElementById("listaTarefas").children;
function accionarEventos() {
    document.querySelectorAll('.input-checkboxTask').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            let taskItem = e.target.parentElement.parentElement;
            if (e.target.checked) {
                taskItem.classList.add('checked2');
                tarefaNome.textContent = "Nome da Tarefa em andamento";
            } else {
                taskItem.classList.remove('checked2');
            }
            salvarTarefasNoLocalStorage();
        });
    });
    document.querySelectorAll(".task__item span").forEach(deleteBtn => {
        deleteBtn.addEventListener("click", (e) => {
            let taskItem = e.target.parentElement;
            if (!taskItem.classList.contains("checked2")) {
                const confirmacao = confirm("Deseja excluir esta tarefa?");
                if (confirmacao) {
                    taskItem.remove();
                    salvarTarefasNoLocalStorage();
                }
            } else {
                taskItem.remove();
                salvarTarefasNoLocalStorage();
            }
            if (listaItensTasks.length < 1) tarefaNome.textContent = "Nome da Tarefa em andamento";
        })
    })
    const arrayItensTasks = Array.from(listaItensTasks);
    arrayItensTasks.forEach(item => {
        item.addEventListener("click", () => {
            const tarefa = document.querySelector(`#${item.id} p`).textContent;
            tarefaNome.textContent = tarefa;
        })
    })
}

function salvarTarefasNoLocalStorage() {
    const tarefas = [];
    document.querySelectorAll('.task__item').forEach(taskItem => {
        const id = taskItem.id;
        const descricao = taskItem.querySelector('.task__name').textContent;
        const concluida = taskItem.classList.contains('checked2');
        const checkboxId = taskItem.querySelector('.input-checkboxTask').id;
        
        tarefas.push({
            id: id,
            descricao: descricao,
            concluida: concluida,
            checkboxId: checkboxId
        });
    });
    
    localStorage.setItem('fokusTarefas', JSON.stringify(tarefas));
}

function carregarTarefasDoLocalStorage() {
    const tarefasSalvas = localStorage.getItem('fokusTarefas');
    
    if (tarefasSalvas) {
        const tarefas = JSON.parse(tarefasSalvas);
        
        tasksList.innerHTML = "";
        
        tarefas.forEach(tarefa => {
            const idNumero = tarefa.id.split('-')[1];
            idsGerados.add(parseInt(idNumero));
            
            const tarefaHTML = `<li class="task__item${tarefa.concluida ? ' checked2' : ''}" id="${tarefa.id}">
                <div class="checkboxTask__container">
                    <input type="checkbox" class="input-checkboxTask invisivel" id="${tarefa.checkboxId}" ${tarefa.concluida ? 'checked' : ''}>
                    <label for="${tarefa.checkboxId}" class="checkboxTask-customizado"></label>
                    <p class="task__name">${tarefa.descricao}</p>
                </div>
                <span class="material-icons task-delete">delete</span>
            </li>`;
            
            tasksList.innerHTML += tarefaHTML;
        });
        
        accionarEventos();
    }
}