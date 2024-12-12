const {login}=require('./admin.service')
const stringfile = require('./../../config/stringfile')
module.exports={
    login:(req,res)=>{
        var body =req.body
     login(body,(err,result)=>{
        if(err){
            res.json({
                'success':"0",
                "message":err,
                "data":[]
            })
        }else{
            res.json({
                'success':"1",
                "message":stringfile.loginsuccess,
                "data":result
            })
        }
     })
    }
}
