import jwt from 'jsonwebtoken';
const isAuthenticated = async (req, res, next) => {
    // Grab the token from the header
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(' ')[1];
    // Validate the token
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return false; // So that the flow ends
        }
        else{
            return decoded;
        }
    })
    // If the token is vaid then pass out the user for Authentication
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