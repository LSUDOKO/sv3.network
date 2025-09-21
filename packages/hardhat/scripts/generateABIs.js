const fs = require('fs');
const path = require('path');

async function main() {
  const artifactsDir = path.join(__dirname, '../artifacts/contracts');
  const outputDir = path.join(__dirname, '../abis');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const contracts = ['UserProfile', 'Organization', 'DocumentRWA'];
  
  for (const contractName of contracts) {
    try {
      const artifactPath = path.join(artifactsDir, `${contractName}.sol`, `${contractName}.json`);
      const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
      
      const abi = artifact.abi;
      const abiPath = path.join(outputDir, `${contractName}.json`);
      
      fs.writeFileSync(abiPath, JSON.stringify(abi, null, 2));
      console.log(`Generated ABI for ${contractName}`);
    } catch (error) {
      console.error(`Error generating ABI for ${contractName}:`, error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });