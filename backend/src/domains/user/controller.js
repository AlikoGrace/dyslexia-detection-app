const User= require("./model")
const {hashData,verifyHashedData} = require("../../utils/hashData");
const createToken = require("./../../utils/createToken")


const authenticateUser = async(data)=>{
    try {
        const{email,password}=data;

        const fetchedUser = await User.findOne({email})

        if (!fetchedUser){
            throw Error("Invalid email entered");
        }
        
        const hashedPassword = fetchedUser.password;
        const passwordMatch = await verifyHashedData(password,hashedPassword)

        if (!passwordMatch){
            throw Error('Invalid password entered!')
        }

        //create user token 
        const tokenData = {userId:fetchedUser._id,email}
        const token = await createToken(tokenData);


        //assign user token
        fetchedUser.token= token
        return fetchedUser;

        
    } catch (error) {
        throw error;
    }
}

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


module.exports={createNewUser, authenticateUser}