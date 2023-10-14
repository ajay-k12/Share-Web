import jwt from "jsonwebtoken";
import 'dotenv/config'

const auth = (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(' ')[1]
        const SECRET = process.env.SECRET
        let decodeData
        if(token){
            decodeData = jwt.verify(token, SECRET)
            req.userId = decodeData?.id
        }
        next()
    } catch (error) {
        console.log(error);
    }
}

export default auth