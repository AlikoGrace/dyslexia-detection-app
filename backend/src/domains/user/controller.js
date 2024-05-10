const User= require("./model")
const {hashData} = require("../../utils/hashData");

const createNewUser= async(data)=>{
    try {
        const{name,email,password}=data;
        console.log('received password', password)

        //checking if user already exist

        const existingUser = await User.findOne({email});

        if (existingUser){
            throw Error("User with the provided email aleady exist")
        }

        //hash password
        const hashedPassword= await hashData(password);
        console.log('Hashed password', hashedPassword)
        const newUser = new User({
            name,
            email,
            password:hashedPassword
        });

        //save user
        const createdUser= await newUser.save();
        return createdUser;
    } catch (error) {
        // Handle specific errors here, e.g., duplicate email
        if (error.code === 11000 && error.keyValue.email) {
            throw Error("User with the provided email already exists");
        } else {
            throw error; // Re-throw other errors for generic handling
        }
    }
}


module.exports={createNewUser}