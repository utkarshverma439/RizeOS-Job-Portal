const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    require("../artifacts/contracts/JobPayments.sol/JobPayments.json").abi,
    provider
  );

  const filter = contract.filters.PaymentMade();
  const events = await contract.queryFilter(filter, -10000); // last 10k blocks
  console.log("Recent Payments:", events);
}

main();
