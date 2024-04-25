class apierr extends Error{
    constructor(
        statuscode,message="something went wrong",
              stack=[],
        error=[]
    ){
        this.statuscode=statuscode
        super(message)
        this.error=error
        this.success=false
        data=null
        if(stack) this.stack=stack
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}
export {apierr}