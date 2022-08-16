
const child_process=require('child_process')
const fs=require('fs');
const path=require('path');
const { performance } = require('perf_hooks');
const {boundedProcessor} = require('../Processor/boundedProcessor');
const {processor} = require('../Processor/processor')
const jsExecutor=async (dirpath,lang,code,input)=>{
    let filename='main.js';
    let filepath=path.join(dirpath,filename);
    fs.writeFileSync(filepath,code);
    
    let inputFileName='input_js.txt';
    let inputFilePath=path.join(dirpath,inputFileName);
    fs.writeFileSync(inputFilePath,input);
    
    let command='node '+filepath + ' < '+inputFilePath;
    // let result=await processor(command);
    let startTime=performance.now();
    let result=await boundedProcessor(command);
    let endTime=performance.now();

    let executionTime=endTime-startTime;

    let output=result.stdout.toString();
    let error=result.stderr.toString();
    
    fs.unlinkSync(filepath);
    fs.unlinkSync(inputFilePath);
    return {
        output:output,
        error:error,
        executionTime:executionTime
    }
    // const result=await processor('node try.js')
    // console.log(result);
    // return result;
}
module.exports={
    jsExecutor:jsExecutor
}