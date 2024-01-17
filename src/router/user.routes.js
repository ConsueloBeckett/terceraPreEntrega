import express from "express"
import passport from "passport"
import { registerUser, loginUser, logoutUser, handleGitHubCallback } from "../controllers/users.controller.js"
import UserDTO from "../dao/DTOs/user.dto.js"


const userRouter = express.Router()

userRouter.post("/register",
    passport.authenticate("register",
        { failureRedirect: "/failregister" }), registerUser
)

userRouter.get("/failregister", async (req, res) => {
    console.error("Failed Strategy")
    res.send({ error: "Failed" })
})

userRouter.post("/login",
    passport.authenticate("login",
        { failureRedirect: "/faillogin" }), loginUser
)

userRouter.get("/faillogin", async (req, res) => {
    res.send({ error: "Failed Login" })
})

userRouter.get("/logout", logoutUser)

userRouter.get("/github", passport.authenticate("github", { scope: ["user: email"] }), async (req, res) => {
    console.error("Redirecting to GitHub for authentication")
})

userRouter.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), handleGitHubCallback)

userRouter.get("/profile", async (req, res) => {
    try {
        let user = req.session.user

        if (!user || !user.email) {
            res.redirect("/login")
        }
        const userData = {
            email: user.email,
            role: user.role,
        }

        res.render("profile", {
            title: "User profile",
            user: userData
        })
    }
    catch (e) {
        console.error("Error at the rute /profile:", e)
        res.status(500).json(e)
    }
})

userRouter.get("/current", async (req, res) => {
    try {
        let user = req.session.user

        if (!user) {
            res.redirect("/login")
        }
        const userData = {
            name: user.name,
            surname: user.surname,
            email: user.email,
            age: user.age,
            password: user.password,
            cart: user.cart,
            role: user.role
        }

        const userSafe = new UserDTO(userData).toSafeObject()

        res.render("current", {
            title: "Profile user",
            user: userSafe
        })
    }
    catch (e) {
        console.error("Error at the rute /profile:", e)
        res.status(500).json(e)
    }
})

export default userRouter