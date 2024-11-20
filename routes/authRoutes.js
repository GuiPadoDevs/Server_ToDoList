const express = require("express")

const route = express.Router()

const User = require("../controllers/authController")

route.post("/register", async (req, res) => {
    const { user, password, confirm } = req.body

    if (user == "" || user == undefined)
        return res.send({ erro: "User can't null." })

    if (password == "" || password == undefined)
        return res.send({ erro: "Password can't null." })

    if (confirm == "" || confirm == undefined)
        return res.send({ erro: "Confirm can't null" })

    if (confirm != password)
        return res.send({ erro: "Password and Confirm is different" })

    var returnAPI = await User.Register(user, password)
    return res.send(returnAPI)
})

route.post("/login", async (req, res) => {
    const { user, password } = req.body

    if (user == "" || user == undefined)
        return res.send({ erro: "User can't null." })

    if (password == "" || password == undefined)
        return res.send({ erro: "Password can't null." })

    var returnAPI = await User.Login( user, password )
    return res.send( returnAPI )
})

route.get("/login", async (req, res) => {
    res.send("Hi!")
})

module.exports = route;
