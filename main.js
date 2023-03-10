const newTaskInput = document.querySelector('.header form input');
const taskList = document.querySelector('.main__todo--list');
const itemLeft = document.querySelector('.main__todo--states .states__items-left span');
const showAllButton = document.querySelector('#all');
const showActiveButton = document.querySelector('#active');
const showCompletedButton = document.querySelector('#completed');
const clearCompletedButton = document.querySelector('.states__remove');

let tasks = [];
let count = 0;
itemLeft.innerHTML = count;

newTaskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();
        count++;
        itemLeft.innerHTML = count;
    }
});

showAllButton.addEventListener('click', showAllTasks);
showActiveButton.addEventListener('click', showActiveTasks);
showCompletedButton.addEventListener('click', showCompletedTasks);

function addTask() {
    const taskName = newTaskInput.value.trim();
    if (taskName) {
        const task = { name: taskName, completed: false };
        tasks.push(task);
        updateTaskList();
        newTaskInput.value = '';
    }
}

function updateTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('main__todo--list-item');
        taskItem.setAttribute('data-done', 'no')
        const taskCheckbox = document.createElement('input');
        taskCheckbox.classList.add('added--todo');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.checked = task.completed;
        taskCheckbox.addEventListener('change', () => {
            task.completed = taskCheckbox.checked;
            if (task.completed) {
                count--;
            } else {
                count++;
            }
            itemLeft.innerHTML = count;
            updateTaskList();
        });
        const taskLabel = document.createElement('label');
        taskLabel.classList.add('added--todo-title');
        taskLabel.textContent = task.name;
        const span = document.createElement('span');
        span.classList.add('todo__remove');
        span.innerText = 'X';
        span.addEventListener('click', () => {
            taskItem.remove();
            count--;
            itemLeft.innerHTML = count;
        });
        taskItem.appendChild(taskCheckbox);
        taskItem.appendChild(taskLabel);
        taskItem.appendChild(span);
        if (task.completed) {
            taskItem.classList.add('done');
        }
        taskList.appendChild(taskItem);

        clearCompletedButton.addEventListener('click', () => {
            if (task.completed) {
                taskItem.remove();
            }
        })
    });
}

function showAllTasks() {
    showAllButton.classList.add('active');
    showActiveButton.classList.remove('active');
    showCompletedButton.classList.remove('active');
    tasks.forEach((task) => {
        taskList.childNodes[getIndex(task)].style.display = 'flex';
    });
}

function showActiveTasks() {
    showAllButton.classList.remove('active');
    showActiveButton.classList.add('active');
    showCompletedButton.classList.remove('active');
    tasks.forEach((task) => {
        taskList.childNodes[getIndex(task)].style.display = task.completed ? 'none' : 'flex';
    });
}

function showCompletedTasks() {
    showAllButton.classList.remove('active');
    showActiveButton.classList.remove('active');
    showCompletedButton.classList.add('active');
    tasks.forEach((task) => {
        taskList.childNodes[getIndex(task)].style.display = task.completed ? 'flex' : 'none';
    });
}

function getIndex(task) {
    return tasks.indexOf(task);
}

showAllTasks();

function darkMode() {
    const moon = document.querySelector('.header figure .moon');
    const sun = document.querySelector('.header figure .sun');

    moon.addEventListener('click', () => {
        moon.classList.remove('active')
        sun.classList.add('active')
    })
    sun.addEventListener('click', () => {
        sun.classList.remove('active')
        moon.classList.add('active')
    })
}
darkMode();
