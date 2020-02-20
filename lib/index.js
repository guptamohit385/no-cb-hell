const util = require('util');

module.exports.use = function(...args){
    let basicArgs = [];
    basicArgs.push(args[0])
    basicArgs.push(function (err, res){
        if(err) return console.log(new Error(err))
        else return res
    });

    let newArr = []
    args.forEach((i, ind) => {
        if(ind != 0){
            newArr.push(util.promisify(i))
        }
    });
    reArray(0, newArr, basicArgs)
}

function reArray(len, newArr, argsArr){
    if(len < newArr.length){
        newArr[len].apply(null, [argsArr[0]]).then((f) => {
            argsArr.slice(-1)[0](null, f)
            reArray(len + 1, newArr, argsArr)
        }).catch(x=>{
            argsArr.slice(-1)[0](x, null)
        })
    }
}
