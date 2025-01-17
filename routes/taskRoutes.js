const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const route = express.Router();
const Task = require("../controllers/taskController");
const logger = require('../logger');

route.use(authMiddleware);

route.get("/task/:name_task?", async (req, res) => {
    const user = req.userId
    const name_task = req.params.name_task || req.query.name_task || ""

    var returnAPI = await Task.List(user)

    return res.send(returnAPI)
})

route.get("/task/export", async (req, res) => {
    try {
        const filePath = await Task.ExportToExcel();
        if (filePath.erro) {
            return res.status(500).send(filePath.erro);
        } else if (!filePath) {
            return res.status(500).send('Erro ao gerar arquivo Excel');
        }

        res.download(filePath, 'tasks.xlsx', (err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Erro ao baixar o arquivo.');
            }
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send('Erro: ' + e);
    }
})

route.get('/tasks/report', async (req, res) => {
    try {
        const userId = req.userId;

        const task = await Task.Aggregate(userId);

        res.send(task);
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        res.status(500).send('Erro ao gerar relatório');
    }
});


route.post("/task", async (req, res) => {
    try{
        const { name, description, priority, type, term } = req.body
        const user = req.userId

        if (name == "" || name == undefined)
            return res.send({ erro: "Name task can't null." })

        if (description == "" || description == undefined)
            return res.send({ erro: "Description can't null." })

        if (priority == "" || priority == undefined)
            return res.send({ erro: "Priority can't null." })

        if (type == "" || type == undefined)
            return res.send({ erro: "Type can't null." })

        if (term == "" || term == undefined)
            return res.send({ erro: "Term can't null." })

        logger.log('Creating task with data:', { name, description, priority, type, term, user });

        var returnAPI = await Task.Create(name, description, priority, type, term, user)
        logger.log('Task created:', returnAPI);
        return res.send(returnAPI)
    }
    catch(e) {
        logger.error(e)
        return res.send('Erro: ' + e)
    }
})

route.put('/task/complete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.FindById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.completed = true;
        await task.save();
        res.json(task);
    } catch (error) {
        logger.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

route.put("/task", async (req, res) => {
    const { id, name, description, priority, type, term } = req.body
    try {
        if (id == "" || id == undefined)
            return res.send({ erro: "Id can't null." })

        if (name == "" || name == undefined)
            return res.send({ erro: "Name task can't null." })

        if (description == "" || description == undefined)
            return res.send({ erro: "Description can't null." })

        if (priority == "" || priority == undefined)
            return res.send({ erro: "Priority can't null." })

        if (type == "" || type == undefined)
            return res.send({ erro: "Type can't null." })

        if (term == "" || term == undefined)
            return res.send({ erro: "Term can't null." })

        var returnAPI = await Task.Update(id, name, description, priority, type, term)
        return res.send(returnAPI)
    } catch (e) {
        console.log(e)
        return res.send('Erro: ' + e)
    }
})

route.delete("/task", async(req, res) => {
    const { id } = req.body
    try {
        if (id == "" || id == undefined)
            return res.send({ erro: "Id can't null." })

        var returnAPI = await Task.Delete(id)
        return res.send(returnAPI)
    } catch (e) {
        console.log(e)
        return res.send('Erro: ' + e)
    }
})

module.exports = route;
