'use strict'

class Task {
    constructor(id, title, description, order){
        this._id = id || this.getId();
        this.order = order || -1;
        this.el = this.getEl();
        this.title = title || '';
        this.description = description || '';
    }

    get title(){
        return this.el.firstChild.firstChild.innerText;
    }

    set title (newTitle){
        this.el.firstChild.firstChild.innerText = newTitle
        this.el.classList.remove('ghost');
        this.el.classList.add('task');
        Utils.DispatchEvent('update-task-order');
    }

    save(){
        localStorage.setItem(this._id, this.serialize(this));
    }

    getId(){
        let id = +new Date + Math.round(Math.random() * 1000000);
        return id;
    }

    getEl(){
        let li = document.createElement('li');
        let rowContent = document.createElement('div');
        li.setAttribute('_id', this._id);

        let spanIcon = document.createElement('span');
        spanIcon.classList.add('check-icon-list')

        let icon = document.createElement('i');
        icon.classList.add('icon-check-small');

        spanIcon.appendChild(icon);
        
        let span = document.createElement('span');

        let spanStatus = document.createElement('span');
        spanStatus.classList.add('user-status');

        rowContent.appendChild(span);
        rowContent.appendChild(spanIcon);
        rowContent.appendChild(spanStatus);
        li.appendChild(rowContent);
        return li;
    }

    serialize(task){
        return JSON.stringify({
            _id:task._id,
            title:task.title,
            description:task.description,
            order: this.order
        })
    }
    
}