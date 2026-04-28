const mongoose = require('mongoose');
const dns = require("dns");
dns.setServers(["8.8.8.8","8.8.4.4"]);

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://namastedev_node:KODHhNTt3HDJtIJm@namastenode.qhgrdcr.mongodb.net/divTinder");
};

module.exports=connectDB
