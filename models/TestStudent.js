import mongoose from "mongoose";

const { Schema } = mongoose;

const TestSchema = new Schema({
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  studentPhone: { type: String, required: true },
  studentAddress: { type: String, required: true },
});

const TestStudent = mongoose.model("TestStudent", TestSchema);

export default TestStudent;
