const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const { initializeDB } = require("./db/db.connect");

const Hotel = require("./models/hotels.model");

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
        console.log("New hotel data :",saveData.name);
    }catch(err){
        throw err;
    }
}

const readAllHotels = async()=>{
    try{
        const data = await Hotel.find();
        console.log(data);
    }catch(err){
        console.log(err);
    }
}
const readByName = async(hotelName)=>{
    try{
        const data = await Hotel.find({name:hotelName});
        console.log(data);
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
        console.log(data);
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
        console.log(data);
    } catch(err) {
        console.log(err);
    }
}
// readByRating(4.0);

const readByPhoneNumber = async (phone) => {
    try {
        const data = await Hotel.findOne({ phoneNumber: phone });
        console.log(data);
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

findByNumber("+1299655890",{phoneNumber:"+1997687392"});

