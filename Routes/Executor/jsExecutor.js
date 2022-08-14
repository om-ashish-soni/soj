const {processor} = require('../Processor/processor')
const jsExecutor=async (req,res)=>{
    
    const result=await processor('node try.js');
    console.log(result);
}
module.exports={
    jsExecutor:jsExecutor
}