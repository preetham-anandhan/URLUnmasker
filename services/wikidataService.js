const axios = require("axios");

exports.getWikiData = async (domain) => {
  try {
    console.log("🧠 Calling Wikidata for:", domain);

    const query = `
      SELECT ?item ?itemLabel WHERE {
        ?item wdt:P856 "https://${domain}".
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }
    `;

    const response = await axios.get("https://query.wikidata.org/sparql", {
      headers: {
        "Accept": "application/json",
        "User-Agent": "domain-profiler-app/1.0"
      },
      params: { query }
    });

    console.log("✅ Wikidata Success");
    return response.data;

  } catch (error) {
    console.error("❌ Wikidata Error:", error.response?.data || error.message);
    return null;
  }
};