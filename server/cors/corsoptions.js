
// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://test-client-kajm.onrender.com",
//   // make it for all 
//    "*"
// ];


 const corsOptions = {
  origin: "*", // Allow all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true, // must be true to send cookies
};

module.exports = corsOptions;
