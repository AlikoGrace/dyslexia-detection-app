const User = require("./../user/model");
const {sendOTP}= require("./../otp/controller");


const sendPasswordResetOTPEmail = async (email)=>{
    try {

        //check if account exist
        const existingUser= await User.findOne({email});
        if (!existingUser){
            throw Error("Theres no account for the provided email");
        }


        if (!existingUser.verified){
            throw Error("Email hasn't been verified yet, check your inbox")
        }
        

        const otpDetails={
            email,
            subject:"Password Reset",
            message:"Enter the code below to reset your password",
            duration:1,
        };
        
        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;
    } catch (error) {
        throw error
    }
}





module.exports={sendPasswordResetOTPEmail};