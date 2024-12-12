const connection = require('./../../config/database')
const stringfile = require('./../../config/stringfile')
// const main = async ()=>{
//     let data =await db()
//     data =await data.find().toArray()
//     console.log(data)
// }

// const insertdata =async ()=>{
//     const collection = await db()
//     data =await collection.find().toArray()
//     let result = await collection.insertMany([{
//        name:"pradip",
//        sirname:"parmar",
//        no:"12332"
//     }])
//     console.log(result)
// }
// const deletes = async ()=>{
//     let collection =await db() 
//     data = await collection.deleteMany({name:"pradip"})
//     console.log(data)
// }
// // main()
// // insertdata()
// deletes()
module.exports = {
    login: async (data, callback) => {
      console.log(data)
        let db =await connection()
        const collection =  db.collection('admin')
        var result =await collection.find({username:data.username,password:data.password}).toArray()
          if(result.length>0){
            callback(null,result)
          }else{
            callback(stringfile.inavaliduser)
          }
    }
}