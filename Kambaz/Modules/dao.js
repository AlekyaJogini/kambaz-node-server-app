import { v4 as uuidv4 } from "uuid";
import model from "../Courses/model.js";
export default function ModulesDao(db) {
  async function findModulesForCourse(courseId) {
   const course = await model.findById(courseId);
   return course.modules;

  }

  async function createModule(courseId, module) {  // ✅ ADD async, ADD courseId parameter
  const newModule = { ...module, _id: uuidv4() };
  const status = await model.updateOne(  // ✅ Use MongoDB $push to add to array
    { _id: courseId },
    { $push: { modules: newModule } }
  );
  return newModule;
}

  // ✅ ADD: Delete module
  async function deleteModule(courseId,moduleId) {
     const status = await model.updateOne(
     { _id: courseId },
     { $pull: { modules: { _id: moduleId } } }
   );
   return status;
  }

 async function updateModule(courseId, moduleId, moduleUpdates) {  // ✅ ADD async, ADD courseId
  const course = await model.findById(courseId);  // ✅ Get the course
  const module = course.modules.id(moduleId);  // ✅ Find module in embedded array
  Object.assign(module, moduleUpdates);  // ✅ Update the module
  await course.save();  // ✅ Save the entire course document
  return module;
}
  
  return {
    findModulesForCourse,
    createModule
    ,deleteModule
    ,updateModule
  };
}