"use server";

const { default: mongoDb, collections } = require("@/lib/mongoConnect");
import bcrypt from "bcrypt";

const registerUser = async (user_data) => {
  const { name, method, password } = user_data;

  const user_collection = await mongoDb(collections.users);

  const filter = {
    [method === "email" ? "email" : "phone"]:
      method === "email" ? user_data.email : user_data.phone,
  };

  const user_exists = await user_collection.findOne(filter);
  if (user_exists) {
    return { success: false, message: "User Already Exists" };
  }

  const hashed_password = await bcrypt.hash(password, 10);
  const user = {
    name: name,
    method: method,
    [method === "email" ? "email" : "phone"]:
      method === "email" ? user_data.email : user_data.phone,
    password: hashed_password,
    role: "user",
    created_at: new Date(),
  };

  const result = await user_collection.insertOne(user);
  if (result.acknowledged === true)
    return { success: true, insertedId: result.insertedId.toString() };
};

export default registerUser;
