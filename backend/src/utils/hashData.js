const bcrypt = require('bcrypt');



  const hashData = async (data, saltRounds = 10) => {
    try {
      const hashedData = await bcrypt.hash(data, saltRounds);
      return hashedData;
    } catch (error) {
      console.error("Error hashing data:", error);
      // Handle errors appropriately (e.g., throw a specific error)
    }
  };
  


module.exports={hashData};