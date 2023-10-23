document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task');
    const reminderInput = document.getElementById('reminder');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    let tasks = [];

    // Load tasks from local storage
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            const now = new Date();
            const reminder = new Date(task.reminder);
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                <span class="reminder">Reminder: ${reminder.toLocaleString()}</span>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            `;

            if (reminder > now) {
                li.querySelector('.reminder').style.color = 'green';
            } else {
                li.querySelector('.reminder').style.color = 'red';
            }

            taskList.appendChild(li);

            const editButton = li.querySelector('.edit');
            const deleteButton = li.querySelector('.delete');

            editButton.addEventListener('click', () => {
                const newText = prompt('Edit the task:', task.text);
                if (newText !== null) {
                    tasks[index].text = newText;
                    saveTasks();
                    renderTasks();
                }
            });

            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.querySelector('input').addEventListener('change', () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });
        });
    }

    addTaskButton.addEventListener('click', () => {
        const text = taskInput.value.trim();
        const reminder = reminderInput.value;
        if (text !== '') {
            tasks.push({ text, reminder, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
            reminderInput.value = '';
        }
    });
});



