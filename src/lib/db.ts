
import mongoose from "mongoose";
import {z} from "zod";
 
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

export const signupSchema = z.object({
    username: z.string().min(1, {message: "This field has to be filled"}).email("This is not a valid email"),
    password: z.string().min(1, {message: 'This field has to be filled'})
})

