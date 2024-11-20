const AuthController = require("../models/user")
const jwt = require("jsonwebtoken")

module.exports = {
    Register: async (user, password) => {
        try {
            let userCreate = await AuthController.create({ user, password })
            return userCreate
        } catch (e) {
            console.log(e.Stack)
            return { erro: "Register user error" }
        }
    },

    Login: async (user, password) => {
        try {
            let userReturn = await AuthController.findOne({ user })

            if (!userReturn)
                return ({ erro: "AuthController not found" })

            if (password != userReturn.password)
                return ({ erro: "Invalid password" })

            const token = await jwt.sign(
                { id: userReturn._id },
                process.env.JWT_SECRET,
                { expiresIn: 86400 }
            );

            return { token }
        } catch (e) {
            console.log(e.Stack)
            return { erro: "Login error" }
        }
    }
}