# unhell  (Powered by kvertex.com)
this is the package to save coders from callback hell. 

## Understanding

This is the simple solution without using promise or modularization techniques. Simple to write and easy to understand and implement

## Example

```
let unhell = require("unhell")

/*
 * any function which has blocking code
 */
function name(params, next) {
    setTimeout(() => {
        console.log("name", params)
        params.demo = 100;
        return next(null, "success")
    }, 3000)
}

/*
 * any function which has blocking code
 */
function checkName(params, next) {
    setTimeout(() => {
        console.log("checkName", params)
        params.myName = "ankit";
        return next(null, "success")
    }, 600)
}

/**
 * @param {*} params 
 * respHandler is function for final response handling (optional)
 */
function respHandler(params){
    if(params.demo == 100){
        console.log("respHandler", params)
        console.log("send response for success")
    }else{
        console.log("send response for failed")
    }
}

/**
 * execute unhell.use with first argument as function input values or can be json input
 */

 let params = {value:10} // supports string, int, json .. all type

unhell.use(params, name, checkName, respHandler)


/**
 * @param {*} params 
 * respHandler is function for final response handling (optional)
 * function(err, success){} - callback function for final output
 */
function respHandlerLast(params, function(err, success){
    if(err) throw new Error(err);
    else console.log(success)
})


unhell.useLast(params, name, checkName, respHandlerLast)

```