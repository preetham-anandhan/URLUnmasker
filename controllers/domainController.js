const { getWhoisData } = require("../services/whoisService");
const { getIPData } = require("../services/ipService");
const { getWikiData } = require("../services/wikidataService");
const { resolveDomain } = require("../utils/dnsResolver");

exports.getDomainProfile = async (req, res) => {
  const { domain } = req.params;

  try {
    console.log("📥 Incoming domain:", domain);

    // Step 1: Resolve IP
    let ip;
    try {
      ip = await resolveDomain(domain);
      console.log("🌐 Resolved IP:", ip);
    } catch (err) {
      console.error("❌ DNS Error:", err.message);
      return res.status(400).json({ error: "Invalid domain" });
    }

    // Step 2: Call APIs (parallel)
    const [whois, ipInfo, wiki] = await Promise.all([
      getWhoisData(domain),
      getIPData(ip),
      getWikiData(domain)
    ]);

    // Step 3: Log ALL responses
    console.log("📊 WHOIS RESPONSE:", JSON.stringify(whois, null, 2));
    console.log("📊 IP RESPONSE:", JSON.stringify(ipInfo, null, 2));
    console.log("📊 WIKI RESPONSE:", JSON.stringify(wiki, null, 2));

    // Step 4: Send safe response
    res.json({
      domain,
      ip,
      owner: whois?.WhoisRecord?.registrant?.organization || "N/A",
      registrar: whois?.WhoisRecord?.registrarName || "N/A",
      country: ipInfo?.country || "N/A",
      city: ipInfo?.city || "N/A",
      isp: ipInfo?.org || "N/A",
      organization: wiki?.results?.bindings?.[0]?.itemLabel?.value || "N/A"
    });

  } catch (error) {
    console.error("🔥 CONTROLLER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};