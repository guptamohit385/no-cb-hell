const util = require('util');

module.exports.useLast = function(...args){
    let basicArgs = [];
    basicArgs.push(args[0])
    basicArgs.push((err, res) => {
        return err || res;
    });

    let newArr = []
    args.forEach((i, ind) => {
        if(ind != 0 && ind != args.length -1){
            newArr.push(util.promisify(i))
        }

        if(ind == args.length -1){
            basicArgs.push(i)
        }
    });
    reArrayLast(0, newArr, basicArgs)
}

module.exports.use = function(...args){
    let basicArgs = [];
    basicArgs.push(args[0])
    basicArgs.push(function (err, res){
        if(err) return new Error(err)
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

function reArrayLast(len, newArr, argsArr){
    if(len < newArr.length){
        newArr[len].apply(null, [argsArr[0]]).then((f) => {
            if(len == newArr.length -1){
                argsArr[2](null, f)
            }else{
                argsArr[1](null, f)
            }
            reArrayLast(len + 1, newArr, argsArr)
        }).catch(x=>{
            argsArr[2](x, null)
        })
    }
}
