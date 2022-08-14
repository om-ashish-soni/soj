const { findExistingUserConcrete } = require("../Authentication/findExistingUser")

const userProfile=async (req,res)=>{
    const username=req.body.username;
    const existingUser=await findExistingUserConcrete(username);
    if(!existingUser){
        console.log("in userProfile : ",username,404);
        res.status(404);
        return res.json({
            "accepted":"no",
            "profileData":""
        })
    }
    console.log("in userProfile : ",username,200);
    
    res.status(200)
    return res.json({
        "accepted":"yes",
        "profileData":existingUser
    })
}

module.exports={
    userProfile:userProfile
}