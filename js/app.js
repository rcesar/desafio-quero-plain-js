'use strict'

document.addEventListener("DOMContentLoaded", function() {
 new Application();
});

class Application {
    constructor (){
        this.taskList = new TaskList();
        this.taskDetail = new TaskDetail();
        
        this.setupEvents();
    }

    setupEvents(){
        window.document.addEventListener('close-detail-task', (ev) => {
            this.closeDetailTask();
        });

        window.document.addEventListener('open-detail-task', (ev) => {
            this.openDetailTask(ev.detail);
        });
        
        window.document.addEventListener('update-task-order', (ev) => {
            console.log('update');
            this.updateTaskOrder();
        });
    }

    updateTaskOrder(){
        this.taskList.updateTasksOrder();
    }

    closeDetailTask(){
        const el = document.querySelector('.content');
        this.taskList.removeActiveTask();
        el.classList.remove('detail-mode');
        el.classList.add('list-mode');
    }

    openDetailTask(task){
        this.taskDetail.activeTask = task;
        const el = document.querySelector('.content');
        el.classList.remove('list-mode');
        el.classList.add('detail-mode');
    }
}