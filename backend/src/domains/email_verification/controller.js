const User = require("./../user/model");
const {sendOTP}= require("./../otp/controller");


const sendVerificationOTPEmail = async (email)=>{
    try {

        //check if account exist
    
        const existingUser = await User.findOne({email});
    
        if(!existingUser){
            throw Error("There's no account for the provided email.");
        }

        const otpDetails ={
            email,
            subject:"Email verification",
            message:"Verify your email with the code below.",
            duration:1
        };

        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;
        
    } catch (error) {
        console.error("Error searching for user:", error);
        throw error;  // Re-throw the error for handling in routes.js
      }
}


module.exports={sendVerificationOTPEmail};