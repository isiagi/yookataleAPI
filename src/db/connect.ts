import dotenv from "dotenv";

dotenv.config();

import { connect } from "mongoose";

let DB: any;
switch (process.env.NODE_ENV) {
  case "production":
    DB = process.env.PROD_DB;
    break;

  default:
    DB = process.env.localDB;
}

const dbConnect = async () => {
  try {
    await connect(DB as string);
    console.log(`Database connection established`);
  } catch (error: any) {
    console.log(`Databse error occuried`, error.messge);
  }

  const db = connect;

  return db;
};

export default dbConnect;
