import "dotenv/config";

import mongoose from "mongoose";

// Connect to Mongodb
mongoose.connect(
  <string>process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log("\n Connected... \n ")
);
