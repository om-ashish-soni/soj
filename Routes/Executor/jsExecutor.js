const {processor} = require('../Processor/processor')
const jsExecutor=async (req,res)=>{
    
    const result=await processor('node try.js');
    console.log(result);
    return result;
}
module.exports={
    jsExecutor:jsExecutor
}