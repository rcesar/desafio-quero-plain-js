'use strict'

class TaskDetail {
    constructor(task){
        this.currentTask = task;
        this.el = this.getEl();

        this.setupEvents();
    }

    get activeTask(){
        return this.currentTask;
    }

    set activeTask (task){
        this.currentTask = task

        if (this.currentTask) {
            let title = this.el.querySelector('.title-data input');
            setTimeout(()=>{
                title.value = this.currentTask.title;
                title.focus();
            });
            

            let description = this.el.querySelector('.description-data textarea');
            description.value = this.currentTask.description;
        }
    }

    getEl(){
        let el = document.querySelector('.task-detail');
        return el;
    }

    setupEvents(){
        let closeButton = this.el.querySelector('.btn-close');
        closeButton.addEventListener('click', () => {
            Utils.DispatchEvent('close-detail-task');
        });

        let title = this.el.querySelector('.title-data input');
        title.addEventListener('blur', () => {
            this.currentTask.title = title.value;
            this.currentTask.save();
        });

        title.addEventListener('keyup', (ev) => {
            if(ev.keyCode === 13){
                this.currentTask.title = title.value;
                this.currentTask.save();
            }
        });

        let description = this.el.querySelector('.description-data textarea');
        description.addEventListener('blur', () => {
            this.currentTask.description = description.value;
            this.currentTask.save();
        });

        description.addEventListener('keyup', (ev) => {
            if(ev.keyCode === 13){
                this.currentTask.description = description.value;
                this.currentTask.save();
            }
        });
    }

    
}