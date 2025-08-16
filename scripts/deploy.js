async function main() {
  const JobPayments = await ethers.getContractFactory("JobPayments");
  const jobPayments = await JobPayments.deploy();
  await jobPayments.deployed();

  console.log("JobPayments deployed to:", jobPayments.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
