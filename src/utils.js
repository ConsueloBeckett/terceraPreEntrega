import path from "path"
import { fileURLToPath } from "url"
import bcrypt from "bcrypt"

export const hashPass = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const validPass = (user, password) => {
    try {
        console.log("Password from user:", user.password)
        console.log("Provided password:", password);
        return bcrypt.compareSync(password, user.password)
    } catch (e) {
        console.error("Error in validPass:", e)
        return false;
    }}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default __dirname
