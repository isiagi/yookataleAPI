import dotenv from "dotenv";

dotenv.config();

import { connect } from "mongoose";

const dbConnect = async () => {
  try {
    await connect(process.env.localDB as string);
    console.log(`Database connection established`);
  } catch (error: any) {
    console.log(`Databse error occuried`, error.messge);
  }

  const db = connect;

  return db;
};

export default dbConnect;
