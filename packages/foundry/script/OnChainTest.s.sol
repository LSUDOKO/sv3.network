// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {DocumentRWA} from "../src/DocumentRWA.sol";
import {Organization} from "../src/Organization.sol";
import {UserProfile} from "../src/UserProfile.sol";
import {Message} from "../src/Message.sol";
import {SV3NetworkNFT} from "../src/NFT.sol";

contract OnChainTestScript is Script {
    // Contract addresses (to be set via environment variables or constructor)
    DocumentRWA public documentRWA;
    Organization public organization;
    UserProfile public userProfile;
    Message public message;
    SV3NetworkNFT public nft;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        // Load contract addresses from environment or deployment artifacts
        address documentRWAAddress = vm.envAddress("DOCUMENT_RWA_ADDRESS");
        address organizationAddress = vm.envAddress("ORGANIZATION_ADDRESS");
        address userProfileAddress = vm.envAddress("USER_PROFILE_ADDRESS");
        address messageAddress = vm.envAddress("MESSAGE_ADDRESS");
        address nftAddress = vm.envAddress("NFT_ADDRESS");

        // Initialize contract instances
        documentRWA = DocumentRWA(documentRWAAddress);
        organization = Organization(organizationAddress);
        userProfile = UserProfile(userProfileAddress);
        message = Message(messageAddress);
        nft = SV3NetworkNFT(nftAddress);

        console.log("Starting on-chain tests...");
        console.log("Tester account:", deployer);

        vm.startBroadcast(deployerPrivateKey);

        // Test 1: Create user profile
        console.log("\nTest 1: Creating user profile...");
        userProfile.createProfile("testuser", "Test User");
        console.log("User profile created successfully");

        // Test 2: Create organization
        console.log("\nTest 2: Creating organization...");
        organization.createOrganization("Test Org", "A test organization");
        console.log("Organization created successfully");

        // Test 3: Create document
        console.log("\nTest 3: Creating document...");
        documentRWA.createDocument(1, "Test Document", "QmTestHash", "QmTestMetadata");
        console.log("Document created successfully");

        // Test 4: Get document details
        console.log("\nTest 4: Retrieving document details...");
        (uint256 id, string memory uri, address owner) = documentRWA.getDocument(1);
        console.log("Document retrieved - ID:", id);
        console.log("   URI:", uri);
        console.log("   Owner:", owner);

        // Test 5: Check document count
        console.log("\nTest 5: Checking document count...");
        uint256 activeCount = documentRWA.getActiveDocumentCount();
        uint256 signatureCount = documentRWA.getTotalSignatureCount();
        console.log("Active documents:", activeCount);
        console.log("Total signatures:", signatureCount);

        // Test 6: Set message
        console.log("\nTest 6: Setting message...");
        message.setMessage("Hello from on-chain test!");
        console.log("Message set successfully");

        vm.stopBroadcast();

        console.log("\nOn-chain tests completed!");
    }
}