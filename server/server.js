const sendSms = require("./send.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors=require("cors")
const mongoose = require("mongoose");
const fs=require('fs')
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
mongoose.connect("mongodb://localhost:27017/bulksms").then(()=>
  console.log("Conneted with MongoDB")

).catch((e)=>{
  console.error("Error:", e);
})
const newSchema = new mongoose.Schema({
  masking: {
    type: String,
    required: true,
  },
  sms: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  schedule_time: {
    type: String,
    required: true,
  },
});
const collection=mongoose.model("collection",newSchema)
module.exports=collection

app.get("/",cors(),(req,res)=>{

})
app.post("/",async(req,res)=>{
  const { formData } = req.body;

  const numarr = formData.number.split(",");
  const newSMS = new collection(formData);
  var date=formData.schedule_time
  date = new Date(date).toISOString();
  const config = {
    domain: "6jk3e8.api.infobip.com",
    apiKey:
      "657f8f1d88fd3743843ca8db37f35add-f8f3ccce-4a0a-4342-9523-dc9336b52465",
  };
  app.post("/delivery-report", (req, res) => {
    // Process the delivery report
    const deliveryReport= req.body;
    // Process the delivery report status
    delreport = JSON.stringify(deliveryReport);
    console.log("Delivery report: ",deliveryReport);
     fs.writeFile("DeliveryReport.txt", delreport, (err) => {
       // In case of a error throw err.
       if (err) throw err;
     });
    res.json(deliveryReport);
  });

  sendSms(config, numarr, formData.sms, date, formData.masking)
  .then((result) => console.log(result));

  // Save the user data to the database
//   res.send("posted");
  await newSMS.save();

})


app.listen(5000,()=>{
  console.log("Server is running on 5000");
})



