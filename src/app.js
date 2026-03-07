const express = require('express');

const app = express();


app.get("/user",(req, res)=>{
      res.send({firstname:"Irfan", lastname:"Aziz"});
});
app.post("/user",(req, res)=>{
      res.send("Data successfully save to the database!");
});
app.delete("/user",(req, res)=>{
      res.send("Data deleted");
});

app.use("/test",(req, res)=>{
      res.send("Hello from the server!");
});

// app.use("/hello/2",(req, res)=>{
//       res.send("Hello hello hello! byy irfan");
// });

// app.use("/",(req, res)=>{
//       res.send("namaste from the dashboard");
// });




app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777....");
});