'use strict'

const MAX_GHOST_ROW = 12;

class TaskList {
    constructor(){
        this.tasks = {};
        this.el = this.getEl();
        this.activeTask = null;
        
        this.setupEvents();
        this.loadTasks();
        this.populateGhost();
    };

    getEl(){
        const el = document.querySelector('.task-list');
        return el;
    }
    
    setupEvents() {
        let addButton = document.querySelector('#addButton');
        addButton.addEventListener('click', () => {
            const task = new Task();
            this.tasks[task._id] = task;
            this.createTask(task);
            this.setActiveTask(task);
        })

        let forms = document.querySelectorAll('form');
        forms.forEach((el) => {
            el.addEventListener('submit',(ev) => {
                ev.preventDefault();
            })
        })
    }

    getList(){
        return this.el.querySelector('ul');
    }

    loadTasks(){
        const keys = Object.keys(localStorage);
        if(keys.length){
            for(let idx in keys){
                const taskData = JSON.parse(localStorage.getItem(keys[idx]));
                const task = new Task(taskData._id, taskData.title, taskData.description, taskData.order);
                this.tasks[task._id] = task;
            }
            this.orderTasks();
        }
    }

    updateTasksOrder(){
        let list = this.getList();
        let tasks = list.querySelectorAll('.task');

        tasks.forEach((item, order) => {
            const _id = item.getAttribute('_id');
            item.setAttribute('order',order);
            this.tasks[_id].order = order;
            this.tasks[_id].save();
        });
    }

    orderTasks(){
        let tasksArr = [];
        for(let i in this.tasks){
            const task = this.tasks[i];
            tasksArr.push(task);
        }

        tasksArr.sort((prev, next) => {
            let prevOrder = prev.order;
            let nextOrder = next.order;
            return ((prevOrder > nextOrder) ? -1 : ((prevOrder < nextOrder) ? 1 : 0));
        });

        tasksArr.forEach(task => this.createTask(task));
    }

    createTask (task){
        let list = this.getList();
        let li = task.el;
        li.classList.add('task');
        
        list.insertBefore(li,list.firstElementChild);
        
        task.el.addEventListener('click', () => {
            this.setActiveTask(task);
        });
        this.tasks[task._id] = task;

        this.removeGhostRow();
    }

    setActiveTask(task){
        let list = this.getList();
        let currentActive = list.querySelector('.active');

        if(currentActive){
            currentActive.classList.remove('active');
        }

        task.el.classList.add('active');
        Utils.DispatchEvent('open-detail-task', task);
    }

    removeActiveTask() {
        let list = this.getList();
        let currentActive = list.querySelector('.active');

        if (currentActive) {
            currentActive.classList.remove('active');
        }
    }

    populateGhost(){
        const tasksTotal = Object.keys(this.tasks).length;
        if(tasksTotal < MAX_GHOST_ROW){
            var resto = MAX_GHOST_ROW - tasksTotal;
            for(let i = 0; i < resto; i++){
                    this.createGhost();   
            }
        }
    }

    createGhost(){
        let list = this.getList();
        const task = new Task();
        let li = task.el;
        task.el.addEventListener('click', () => {
            this.setActiveTask(task);
        });
        li.classList.remove('task');
        li.classList.add('ghost');
        this.tasks[task._id] = task;
        list.appendChild(li);
    }

    removeGhostRow(){
        let list = this.getList();
        let rows = list.querySelectorAll('li');

        if(rows.length > MAX_GHOST_ROW){
            var ghost = list.querySelector('.ghost');
            if(ghost){
                ghost.remove();
            }
        }
    }
}