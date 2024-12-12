const {
 
    additem,
    getitem,
    deleteitem,
    updateitem,
    uploadaudio,
}=require('./item.service')
const stringfile = require('./../../config/stringfile')
module.exports={
   
    additem:(req,res)=>{

        additem(req,(err,result)=>{
        if(err){
            res.json({
                'success':"0",
                "message":err,
                "data":[]
            })
        }else{
            res.json({
                'success':"1",
                "message":stringfile.itemaddsuccess,
                "data":result
            })
        }
     })
    },
    getitem:(req,res)=>{

        getitem(req.body,(err,result)=>{
        if(err){
            res.json({
                'success':"0",
                "message":err,
                "data":[]
            })
        }else{
            res.json({
                'success':"1",
                "message":'',
                "data":result
            })
        }
     })
    },
    deleteitem:(req,res)=>{

        deleteitem(req.body,(err,result)=>{
        if(err){
            res.json({
                'success':"0",
                "message":err,
                "data":[]
            })
        }else{
            res.json({
                'success':"1",
                "message":stringfile.itemdelete,
                "data":result
            })
        }
     })
    },
    updateitem:(req,res)=>{

        updateitem(req,(err,result)=>{
        if(err){
            res.json({
                'success':"0",
                "message":err,
                "data":[]
            })
        }else{
            res.json({
                'success':"1",
                "message":stringfile.itemupdatesuccessfuly,
                "data":result
            })
        }
     })
    },
    uploadaudio:(req,res)=>{

        uploadaudio(req,(err,result)=>{
        if(err){
            res.json({
                'success':"0",
                "message":err,
                "data":[]
            })
        }else{
            res.json({
                'success':"1",
                "message":stringfile.itemupdatesuccessfuly,
                "data":result
            })
        }
     })
    }
}
