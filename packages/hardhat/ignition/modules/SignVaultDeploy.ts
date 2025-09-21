import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SignVaultModule = buildModule("SignVaultModule", (m) => {
  // Deploy UserProfile contract
  const userProfile = m.contract("UserProfile");

  // Deploy Organization contract
  const organization = m.contract("Organization");

  // Deploy DocumentRWA contract
  const documentRWA = m.contract("DocumentRWA");

  return {
    userProfile,
    organization,
    documentRWA,
  };
});

export default SignVaultModule;