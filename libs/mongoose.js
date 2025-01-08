//connection to database

import mongoose from "mongoose";
import User from "@/models/User"; // lirary used to interact with mongoDb database
import Board from "@/models/Board";

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (e) {
    console.error("Mongoose Error:" + e.message);
  }
};

export default connectMongo;

//for prisma
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const connectPrisma = async () => {
//   try {
//     await prisma.$connect();
//     console.log("Connected to PostgreSQL database with Prisma");
//   } catch (e) {
//     console.error("Prisma Connection Error: " + e.message);
//   }
// };

// export { prisma, connectPrisma };
