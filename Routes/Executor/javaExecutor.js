const { java } = require('compile-run');
const fs=require('fs');
const path=require('path')
const {processor} = require('../Processor/processor')

const javaExecutor=async (dirpath,lang,code,input)=>{

    // console.log("java : ",java);

    let filename='Main.java';
    let filepath=path.join(dirpath,filename);
    fs.writeFileSync(filepath,code);

    let inputFileName='input_java.txt';
    let inputFilePath=path.join(dirpath,inputFileName);
    fs.writeFileSync(inputFilePath,input);

    const command='javac '+filepath;
    const compileResult=await processor(command);
    console.log("compileResult : ",compileResult);
    if(compileResult.stderr){
        fs.unlinkSync(filepath);
        fs.unlinkSync(inputFilePath);
        return {
            output:compileResult.stdout,
            error:compileResult.stderr
        }       
    }
    const runcommand='java Main'+' < '+inputFilePath;
    const result=await processor(runcommand);

    let output=result.stdout;
    let error=result.error;
    
    fs.unlinkSync(filepath);
    fs.unlinkSync(inputFilePath);
    return {
        output:output,
        error:error
    }
}

module.exports={
    javaExecutor:javaExecutor
}