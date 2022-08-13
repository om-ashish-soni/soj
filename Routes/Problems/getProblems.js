const {db_con}=require('../Database/service');
const schema=require('../Database/schema');
const getProblem=async (req,res)=>{
    const problemcode=req.body.problemcode;
    const problem=await schema.Problem.findOne({
        problemcode:problemcode
    })
    if(problem){
        res.status(200);
        res.json({
            "accepted":"yes",
            "problem":problem
        });
        return;
    }
    res.status(404);
    res.json({
        "accepted":"no",
        "error":"not found",
        "msg":"problem with given problemcode was not found"
    });
    return;
    
};
const getProblems=async (req,res)=>{
    
    const problemCriteria=req.body.problemCriteria;
    // console.log(req.body,problemCriteria);
    if(problemCriteria){
        const problemList=await schema.Problem.aggregate([
            {
                $match:problemCriteria
            }
        ])
        return res.json({
            accepted:"yes",
            problemList:problemList
        })
    }
    res.status(424);
    res.json({
        accepted:"no",
        problemList:[],
        error:"problemCriteria does not exist",
        msg:"Please select a valid problemCriteria"
    });
    return;
}
module.exports={
    getProblem:getProblem,
    getProblems:getProblems,
}