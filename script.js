const inputField = document.querySelector('.list-input')
const addBtn = document.querySelector('.add-btn')
const todoUl = document.querySelector('.todo-list')
let inputText = ''
let allTasks = JSON.parse(localStorage.getItem('tasks')) || []

addBtn.addEventListener('click', createTask)
inputField.addEventListener('keydown', (e) =>{
    if(e.key === 'Enter') createTask()
})

todoUl.addEventListener('click',(e) =>{

    const li = e.target.closest('.list-items')
    if(!li) return
    const index = li.dataset.index

    if(e.target.closest('.delete-btn')){

        allTasks.splice(index,1)

        saveTask()
        showTask()
    }

    if(e.target.closest('.task-checkbox')){

        allTasks[index].completed = e.target.checked
        saveTask()
    }
})

function showTask(){

    todoUl.innerHTML = ''
    
    if (allTasks.length === 0 ) {
        todoUl.innerHTML = `
        <div class = "empty-list">
            <p class = "default-text"> No tasks</p>
        </div>`
        return
    }


    allTasks.forEach((task, index) =>{

        todoUl.innerHTML += `
        <li class="list-items" data-index="${index}">
            <input type="checkbox" class="task-checkbox" ${task.completed? 'checked' : ''}>
            <p class="tasks">
                ${task.text}
            </p>
            <button class="delete-btn"></button>
        </li>
    `
    })
}

function createTask(){
    inputText = inputField.value

    if(inputText != ""){
    allTasks.push({
        text: inputText.trim(),
        completed:false
    })}
    inputText = ''
    inputField.value = ''

    saveTask()
    showTask()
}

function saveTask(){
    localStorage.setItem('tasks', JSON.stringify(allTasks))
}

showTask()



//Themes

const themeBtns = document.querySelectorAll('.theme-btns')

const themes = ['orange-theme', 'dark-theme']

themeBtns.forEach((btn) =>{

    btn.addEventListener('click', () =>{

        const theme = btn.dataset.theme
        document.body.classList.remove(...themes)

        if(theme){
            document.body.classList.add(theme)
        }

        localStorage.setItem('theme', theme)

    })
})

const savedTheme = localStorage.getItem('theme')

if(savedTheme){
    document.body.classList.add(savedTheme)
}


// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => {
            console.log('Service Worker Registered');
        })
        .catch(error => {
            console.error('Service Worker Registration Failed:', error);
        });
}