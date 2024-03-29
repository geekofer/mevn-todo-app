const express = require('express');
const router = express.Router();

const Task = require('../models/task');


router.get('/', async (req, res) => {
    
    const tasks = await Task.find();
    
    res.json(tasks);
});

router.get('/:id', async (req, res) => {
    
    const task = await Task.findById(req.params.id);

    res.json({
        message: 'Task Found',
        task
    });
});

router.post('/', async (req, res) => {
    
    const task = new Task(req.body);
    await task.save();

    res.json({
        message: 'Task Saved',
        task
    }); 
});


router.put('/:id', async (req, res) => {

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.json({
        message: 'Task Updated',
        task
    });
});


router.delete('/:id', async (req, res) => {
    
    const task = await Task.findByIdAndRemove(req.params.id);

    res.json({
        message: 'Task Removed',
        task
    });
});

module.exports = router;
