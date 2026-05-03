const form = document.querySelector('form');
const tasks = document.querySelector('#tasks');
const input = document.querySelector('input');
const countEl = document.getElementById('count');

function updateCount() {
    const total = tasks.querySelectorAll('.task-card').length;
    const done = tasks.querySelectorAll('.task-card.done').length;
    countEl.textContent = `${total} task${total !== 1 ? 's' : ''} · ${done} done`;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text === "") return;

    const parent = document.createElement('div');
    parent.classList.add('task-card');

    const task = document.createElement('span');
    task.classList.add('task-text');
    task.textContent = text;

    const doneB = document.createElement('button');
    doneB.textContent = "DONE";
    doneB.classList.add('btn-done');

    const deleteB = document.createElement('button');
    deleteB.textContent = "DELETE";
    deleteB.classList.add('btn-delete');

    parent.append(task, doneB, deleteB);
    tasks.append(parent);

    deleteB.addEventListener('click', () => {
        parent.style.transition = 'opacity 0.2s, transform 0.2s';
        parent.style.opacity = '0';
        parent.style.transform = 'scale(0.95)';
        setTimeout(() => { parent.remove(); updateCount(); }, 200);
    });

    doneB.addEventListener('click', () => {
        parent.classList.toggle('done');
        doneB.textContent = parent.classList.contains('done') ? 'UNDO' : 'DONE';
        updateCount();
    });

    input.value = "";
    updateCount();
});