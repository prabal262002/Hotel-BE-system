const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const { initializeDB } = require("./db/db.connect");

const Hotel = require("./models/hotels.model");
const express = require("express")
const app = express();
require("dotenv").config();
app.use(express.json());

initializeDB();

// const newHotel = {
//   name: "New Hotel",
//   category: "Mid-Range",
//   location: "123 Main Street, Frazer Town",
//   rating: 4.0,
//   reviews: [],
//   website: "https://hotel-example.com",
//   phoneNumber: "+1234567890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "12:00 PM",
//   amenities: ["Laundry", "Room Service"],
//   priceRange: "$$$ (31-60)",
//   reservationsNeeded: true,
//   isParkingAvailable: true,
//   isWifiAvailable: true,
//   isPoolAvailable: false,
//   isSpaAvailable: false,
//   isRestaurantAvailable: true,
//   photos: ["https://example.com/hotel-photo1.jpg", "https://example.com/hotel-photo2.jpg"],
// };
const newHotel = {
  name: "Lake View",
  category: "Mid-Range",
  location: "124 Main Street, Anytown",
  rating: 3.2,
  reviews: [],
  website: "https://lake-view-example.com",
  phoneNumber: "+1234555890",
  checkInTime: "2:00 PM",
  checkOutTime: "12:00 PM",
  amenities: ["Laundry", "Boating"],
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isParkingAvailable: false,
  isWifiAvailable: true,
  isPoolAvailable: false,
  isSpaAvailable: false,
  isRestaurantAvailable: false,
  photos: ["https://example.com/hotel1-photo1.jpg", "https://example.com/hotel1-photo2.jpg"],
};
const newHotel1 = {
  name: "Sunset Resort",
  category: "Resort",
  location: "12 Main Road, Anytown",
  rating: 4.0,
  reviews: [],
  website: "https://sunset-example.com",
  phoneNumber: "+1299655890",
  checkInTime: "2:00 PM",
  checkOutTime: "11:00 AM",
  amenities: ["Room Service", "Horse riding", "Boating", "Kids Play Area", "Bar"],
  priceRange: "$$$$ (61+)",
  reservationsNeeded: true,
  isParkingAvailable: true,
  isWifiAvailable: true,
  isPoolAvailable: true,
  isSpaAvailable: true,
  isRestaurantAvailable: true,
  photos: ["https://example.com/hotel2-photo1.jpg", "https://example.com/hotel2-photo2.jpg"],
};
async function createHotel(newHotel){
    try{
        const hotel = new Hotel(newHotel);
        const saveData = await hotel.save();
        // console.log("New hotel data :",saveData.name);
        return saveData;
    }catch(err){
        throw err;
    }
}

const readAllHotels = async()=>{
    try{
        const data = await Hotel.find();
        // console.log(data);
        return data;
    }catch(err){
        console.log(err);
    }
}
const readByName = async(hotelName)=>{
    try{
        const data = await Hotel.find({name:hotelName});
        // console.log(data);
        return data;
    }catch(err){
        console.log(err);
    }
}
const readByParking = async(hotelName)=>{
    try{
        const data = await Hotel.find({isParkingAvailable:true});
        console.log(data);
    }catch(err){
        console.log(err);
    }
}
// createHotel(newHotel1);
// readAllHotels();
// readByName("Lake View");
// readByParking();

const readByRestaurant = async () => {
    try {
        const data = await Hotel.find({ isRestaurantAvailable: true });
        console.log(data);
    } catch(err) {
        console.log(err);
    }
}
// readByRestaurant();

const readByCategory = async (hotelCategory) => {
    try {
        const data = await Hotel.find({ category: hotelCategory });
        // console.log(data);
        return data;
    } catch(err) {
        console.log(err);
    }
}
// readByCategory("Mid-Range");

const readByPriceRange = async (price) => {
    try {
        const data = await Hotel.find({ priceRange: price });
        console.log(data);
    } catch(err) {
        console.log(err);
    }
}
// readByPriceRange("$$$$ (61+)");

const readByRating = async (hotelRating) => {
    try {
        const data = await Hotel.find({ rating: hotelRating });
        // console.log(data);
        return data;
    } catch(err) {
        console.log(err);
    }
}
// readByRating(4.0);

const readByPhoneNumber = async (phone) => {
    try {
        const data = await Hotel.findOne({ phoneNumber: phone });
        // console.log(data);
        return data;
    } catch(err) {
        console.log(err);
    }
}
// readByPhoneNumber("+1299655890");

const findByID = async (id, dataUpdated)=>{
    try{
        const updatedData = await Hotel.findByIdAndUpdate(id,dataUpdated,{new:true});
        console.log(updatedData);
    }catch(err){
        throw err;
    }
}

// findByID('6a64db66317b542cc100f58d',{checkOutTime: "11:00 AM"});

const findByName = async (name, dataUpdated)=>{
    try{
        const updatedData = await Hotel.findOneAndUpdate({name},dataUpdated,{new:true});
        console.log(updatedData);
    }catch(err){
        throw err;
    }
}

// findByName("Sunset Resort",{rating:4.2});

const findByNumber = async (number, dataUpdated)=>{
    try{
        const updatedData = await Hotel.findOneAndUpdate({phoneNumber: number},dataUpdated,{new:true});
        console.log(updatedData);
    }catch(err){
        throw err;
    }
}

// findByNumber("+1299655890",{phoneNumber:"+1997687392"});

const deleteById = async (id)=>{
    try{
        const deletedData = await Hotel.findByIdAndDelete(id);
        console.log("Deleted Data : ",deletedData);
    }catch(err){
        throw err;
    }
}

// deleteById("6a64db66317b542cc100f58d");

const deleteHotelByName = async (name)=>{
    try{
        const deletedData = await Hotel.findOneAndDelete({name});
        console.log("Deleted Data : ",deletedData);
    }catch(err){
        throw err;
    }
}

// deleteHotelByName("Lake View");

const PORT = process.env.PORT || 6000;
app.listen(PORT, ()=>{
    console.log(`Server is running on Port - ${PORT}`);
})

app.get("/hotels", async (req,res)=>{
    try{
        const data = await readAllHotels();
        if(data.length!=0){
            res.json(data);
        }else{
            res.status(400).json({error:`Error reading the hotels`})
        }
    }catch(error){
        res.status(400).json({error:`Failed!! - ${error}`})
    }
})

app.get("/hotels/:hotelName", async (req,res)=>{
    try{
        const data = await readByName(req.params.hotelName);
        console.log("Data length - ",data.length);
        
        if(data.length!=0){
            res.json(data);
        }else{
            res.status(400).json({error:`Error reading the hotels`})
        }
    }catch(error){
        res.status(400).json({error:`Failed!! - ${error}`})
    }
})

app.get("/hotels/directory/:phoneNumber", async (req,res)=>{
    try{
        const data = await readByPhoneNumber(req.params.phoneNumber);
        
        if(data){
            res.json(data);
        }else{
            res.status(400).json({error:`Error reading the hotels`})
        }
    }catch(error){
        res.status(400).json({error:`Failed!! - ${error}`})
    }
})

app.get("/hotels/rating/:hotelRating", async (req,res)=>{
    try{
        const data = await readByRating(req.params.hotelRating);
        console.log("Data length - ",data.length);
        
        if(data.length!=0){
            res.json(data);
        }else{
            res.status(400).json({error:`Error reading the hotels`})
        }
    }catch(error){
        res.status(400).json({error:`Failed!! - ${error}`})
    }
})

app.get("/hotels/category/:hotelCategory", async (req,res)=>{
    try{
        const data = await readByCategory(req.params.hotelCategory);
        console.log("Data length - ",data.length);
        
        if(data.length!=0){
            res.json(data);
        }else{
            res.status(400).json({error:`Error reading the hotels`})
        }
    }catch(error){
        res.status(400).json({error:`Failed!! - ${error}`})
    }
})


app.post("/hotels", async (req, res) => {
  try {
    const savedHotel = await createHotel(req.body)
    res.status(201).json({ message: "Hotel added successfully.", newHotel: savedHotel })
  } catch (error) {
    res.status(500).json({ error: `Failed to add hotel - ${error}` })
  }
})

async function deleteHotel(hotelId) {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
        return deletedHotel;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

app.delete("/hotels/:hotelId", async (req, res) => {
    try {
        const deletedHotel = await deleteHotel(req.params.hotelId);
        
        if (deletedHotel) {
            res.status(200).json({ message: "Hotel deleted successfully.", hotel: deletedHotel });
        } else {
            res.status(404).json({ error: "Hotel not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete hotel." });
    }
});