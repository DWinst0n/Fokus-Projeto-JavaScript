import { tarefaEmAndamento, tasksList, idsGerados } from './tasks.js';
import { salvarTarefasNoLocalStorage } from './crudScript.js';

const listaItensTasks = document.getElementById("listaTarefas").children;
const btnDeleteTasksDone = document.getElementById("btn-remover-concluidas");
const btndeleteAllTasks = document.getElementById("btn-remover-todas");
const btnShowCardBtns = document.querySelector(".app_button-more");

export function accionarEventos() {
    btnShowCardBtns.addEventListener("mouseenter", () => { 
        if (document.querySelectorAll(".checked2").length > 0) {
            btnDeleteTasksDone.parentElement.style.display = "block";
        } else {
            btnDeleteTasksDone.parentElement.style.display = "none";
        }
    });
    btndeleteAllTasks.addEventListener("click", () => {
        const confirmar = confirm("Realmente deseja apagar todos os itens da lista?");
        if (confirmar) {
            tasksList.innerHTML = "";
            idsGerados.clear();
            tarefaEmAndamento.textContent = "Nome da Tarefa em andamento";
            salvarTarefasNoLocalStorage();
        }
    });

    btnDeleteTasksDone.addEventListener("click", () => {
        const tarefasConcluidas = document.querySelectorAll(".checked2");
        tarefasConcluidas.forEach(tarefa => tarefa.remove());
        salvarTarefasNoLocalStorage();
    })

    document.querySelectorAll('.input-checkboxTask').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            let taskItem = e.target.parentElement.parentElement;
            if (e.target.checked) {
                taskItem.classList.add('checked2');
                tarefaEmAndamento.textContent = "Nome da Tarefa em andamento";
                if (taskItem.classList.contains("working")) {
                    taskItem.classList.toggle("working");
                }
            } else {
                taskItem.classList.remove('checked2');
            }
            salvarTarefasNoLocalStorage();
        });
    });

    document.querySelectorAll(".task__item span").forEach(taskBtn => {
        taskBtn.addEventListener("click", (e) => {
            let taskItem = e.target.parentElement.parentElement;
            switch (taskBtn.textContent) {
                case 'delete':
                    if (!taskItem.classList.contains("checked2")) {
                        const confirmacao = confirm("Deseja excluir esta tarefa?");
                        if (confirmacao) {
                            taskItem.remove();
                        }
                    } else {
                        taskItem.remove();
                    }
                    salvarTarefasNoLocalStorage();
                    break;
                case 'edit':
                    const novaDescricaoTask = prompt("Editando o nome da tarefa");
                    if(novaDescricaoTask && novaDescricaoTask.trim()){
                        taskItem.querySelector("p").textContent = novaDescricaoTask;
                        salvarTarefasNoLocalStorage();
                    } else {return}
                    break;
                default:
                    break;
            }
            if (listaItensTasks.length < 1) {
                setTimeout(() => {
                    if (listaItensTasks.length < 1) {
                        tarefaEmAndamento.textContent = "Nome da tarefa em andamento";
                        idsGerados.clear();
                    }
                }, 0);
            }
        })
    })

    const arrayItensTasks = Array.from(listaItensTasks);
    arrayItensTasks.forEach(item => {
        item.addEventListener("click", () => {
            let iClass = item.classList;
            let laterTask = document.querySelector(".working");
            if (iClass.contains("checked2")) return;
            if (iClass.contains("working")) {
                tarefaEmAndamento.textContent = "Nome da tarefa em andamento";
                iClass.toggle("working");
                return;
            } else {
                if (laterTask) laterTask.classList.toggle("working")
                iClass.toggle("working");
                const tarefa = item.querySelector(`p`).textContent;
                tarefaEmAndamento.textContent = tarefa;
                }
        })
    })
}