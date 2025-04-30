import { PrismaClient } from "@prisma/client";

/**
 * @author Fadi Hanna
 */

const prisma = new PrismaClient();

/**
 * Connect the database and check if it success.
 * @function connectDb
 * @async
 * @returns { Promise<void> } A promise
 * @example connectDb();
 */
const connectDb = async (): Promise<void> => {
  try {
    await prisma.$connect();
  } catch (error) {
    console.log("Error database connecting: ", error);
  }
};

export { connectDb, prisma };
