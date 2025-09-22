// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {DocumentRWA} from "../src/DocumentRWA.sol";
import {Organization} from "../src/Organization.sol";
import {UserProfile} from "../src/UserProfile.sol";
import {Message} from "../src/Message.sol";
import {SV3NetworkNFT} from "../src/NFT.sol";

contract DeployScript is Script {
    DocumentRWA public documentRWA;
    Organization public organization;
    UserProfile public userProfile;
    Message public message;
    SV3NetworkNFT public nft;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        console.log("Deploying contracts with account:", deployer);
        console.log("Account balance:", deployer.balance);

        vm.startBroadcast(deployerPrivateKey);

        // Deploy UserProfile first (no dependencies)
        console.log("Deploying UserProfile...");
        userProfile = new UserProfile();
        console.log("UserProfile deployed at:", address(userProfile));

        // Deploy Organization (no dependencies)
        console.log("Deploying Organization...");
        organization = new Organization();
        console.log("Organization deployed at:", address(organization));

        // Deploy Message (no dependencies)
        console.log("Deploying Message...");
        message = new Message();
        console.log("Message deployed at:", address(message));

        // Deploy NFT (no constructor parameters needed)
        console.log("Deploying NFT...");
        nft = new SV3NetworkNFT();
        console.log("NFT deployed at:", address(nft));

        // Deploy DocumentRWA (requires initial owner)
        console.log("Deploying DocumentRWA...");
        documentRWA = new DocumentRWA(deployer);
        console.log("DocumentRWA deployed at:", address(documentRWA));

        vm.stopBroadcast();

        // Log all deployed addresses for easy reference
        console.log("\n=== DEPLOYMENT SUMMARY ===");
        console.log("UserProfile:", address(userProfile));
        console.log("Organization:", address(organization));
        console.log("Message:", address(message));
        console.log("NFT:", address(nft));
        console.log("DocumentRWA:", address(documentRWA));
        console.log("Deployer:", deployer);
    }
}