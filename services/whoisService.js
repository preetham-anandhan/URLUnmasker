const axios = require("axios");

exports.getWhoisData = async (domain) => {
  try {
    const response = await axios.get(
      "https://www.whoisxmlapi.com/whoisserver/WhoisService",
      {
        params: {
          apiKey: process.env.WHOIS_API_KEY,
          domainName: domain,
          outputFormat: "JSON"
        }
      }
    );
    console.log("✅ WHOIS Success");

    return response.data;
  } catch (error) {
    console.error("WHOIS Error:", error.message);
    return null;
  }
};