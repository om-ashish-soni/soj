const fs=require('fs')
const upsertDir=async (dirpath)=>{
    if(fs.existsSync(dirpath)){
        console.log("in upsertDir : ",dirpath," already exist")
        return dirpath;
    }
    fs.mkdirSync(dirpath);
    console.log("in upsertDir created dir : ",dirpath);
    return dirpath;
}
module.exports={
    upsertDir:upsertDir
}