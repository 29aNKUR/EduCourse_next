
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
})

export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

export const Course = mongoose.models.Course || mongoose.model('Course',courseSchema);