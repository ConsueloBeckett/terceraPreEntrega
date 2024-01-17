import userModel from "../dao/mongo/user.model.js"

class UserRepository extends userModel {
    constructor() {
        super()
    }

    findUser = async (email) => {
        try {
            const user = await userModel.findOne({ email }, { email: 1, password: 1, role: 1, name: 1, surname: 1 })
            if (!user) {
                return "User not found"
            }
            return user;
        } catch (e) {
            console.error("Error finding user: ", e)
            return e
        }}

    addUser = async (user) => {
        try {
            const newUser = await userModel.create(user)
            return newUser
        } catch (e) {
            console.error("Error to addd user: ")
            return e
        }}

    obtainUsers = async () => {
        try {
            const users = await userModel.find()
            return users
        } catch (e) {
            console.error("Error to obtain users: ")
            return error
        }}

    obtainUserById = async (id) => {
        try {
            const user = await userModel.findById(id)
            return user
        } catch (e) {
            console.error("Error to obtain user by id: ")
            return e
        }}

    updateUser = async (id, user) => {
        try {
            const updatedUser = await userModel.findByIdAndUpdate(id, user)
            return updatedUser
        } catch (e) {
            console.error("Error to update user: ")
            return e
        }}

    deleteUser = async (id) => {
        try {
            const deletedUser = await userModel.findByIdAndDelete(id)
            return deletedUser
        } catch (e) {
            console.error("Error to deleted user: ")
            return e
        }}

    validateUser = async (email, password) => {
        try {
            const user = await userModel.findOne({ email: email, password: password })
            return user;
        }
        catch (error) {
            console.error("Error to validate user: ")
            return error
        }}


    findEmail = async (param) => {
        try {
            //decia user lo cambie por email
            const email = await userModel.findOne(param)
            return email
        } catch (e) {
            console.error("Error finding email: ", e)
            return error
        }
    }

    obtainUserByEmail = async (email) => {
        try {
            const user = await userModel.findOne({ email: email })
            return user
        } catch (e) {
            console.error("Error obtain user by  email: ")
        }}
}

export default UserRepository