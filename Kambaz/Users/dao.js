import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function UsersDao() {
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return model.create(newUser);  // ← CHANGED: use model.create() instead of array push
  };
  
  const findUserByUsername = (username) => 
    model.findOne({ username: username });  // ← CHANGED: use model.findOne()
  
  const findAllUsers = () => model.find();  // ✅ Already correct
  
  const findUserById = (userId) => 
    model.findById(userId);  // ← CHANGED: use model.findById()
  
  const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });  // ← CHANGED: use model.findOne()
  
  const updateUser = (userId, user) => 
    model.updateOne({ _id: userId }, { $set: user });  // ← CHANGED: use model.updateOne()
  
 const deleteUser = (userId) => model.findByIdAndDelete(userId);

  const findUsersByRole = (role) => model.find({ role: role }); 

  const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i");
    return model.find({
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
  };
  
  
  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
    findUsersByRole,
    findUsersByPartialName,
  };
}