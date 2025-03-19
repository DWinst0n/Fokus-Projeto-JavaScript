import { accionarEventos } from './btnEvents.js';
import { tasksList, idsGerados } from './tasks.js';

export function salvarTarefasNoLocalStorage() {
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

export function carregarTarefasDoLocalStorage() {
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
                <div class="task__buttons">
                    <span class="material-icons task-delete">delete</span>
                    <span class="material-icons task-edit">edit</span>
                </div>
            </li>`;

            tasksList.innerHTML += tarefaHTML;
        });

        accionarEventos();
    }

    
}