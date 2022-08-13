const {db_con}=require('../Database/service');
const schema=require('../Database/schema');
const {findExistingProblem} = require('./findExistingProblem');
const setProblem=async (req,res)=>{
    const problemcode=req.body.problemcode;
    const isExistingProblem=await findExistingProblem(problemcode);
    if(isExistingProblem==true){
        res.status('409');
        res.json({
            "accepted":"no",
            "error":"conflict occured",
            "msg":"Problem with same problemcode already exist"
        })
        return;
    }

    const newProblem=new schema.Problem(req.body);
    await newProblem.save();
    res.status(201);
    res.json({
        "accepted":"yes",
        "msg":"problem created successfully"
    });
    return ;
    
};

module.exports={
    setProblem:setProblem,
}