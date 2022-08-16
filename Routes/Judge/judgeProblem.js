const executor = require("../Executor/executor");
const {languageExecutor} = require("../Executor/languageExecutor");
const {findExistingUserConcrete}=require('../Authentication/findExistingUser')
const { findExistingProblemConcrete } = require("../ManageProblem/findExistingProblem");
const {upsertDir}=require('../fileManagement/upsertDir');
const {comparator} = require("../Comparator/comparator");

const judgeProblem=async (req,res)=>{
    const username=req.body.username;
    const existingUser=await findExistingUserConcrete(username);
    const userdirpath=await upsertDir(existingUser.userdirpath);

    const problemcode=req.body.problemcode;
    const problem=await findExistingProblemConcrete(problemcode);
    console.log("judgeProblem : ",problemcode,username,userdirpath);
    // console.log("problem : ",problem)
    const input=problem.input;

    const lang=req.body.lang;
    const code=req.body.code;
    let timelimit=(problem.timelimit)?(problem.timelimit):(5000);
    let memorylimit=(problem.memorylimit)?(problem.memorylimit):(1048576);


    const result=await languageExecutor(userdirpath,lang,code,input,timelimit,memorylimit);

    console.log('result in judge : ',result);

    if(result.error){
        res.status(400)
        return res.json({
            "status":"ERROR",
            "msg":"error occured in program",
            "output":"",
            "error":result.error
        })
    }
    const userOutput=result.output;
    const correctOutput=problem.output;

    const matchResult=await comparator(userOutput,correctOutput);

    res.json({
        result:matchResult
    })
    
}

module.exports={
    judgeProblem:judgeProblem
}