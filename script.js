function openFeatures() {
    var allElem = document.querySelectorAll('.elem')
    var fullElemPage = document.querySelectorAll('.fullElem')
    var fullElemPageBackBtn = document.querySelectorAll('.fullElem .back')

    allElem.forEach((elem) => {
        elem.addEventListener('click', () => {
            fullElemPage[elem.id].style.display = 'block'
        })

    })

    fullElemPageBackBtn.forEach((back) => {
        back.addEventListener('click', () => {
            fullElemPage[back.id].style.display = 'none';
        })
    })


}
openFeatures()

function todolist() {
    let form = document.querySelector('.addTask form')
    let taskInput = document.querySelector('.addTask form input')
    let taskDetailsInput = document.querySelector('.addTask form textarea')
    let taskCheckbox = document.querySelector('.addTask form #check')


    var currentTask = []

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))

    } else {
        console.log('task list is empty');

    }

    function renderTask() {
        let allTask = document.querySelector('.allTask')
        let sum = ''

        currentTask.forEach((elem, indx) => {
            sum = sum + ` <div class="task">
              <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
              <button id=${indx}>Mark as Completed</button>
            </div>`
        })
        allTask.innerHTML = sum;
        localStorage.setItem('currentTask', JSON.stringify(currentTask))


        document.querySelectorAll('.task button').forEach((btn) => {
            btn.addEventListener('click', () => {
                currentTask.splice(btn.id, 1)
                renderTask()
            })
        })
    }

    renderTask();


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        currentTask.push(
            {
                task: taskInput.value,
                details: taskDetailsInput.value,
                imp: taskCheckbox.checked
            }
        )
        renderTask()

        taskCheckbox.checked = false;
        taskInput.value = '';
        taskDetailsInput = '';


    })
}
todolist()


function dailyPlnner(){
    
var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

var dayPlanner = document.querySelector('.day-planner')


var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 -${7 + idx}:00`)

var wholeDaySum = ''
hours.forEach((elem, idx) => {

    var savedData = dayPlanData[idx] || '';
    

    wholeDaySum = wholeDaySum + ` <div class="day-planner-time">
            <p>${elem}</p>
            <input id=${idx} type="text" placeholder="..." value=${savedData}>
          </div>`

})
dayPlanner.innerHTML = wholeDaySum


var dayPlannerinput = document.querySelectorAll('.day-planner input')
dayPlannerinput.forEach((elem) => {
    elem.addEventListener('input', () => {
        dayPlanData[elem.id] = elem.value
        console.log("hello");
        
        localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))

    })
})

}
dailyPlnner();

