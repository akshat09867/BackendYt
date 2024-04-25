class apires{
    constructor(
        statuscode,data="",
    message="success"     
        ){
            this.statuscode=statuscode
            this.data=data
            success=statuscode<400
            this.message=message
        }
}
export {apires}