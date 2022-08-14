
const fs=require('fs');
const path=require('path')
const {processor} = require('../Processor/processor')

const pythonExecutor=async (dirpath,lang,code,input)=>{
    
    let filename='main.py'
    let filepath=path.join(dirpath,filename);
    fs.writeFileSync(filepath,code);

    
    let inputFileName='input_py.txt';
    let inputFilePath=path.join(dirpath,inputFileName);
    fs.writeFileSync(inputFilePath,input);

    const command='python '+filepath+' < '+inputFilePath;
    const result=await processor(command);

    console.log("result : ",result);

    fs.unlinkSync(filepath);
    fs.unlinkSync(inputFilePath);
    return {
        output:result.stdout,
        error:result.stderr
    }
}

module.exports={
    pythonExecutor:pythonExecutor
}