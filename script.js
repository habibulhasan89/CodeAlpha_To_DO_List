document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const action = e.target.dataset.action;
            const li = e.target.parentElement;

            if (action === 'delete') {
                li.remove();
            } else if (action === 'edit') {
                editTask(li);
            }
            saveTasks();
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span>${taskText}</span>
            <input type="text" class="edit-input" style="display:none;">
            <button class="edit-btn" data-action="edit">Edit</button>
            <button class="delete-btn" data-action="delete">Delete</button>
        `;
        taskList.appendChild(li);
        saveTasks();
    }

    function editTask(li) {
        const span = li.querySelector('span');
        const input = li.querySelector('.edit-input');
        const editBtn = li.querySelector('.edit-btn');

        if (span.style.display !== 'none') {
            input.value = span.textContent;
            span.style.display = 'none';
            input.style.display = 'inline';
            editBtn.textContent = 'Save';
        } else {
            span.textContent = input.value;
            span.style.display = 'inline';
            input.style.display = 'none';
            editBtn.textContent = 'Edit';
            saveTasks();
        }
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item span').forEach(taskSpan => {
            tasks.push(taskSpan.textContent.trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(taskText => addTask(taskText));
        }
    }

    loadTasks();
});
