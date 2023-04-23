
var admin = require("firebase-admin");

var serviceAccount = require("./Key.json");
const express = require("express");
const cors = require("cors");
const app = express();
const { ok } = require("assert");
var storage  = require('firebase/firestore');


const port = 8080;


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = admin.firestore();


const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/create/Electric_vehicle', async (req, res) => {
  try {
    console.log(req.body);
    const userJson = {
      EV_brand: req.body.EV_brand,
      EV_model: req.body.EV_model,
      // charger_head: req.body.charger_head
    };
    const response = db.collection("Electric_vehicle").add(userJson);
    res.send(response);
  } catch (error) {
    ok
    res.send(error);
  }
});

app.post('/create/Charger_head',  async (req, res) => {
  try {
    console.log(req.body);
    const userJson = {
      // id: req.body.id,
      name_Charger_head: req.body.name_Charger_head,
      name_Charger_type: req.body.name_Charger_type
    
    };
    const response = await db.collection("Charger_head").add(userJson);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

// app.post('/create/Charger_head', async (req, res) => {
//   try {
//     console.log(req.body);
//     const file = req.file;
//     const userJson = {
//       // image: req.body.image,
//       name_Charger_head: req.body.name_Charger_head,
//      name_Charger_type: req.body.name_Charger_type,
//        image_Charger_head: file ? file.originalname : null 
//     };
//     const response = db.collection("Charger_head").add(userJson);
//     res.send(response);
//   } catch (error) {
//     res.send(error);
//   }
// });

app.post('/Charger_type/byid', async (req, res) => {
  const id = req.body.id_Charger_type;
  try {
    const id_Charger_type = id.toString()
    console.log(typeof id)
    const responsetype = db.collection("Charger_type").doc(id_Charger_type);
    const doc = await responsetype.get();
    console.log('Documeny data:', doc.data());
    res.send(doc.data());
  } catch (error) {
    res.send(error);
  }
});

app.post('/create/Charger_type', async (req, res) => {
  console.log(req.body);
  try {
    const userJson1 = {
      id:req.body.id,
      name_Charger_type: req.body.name_Charger_type
    };
    const response = db.collection("Charger_type").add(userJson1);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});


app.post('/create/EV_Charger_station', async (req, res) => {
  try {
    console.log(req.body);
    const userJson1 = {
      id_station: req.body.id_station,
      name_station: req.body.name_station,
      address: req.body.address,
      phone_station: req.body.phone_station,
      statas: req.body.statas,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      image: req.body.image,
      id_Operator: req.body.id_Operator
    };
    const response = db.collection("EV_Charger_station").add(userJson1);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.post('/create/Charger_station_service', async (req, res) => {
  try {
    console.log(req.body);
    const userJson1 = {
      name_service: req.body.name_service
    };
    const response = db.collection("Charger_station_service").add(userJson1);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.post('/create/facilities', async (req, res) => {
  try {
    console.log(req.body);
    const userJson = {
      name_facilities: req.body.name_facilities
    };
    const response = db.collection("facilities").add(userJson);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.post('/create/user', async (req, res) => {
  try {
    console.log(req.body);
    const userJson = {
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      village: req.body.village,
      road: req.body.road,
      input_province: req.body.input_province,
      input_amphoe: req.body.input_amphoe,
      input_tambon: req.body.input_tambon,
      input_zipcode: req.body.input_zipcode,
      email: req.body.email,
      password: req.body.password
    };
    const response = await db.collection("user").add(userJson);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});


//read
app.get('/read/all/Electric_vehicle', async (req, res) => { //เอาข้อมูลออกมาโชว์ทั้งหมด
  try {
    let responseArrev = [];
    const Electric_vehicleRef = db.collection("Electric_vehicle")
    const responseev = await Electric_vehicleRef.get();
    responseev.forEach(doc => {
      responseArrev.push({
        "id" : doc.id,
        "data": doc.data()
      })
    });
    res.send({ "responseArrev": responseArrev });
  } catch (error) {
    res.send(error);
  }
});

app.get('/read/all/Charger_head', async (req, res) => { //เอาข้อมูลออกมาโชว์ทั้งหมด
  try {
    let responseArrhead = [];
    const Charger_headRef = db.collection("Charger_head")
    const responsehead = await Charger_headRef.get();
   
    responsehead.forEach(doc => {
      responseArrhead.push({
        "id" : doc.id,
        "data": doc.data()
      })
    });
    res.send({ "responseArrhead": responseArrhead });
  } catch (error) {
    res.send(error);
  }
});

app.get('/read/all/Charger_type', async (req, res) => { //เอาข้อมูลออกมาโชว์ทั้งหมด
  try {
    let responseArrtype = [];

    const Charger_typeRef = db.collection("Charger_type")
    const responsetype = await Charger_typeRef.get();
    responsetype.forEach(doc => {
      responseArrtype.push({
        "id" : doc.id,
        "data": doc.data()
      })
    });
    res.send({ "responseArrtype": responseArrtype });
  } catch (error) {
    res.send(error);
  }
});

app.get('/read/all/EV_Charger_station', async (req, res) => { //เอาข้อมูลออกมาโชว์ทั้งหมด
  try {
    let responseArrstationRef = [];
    const EV_Charger_stationRef = db.collection("EV_Charger_station")
    const responsestationRef = await EV_Charger_stationRef.get();
    responsestationRef.forEach(doc => {
      responseArrstationRef.push ({
      "id" : doc.id,
      "data": doc.data()
    })
    });
    res.send({ "responseArrstationRef": responseArrstationRef });
  } catch (error) {
    res.send(error);
  }
});


app.get('/read/all/Charger_station_service', async (req, res) => {
  try {
    let responseArrservice = [];

    const Charger_station_serviceRef = db.collection("Charger_station_service")
    const responseservice = await Charger_station_serviceRef.get();
    responseservice.forEach(doc => {
      responseArrservice.push({
        "id" : doc.id,
        "data": doc.data()
      })
    });
    res.send({ "responseArrservice": responseArrservice });
  } catch (error) {
    res.send(error);
  }
});

app.get('/read/all/facilities', async (req, res) => {
  try {
    let responseArrfacilitiesRef = [];

    const facilitiesRef = db.collection("facilities")
    const responsefacilitiesRef = await facilitiesRef.get();
    responsefacilitiesRef.forEach(doc => {
      responseArrfacilitiesRef.push({
        "id" : doc.id,
        "data": doc.data()
      })
    });
    res.send({ "responseArrfacilitiesRef": responseArrfacilitiesRef });
  } catch (error) {
    res.send(error);
  }
});

app.get('/read/:id', async (req, res) => { //แสดงตามไอดี
  try {
    const typeRef = db.collection("type").doc(req.params.id);
    const response = await typeRef.get();
    res.send(response.data());
  } catch (error) {
    res.send(error);
  }
});

app.get('/read/all/Charger_type', async (req, res) => { //เอาข้อมูลออกมาโชว์ทั้งหมด
  try {
    let responseArrtype = [];

    const Charger_typeRef = db.collection("Charger_type")
    const responsetype = await Charger_typeRef.get();
    responsetype.forEach(doc => {
      responseArrtype.push({
        "id" : doc.id,
        "data": doc.data()
      })
    });
    res.send({ "responseArrtype": responseArrtype });
  } catch (error) {
    res.send(error);
  }
});

app.get('/read/all/user', async (req, res) => {
  try {
    let responseArruser = [];

    const userRef = db.collection("user")
    const responseuserRef = await userRef.get();
    responseuserRef.forEach(doc => {
      responseArruser.push({
        "id" : doc.id,
        "data": doc.data()
      })
    });
    res.send({ "responseArruser": responseArruser });
  } catch (error) {
    res.send(error);
  }
});

//update
app.post('/update/Electric_vehicle', async (req, res) => { //เอาข้อมูลออกมาโชว์ทั้งหมด
  try {
    const id = req.body.id;
    const EV_brand = req.body.EV_brand
    const EV_model = req.body.EV_model
    const EVRef = await db.collection("Electric_vehicle").doc(id)
      .update({
        EV_brand: EV_brand,
        EV_model: EV_model
      });
    res.send(EVRef);
  } catch (error) {
    res.send(error);
  }
});

app.post('/update/Charger_head', async (req, res) => { //เอาข้อมูลออกมาโชว์ทั้งหมด
  try {
    const id = req.body.id;
    const name_Charger_head = req.body.name_Charger_head
    const name_Charger_type = req.body.name_Charger_type
    const image_Charger_head = req.body.image_Charger_head
    const headRef = await db.collection("Charger_head").doc(id)
      .update({
        name_Charger_head: name_Charger_head,
        name_Charger_type: name_Charger_type,
        image_Charger_head:image_Charger_head
       
      });
    res.send(headRef);
  } catch (error) {
    res.send(error);
  }
});

app.post('/update/Charger_type', async (req, res) => { //เอาข้อมูลออกมาโชว์ทั้งหมด
  try {
    
    const name_Charger_type = req.body.name_Charger_type
    const typeRef = await db.collection("Charger_type").doc(id)
      .update({
        name_Charger_type: name_Charger_type

      });
    res.send(typeRef);
  } catch (error) {
    res.send(error);
  }
});

app.post('/update/EV_Charger_station', async (req, res) => { //เอาข้อมูลออกมาโชว์ทั้งหมด
  try {
    const id = req.body.id;
    // const id = req.body.id_facilities.toString(); 
    const id_station = req.body.id_station
    const name_station = req.body.name_station
    const address = req.body.address
    const phone_station = req.body.phone_station
    const statas = req.body.statas
    const latitude = req.body.latitude
    const longitude = req.body.longitude
    const image = req.body.image
    const id_Operator = req.body.id_Operator
    const stationRef = await db.collection("EV_Charger_station").doc(id)
      // const responsefacilitiesRef = await facilitiesRef.get();
      .update({
        id_station: id_station,
        name_station: name_station,
        address: address,
        phone_station: phone_station,
        statas: statas,
        latitude: latitude,
        longitude: longitude,
        image: image,
        id_Operator: id_Operator

      });
    res.send(stationRef);
  } catch (error) {
    res.send(error);
  }
});

app.post('/update/Charger_station_service', async (req, res) => { //เอาข้อมูลออกมาโชว์ทั้งหมด
  try {
    const id = req.body.id;
    const name_service = req.body.name_service
    const responseservice = await db.collection("Charger_station_service").doc(id)
      .update({
        name_service: name_service
      });
    res.send(responseservice);
  } catch (error) {
    res.send(error);
  }
});



app.post('/update/facilities', async (req, res) => { //เอาข้อมูลออกมาโชว์ทั้งหมด
  try {
    const id = req.body.id;
    const name_facilities = req.body.name_facilities
    const facilitiesRef = await db.collection("facilities").doc(id)
      .update({
        name_facilities: name_facilities
      });
    res.send(facilitiesRef);
  } catch (error) {
    res.send(error);
  }
});


//delate
app.delete('/delete/Electric_vehicle', async (req, res) => {
  try {
    const id = req.body.id;
    const Electric_vehicleRef = await db.collection("Electric_vehicle").doc(id).delete();
    res.send(Electric_vehicleRef);
  } catch (error) {
    res.send(error);
  }
});

app.delete('/delete/Charger_head', async (req, res) => {
  try {
    const id = req.body.id;
    const Charger_headRef = await db.collection("Charger_head").doc(id).delete();
    res.send(Charger_headRef);
  } catch (error) {
    res.send(error);
  }
});

app.delete('/delete/Charger_type', async (req, res) => {
  try {
    const id = req.body.id;
    const Charger_typeRef = await db.collection("Charger_type").doc(id).delete();
    res.send(Charger_typeRef);
  } catch (error) {
    res.send(error);
  }
});

app.delete('/delete/EV_Charger_station', async (req, res) => {
  try {
    const id = req.body.id;
    const EV_Charger_stationRef = await db.collection("EV_Charger_station").doc(id).delete();
    res.send(EV_Charger_stationRef);
  } catch (error) {
    res.send(error);
  }
});

app.delete('/delete/Charger_station_service', async (req, res) => {
  try {
    // const id = req.params.id;
    const id = req.body.id;
    const Charger_station_serviceRef = await db.collection("Charger_station_service").doc(id).delete();
    res.send(Charger_station_serviceRef);
  } catch (error) {
    res.send(error);
  }
});


app.delete('/delete/facilities', async (req, res) => {
  try {
     const id = req.body.id;
    // const id = req.body.id_facilities.toString();
    const facilitiesRef = await db.collection("facilities").doc(id).delete();
    res.send(facilitiesRef);
  } catch (error) {
    res.send(error);
  }
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


