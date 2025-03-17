import { accionarEventos } from './btnEvents.js';

export const tarefaNome = document.getElementById("tarefaNome");
export const tasksList = document.getElementById("listaTarefas");
const btnDeteleTasks = document.querySelector(".tasks-title span");
export const idsGerados = new Set();

export function initTasks() {
    btnDeteleTasks.addEventListener("click", () => {
        const confirmar = confirm("Realmente deseja apagar todos os itens da lista?");
        if (confirmar) {
            tasksList.innerHTML = "";
            idsGerados.clear();
            tarefaNome.textContent = "Nome da Tarefa em andamento";
            salvarTarefasNoLocalStorage();
        }
    });

    const addTaskBtn = document.getElementById("btnAddTask");
    const addTaskCard = document.querySelector(".add__task__container");

    addTaskBtn.addEventListener("click", (e) => {
        if (addTaskCard.classList.contains("invisivel")) {
            addTaskCard.classList.remove("invisivel");
            e.currentTarget.classList.add("invisivel");
        }
    });

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
        });
    });
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
        <span class="material-icons task-delete">delete</span>
    </li>`;
}