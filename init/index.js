const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

main()
  .then(() => {
    console.log("Connected to Wanderlust DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Wanderlust");
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:'6a9baf9c714deeaa82cf70ed'}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}
initDB();