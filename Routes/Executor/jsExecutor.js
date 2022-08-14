
const child_process=require('child_process')
const fs=require('fs');
const path=require('path')
const {processor} = require('../Processor/processor')
const jsExecutor=async (dirpath,lang,code,input)=>{
    let filename='main.js';
    let filepath=path.join(dirpath,filename);
    fs.writeFileSync(filepath,code);
    
    let inputFileName='input_js.txt';
    let inputFilePath=path.join(dirpath,inputFileName);
    fs.writeFileSync(inputFilePath,input);
    
    let command='node '+filepath + ' < '+inputFilePath;
    let result=await processor(command);
    
    let output=result.stdout.toString();
    let error=result.stderr.toString();
    
    return {
        output:output,
        error:error
    }
    // const result=await processor('node try.js')
    // console.log(result);
    // return result;
}
module.exports={
    jsExecutor:jsExecutor
}