const mongoose=require('mongoose');
const connection=mongoose.createConnection('mongodb://localhost:27017/rasta_ai')
.on('open',()=>
{
    console.log("mongo db connected");
}).on('error',()=>
{
    console.log("mongo db connection error");

});

module.exports=connection;