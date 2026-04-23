const adminAuth =  (req, res, next)=>{
  console.log("Authorizition is Checked!");
      const token = "Irfan";
      const isAuthroized = token === "Irfan";
      if(!isAuthroized){
         res.status(401).send("Unauthorized Data"); 
      }else{
         next();
      }
  
};

const userAuth =  (req, res, next)=>{
  console.log("User Authorizition is Checked!");
      const token = "Irfan11";
      const isAuthroized = token === "Irfan";
      if(!isAuthroized){
         res.status(401).send("Unauthorized Data"); 
      }else{
         next();
      }
  
};



module.exports={
   adminAuth,
   userAuth,
}