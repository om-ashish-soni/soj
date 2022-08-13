const util=require('util');
const fs=require('fs');
const path=require('path');
const { platform } = require('process');
const { processor } = require('../Processor/processor');
const child_process=require('child_process');
const exec = util.promisify(child_process.exec);

const cppExecutor=async (dirpath,lang,code,input)=>{
    
    console.log("in cpp executor");
    let sourceFileName="main.cpp";
    let sourceFilePath=path.join(dirpath,sourceFileName);
    fs.writeFileSync(sourceFilePath,code);

    let inputFileName="input_cpp.txt";
    let inputFilePath=path.join(dirpath,inputFileName);
    fs.writeFileSync(inputFilePath,input);

    let executableFilePath="";
    if(platform != 'win32'){
        executableFilePath=path.join(dirpath,'a.out');
    }else{
        executableFilePath=path.join(dirpath,'a.exe');
    }

    const compileCommand=`g++ ${sourceFilePath} -o ${executableFilePath}`;
    const compileResult=await processor(compileCommand);
    let compileOutput=compileResult.stdout;
    let compileError=compileResult.stderr;
    console.log("compile output : ",compileOutput);
    console.log("compile error : ",compileError);
    let compileErrorList=compileError.split(sourceFilePath);
    console.log(compileErrorList);
    let compileTimeError=compileErrorList.join(' ');
    // let compileErrorList=compileError.split('\n');
    // console.log(compileErrorList);
    if(compileTimeError){
        if(fs.existsSync(sourceFilePath)) fs.unlinkSync(sourceFilePath);
        if(fs.existsSync(inputFilePath)) fs.unlinkSync(inputFilePath);
        console.log("compileTimeError occured")
        return {
            output:compileTimeError,
            error:'compile time error'
        }
    }
    console.log("normal compiled");

    

    // console.log('executableFilePath : ',executableFilePath);
    const runtimeOutput=child_process.execFileSync(executableFilePath,{input:input}).toString();
    return {
        "output":runtimeOutput
    }
    
}
module.exports={
    cppExecutor:cppExecutor
}