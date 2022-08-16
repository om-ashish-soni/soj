const util=require('util');
const fs=require('fs');
const path=require('path');
const {performance} = require('perf_hooks');

const exec    = util.promisify(require('child_process').exec);

// const exec=require('child_process').exec;
// const setTimeout= util.promisify(require('timers').setTimeout);

const boundedProcessor=async (command,timelimit=5000,memorylimit=1048576)=>{
    console.log(": limits :: ",timelimit,memorylimit,"+++++++++++++")
    let safeTimelimit=timelimit*1.5;
    let safeMemorylimit=memorylimit*1.5;
    try{
        const options={
            timeout:safeTimelimit,
            maxBuffer:safeMemorylimit
        }
        const startTime=performance.now();
        let endTime=-1;
        const {stdout,stderr}=await exec(command,options);
        endTime=performance.now();

        return {
            stdout:stdout,
            stderr:stderr,
            executionTime:endTime-startTime
        };
    }catch(err){
        console.log("error in boundedProcessor : ",err)
        return {
            stdout:'',
            stderr:err.message,
            stderrdetail:err,
            
        }
    }
    
}
module.exports={
    boundedProcessor:boundedProcessor
}