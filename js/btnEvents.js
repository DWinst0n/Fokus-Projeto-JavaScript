import { tarefaNome } from './tasks.js';
import { salvarTarefasNoLocalStorage } from './crudScript.js';

const listaItensTasks = document.getElementById("listaTarefas").children;

export function accionarEventos() {
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