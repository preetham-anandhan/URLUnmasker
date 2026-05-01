const axios = require("axios");

exports.getIPData = async (ip) => {
  try {
    const response = await axios.get(`https://ipinfo.io/${ip}`, {
      params: {
        token: process.env.IP_API_KEY
      }
    });
    console.log("✅ IP API Success");

    return response.data;
  } catch (error) {
    console.error("IP Error:", error.message);
    return null;
  }
};