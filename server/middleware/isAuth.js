import jwt from 'jsonwebtoken';
const isAuthenticated = async (req, res, next) => {
    // Grab the token from the header
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(' ')[1];
    // Validate the token
    const verifyToken = jwt.verify(token, 'akhil', (err, decoded) => {
        if(err){
            return false; // So that the flow ends
        }
        else{
            return decoded;
        }
    })
    if(verifyToken){
        req.user = verifyToken.id;
        next();
    }
    else{
        const err = new Error("Token expired, Login again");
        next(err);
    }
}

export default isAuthenticated;