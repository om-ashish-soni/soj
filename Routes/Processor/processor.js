const util=require('util');
const fs=require('fs');
const path=require('path');
const exec = util.promisify(require('child_process').exec);

const processor=async (command)=>{
    try{
        const {stdout,stderr}=await exec(command);
        console.log("in processor : ",stdout,stderr);
        return {
            stdout:stdout,
            stderr:stderr
        };
    }catch(err){
        return {
            stdout:'',
            stderr:err.message
        }
    }
    
}
module.exports={
    processor:processor
}