const dns = require("dns").promises;

exports.resolveDomain = async (domain) => {
  console.log("🔎 Resolving domain:", domain);
  const result = await dns.lookup(domain);
  return result.address;
};