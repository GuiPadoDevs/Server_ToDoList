const path = require('path');
const fs = require('fs');
const Task = require("../models/task")
const jwt = require("jsonwebtoken")
const ExcelJS = require('exceljs')

module.exports = {
    Create: async (name, description, priority, type, term, user) => {
        const newTask = new Task({
            name,
            description,
            priority,
            type,
            term,
            completed: false,
            userID: user
        });

        try {
            const savedTask = await newTask.save();
            return savedTask;
        } catch (e) {
            console.log(e.Stack)
            return { erro: "Create task error" }
        }
    },

    List: async (userID) => {
        try {
            return await Task.find({ userID })
        } catch (e) {
            console.log(e.Stack)
            return { erro: "List task error" }
        }
    },

    FindById: async (id) => {
        try {
            return await Task.findById(id)
        } catch (e) {
            console.log(e.Stack)
            return { erro: "FindById task error" }
        }
    },

    ExportToExcel: async () => {
        try {
            const tasks = await Task.find()
            const workbook = new ExcelJS.Workbook()
            const worksheet = workbook.addWorksheet('Tasks')

            worksheet.columns = [
                { header: 'Name', key: 'name', width: 30 },
                { header: 'Description', key: 'description', width: 30 },
                { header: 'Priority', key: 'priority', width: 30 },
                { header: 'Type', key: 'type', width: 30 },
                { header: 'Term', key: 'term', width: 30 }
            ]
            tasks.forEach(task => {
                worksheet.addRow(task)
            })

            const exportsDir = path.join(__dirname, '..', 'exports')
            if (!fs.existsSync(exportsDir)) {
                fs.mkdirSync(exportsDir)
            }

            const filePath = path.join(exportsDir, 'tasks.xlsx')
            await workbook.xlsx.writeFile(filePath)
            return filePath;
        } catch (e) {
            console.log(e.Stack)
            return { erro: "Export task error" }
        }
    },

    Aggregate: async (userId) => {
        try {
            return await Task.aggregate([
                { $match: { userId } },
                { $group: { _id: '$status', count: { $sum: 1 } } },
            ])
        } catch (e) {
            console.log(e.Stack)
            return { erro: "Aggregate task error" }
        }
    },

    Update: async (id, name, description, priority, type, term) => {
        try {
            return await Task.findByIdAndUpdate(id, { name, description, priority, type, term }, { new: true })
        } catch (e) {
            console.log(e.Stack)
            return { erro: "Update task error" }
        }
    },

    Delete: async (id) => {
        try {
            return await Task.findByIdAndDelete(id)
        } catch (e) {
            console.log(e.Stack)
            return { erro: "Delete task error" }
        }
    }
}
