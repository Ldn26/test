
const allowedOrigins = [
  "http://localhost:3000",
  "https://test-4ybs.onrender.com",
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
