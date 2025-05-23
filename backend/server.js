if(process.env.NODE_ENV!="production"){
    require("dotenv").config()
}
const express=require("express");
const app =express();
const connectDb=require("./config/connectionDb");
const recipeRoute=require("./routes/recipe");
const user=require("./routes/user");
const PORT =process.env.PORT|| 3000;
const cors=require("cors");
connectDb();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/",user);
app.use("/recipe",recipeRoute);
app.get("/",(req,res)=>{
   res.json({message:"hello"});
});
app.listen(PORT,(err)=>{
    console.log(`app is listening on port ${PORT}`);
})