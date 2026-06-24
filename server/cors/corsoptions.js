// const allowedOrigins  = require("./allowedorigins")

//  const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   optionsSuccessStatus: 200,
// };

// module.exports  = corsOptions

// corsOptions.js
const allowedOrigins = [
  "http://localhost:3000",
  // "http://localhost:8000",
  // "http://localhost:5000",
  "https://kingofsedari.com",
  "https://sedari-kings-front-pv4z.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  // origin: allowedOrigins,
  credentials: true, // must be true to send cookies
};

module.exports = corsOptions;
