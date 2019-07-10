<template>
    <div class="container" id="app-container">
        <div class="row">
            <div class="col-sm-12 header-container">
                <h2>Tasks with MongoDB and VUE</h2>
            </div>
            <div class="col-sm-6">
                <div class="card border-secondary mb-3">
                    <div class="card-header">Task Lists</div>
                    <div class="card-body">
                        <form @submit.prevent="sendTask">
                            <div class="form-group">
                                <label for="nameTask">Task</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="nameTask" 
                                    aria-describedby="nameTask" 
                                    placeholder="Name of your task"
                                    v-model="task.title">
                            </div>
                            <div class="form-group">
                                <label for="descriptionTask">Description</label>
                                <textarea 
                                    name="descriptionTask" 
                                    id="descriptionTask" 
                                    cols="30" 
                                    rows="10" 
                                    class="form-control" 
                                    placeholder="Description of your task"
                                    v-model="task.description">
                                </textarea>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary w-100">
                                    {{editMode ? 'Update': 'Add'}} Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-light" v-for="task in tasks" :key="task.title">
                        <td>{{task.title}}</td>
                        <td>{{task.description}}</td>
                        <td>
                            <button type="button" class="btn btn-primary btn-block" @click="getTask(task._id)">Edit</button>
                            <button type="button" class="btn btn-danger btn-block"  @click="deleteTask(task._id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
                </table> 
            </div>
        </div>
    </div>
</template>
<script>

import Task from '../models/task';

export default {
    data() {
        return {
            task: new Task(),
            tasks: [],
            editMode: false
        }
    },
    created() {
        this.getTasks();
    },
    methods: {
        getTasks(){
            fetch('/api/tasks')
                .then( response => response.json())
                .then( data => this.tasks = data);
        },
        sendTask() {
            
            if(!this.editMode && !this.task._id) {

                fetch('/api/tasks',{
                    method: 'POST',
                    body: JSON.stringify(this.task),
                    headers:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then( response => response.json())
                .then( data => {
                    this.task = new Task();
                    this.editMode = false;
                    this.getTasks();
                });

            } else {

                fetch('/api/tasks/' + this.task._id,{
                    method: 'PUT',
                    body: JSON.stringify(this.task),
                    headers:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then( response => response.json())
                .then( data => {
                    this.task = new Task();
                    this.editMode = false;
                    this.getTasks();
                });
            }
        },
        deleteTask(id) {
            fetch('/api/tasks/' + id, {
                    method: 'DELETE',
                    headers:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then( response => response.json())
                .then( data => {
                    this.getTasks();
                });
        },
        getTask(id){
            fetch('/api/tasks/' + id, {
                method: 'GET',
                headers:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then( response => response.json())
            .then( data => {
                this.task = data.task;
                this.editMode = true;
            });
        }
    }
}
</script>
