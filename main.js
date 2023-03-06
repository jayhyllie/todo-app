const todoList = document.querySelector('.main__todo--list');
const input = document.querySelector('.header form input');
const itemLeft = document.querySelector('.main__todo--states .states__items-left span');

let inputValue = input.value;
let count = 0;
itemLeft.innerHTML = count;

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTodo();
        count++;
        itemLeft.innerHTML = count;
    }
})

function addTodo() {
    const todoText = input.value.trim();
    if (todoText) {
        const li = document.createElement('li');
        li.classList.add('main__todo--list-item');
        const checkBox = document.createElement('input')
        checkBox.classList.add('added--todo');
        checkBox.setAttribute('type', 'checkbox');
        const title = document.createElement('h2');
        title.classList.add('added--todo-title');
        const span = document.createElement('span');
        span.classList.add('todo__remove');
        span.innerText = 'X';

        span.addEventListener('click', () => {
            li.remove();
            count--;
            itemLeft.innerHTML = count;
        });

        checkBox.addEventListener('click', () => {
            if (li.classList.contains('done')) {
                count++;
            } else {
                count--;
            }
            li.classList.toggle('done');
            itemLeft.innerHTML = count;
        })

        title.innerText = todoText;
        li.appendChild(checkBox)
        li.appendChild(title);
        li.appendChild(span);
        todoList.appendChild(li);
        input.value = '';
    }
}

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