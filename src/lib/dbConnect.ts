import mongoose from "mongoose";
let alreadyDone = false;

export async function ensureDbConnected() {
    try {
        if (alreadyDone) {
            return;
        }
        alreadyDone = true;
        await mongoose.connect(process.env.MONGODB_URI || '');
        console.log("database connected");
    }
    catch {
        console.log("database not connected");
    }
   
}


