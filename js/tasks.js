import { accionarEventos } from './btnEvents.js';
import { salvarTarefasNoLocalStorage } from './crudScript.js';

export const tarefaEmAndamento = document.getElementById("tarefaEmAndamento");
export const tasksList = document.getElementById("listaTarefas");
const btnDeteleAllTasks = document.querySelector(".tasks-title span");
export const idsGerados = new Set();

const addTaskBtn = document.getElementById("btnAddTask");
const addTaskCard = document.querySelector(".add__task__container");
const taskDescricao = document.getElementById("taskDescription");
const botoesCardAddTask = document.querySelectorAll(".botoes__tasks__container button");

export function initTasks() {
    btnDeteleAllTasks.addEventListener("click", () => {
        const confirmar = confirm("Realmente deseja apagar todos os itens da lista?");
        if (confirmar) {
            tasksList.innerHTML = "";
            idsGerados.clear();
            tarefaEmAndamento.textContent = "Nome da Tarefa em andamento";
            salvarTarefasNoLocalStorage();
        }
    });
    addTaskBtn.addEventListener("click", (e) => {
        if (addTaskCard.classList.contains("invisivel")) {
            addTaskCard.classList.remove("invisivel");
            e.currentTarget.classList.add("invisivel");
        }
    });

    taskDescricao.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            salvarTarefa();
        }
    })

    botoesCardAddTask.forEach(botao => {
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
                    salvarTarefa();
                    break;
                default:
                    break;
            }
        });
    });
}

function salvarTarefa() {
    if (taskDescricao.value.trim()) {
        const novaTarefa = criarItemLista(taskDescricao.value);
        tasksList.innerHTML += novaTarefa;
        accionarEventos();
        taskDescricao.value = "";
        addTaskCard.classList.add("invisivel");
        addTaskBtn.classList.remove("invisivel");
        salvarTarefasNoLocalStorage();
    }
}

function gerarId() {
    let id;
    do {
        id = Math.floor(Math.random() * 1e3);
    } while (idsGerados.has(id));

    idsGerados.add(id);
    return id;
}

export function criarItemLista(descricao) {
    const id = gerarId();
    return `<li class="task__item" id="TaskID-${id}">
        <div class="checkboxTask__container">
            <input type="checkbox" class="input-checkboxTask invisivel" id="checkboxTask${id}">
            <label for="checkboxTask${id}" class="checkboxTask-customizado"></label>
            <p class="task__name">${descricao}</p>
        </div>
        <div class="task__buttons">
            <span class="material-icons task-delete">delete</span>
            <span class="material-icons task-edit">edit</span>
        </div>
    </li>`;
}