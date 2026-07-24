const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const { initializeDB } = require("./db/db.connect");

const Hotel = require("./models/hotels.model");

initializeDB();

const newHotel = {
  name: "New Hotel",
  category: "Mid-Range",
  location: "123 Main Street, Frazer Town",
  rating: 4.0,
  reviews: [],
  website: "https://hotel-example.com",
  phoneNumber: "+1234567890",
  checkInTime: "2:00 PM",
  checkOutTime: "12:00 PM",
  amenities: ["Laundry", "Room Service"],
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isParkingAvailable: true,
  isWifiAvailable: true,
  isPoolAvailable: false,
  isSpaAvailable: false,
  isRestaurantAvailable: true,
  photos: ["https://example.com/hotel-photo1.jpg", "https://example.com/hotel-photo2.jpg"],
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

createHotel(newHotel);
