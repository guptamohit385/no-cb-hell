let unhell = require("../lib/index")

function name(params, next) {
    setTimeout(() => {
        console.log("name", params)
        params.demo = 100;
        return next(null, "success")
    }, 3000)
}

function checkName(params, next) {
    setTimeout(() => {
        console.log("checkName", params)
        params.myName = "ankit";
        return next(null, "success")
    }, 600)
}

function check2Name(params, next) {
    setTimeout(() => {
        console.log("check2Name", params)
        params.age = 100;
        return next(null, "succes2")
    }, 800)
}

function check3Name(params, next) {
    setTimeout(() => {
        console.log("check3Name", params)
        params.work = "harder";
        return next(null, "success3")
    }, 30)
}

function respHandler(params){
    if(params.demo == 100){
        console.log("respHandler", params)
        console.log("send response for success")
    }else{
        console.log("send response for failed")
    }
}

unhell.use({value:10}, name, checkName, check2Name, check3Name, respHandler)