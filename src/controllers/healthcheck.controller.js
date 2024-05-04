import {asychan} from "../utils/asynchandler.js"
import {apires} from "../utils/apires.js"
const healthcheck=asychan((req,res)=>{
    return res
    .status(200)
    .json(
        new apires(200,"working nice!!")
    )
})