const axios = require("axios");
module.exports = async(req,res,next) =>{
    try{
        const profileOptions = {
            headers: {
                Authorization: `Bearer ${req.session.token.access_token}`,
            },
        };
        const profileReq = await axios.get("https://www.mycourseville.com/api/v1/public/users/me" ,profileOptions)
        req.user = profileReq.data.user;
        console.log(req.user);
        next();
    }catch(err){
        console.log(err);
        res.status(401).send("Please Login.");
    }
}