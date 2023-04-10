const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const mongoDB = "mongodb+srv://new_CSV:new_CSV@cluster0.gbjrkub.mongodb.net/?retryWrites=true&w=majority"; 
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log('connected');
}
//mongodb://127.0.0.1/my_signin