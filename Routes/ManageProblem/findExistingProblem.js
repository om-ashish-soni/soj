const { db_con } = require('../Database/service');
const schema = require('../Database/schema');
const findExistingProblem = async (problemcode) => {
    const existingProblems = await schema.Problem.aggregate([
        {
            $match:{
                problemcode: problemcode
            }
        }
    ])
    return existingProblems.length > 0;
}

module.exports = {
    findExistingProblem: findExistingProblem,
}