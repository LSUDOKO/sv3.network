// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Test} from "forge-std/Test.sol";
import "../src/UserProfile.sol";

contract UserProfileTest is Test {
    UserProfile public userProfile;
    
    address public user1 = address(0x1);
    address public user2 = address(0x2);
    address public user3 = address(0x3);
    
    string constant VALID_USERNAME = "testuser123";
    string constant VALID_EMAIL = "test@example.com";
    string constant VALID_LINKEDIN = "https://linkedin.com/in/testuser";
    
    event ProfileCreated(address indexed wallet, string username);
    event ProfileUpdated(address indexed wallet, string field, string value);
    event ProfileVerified(address indexed wallet);

    function setUp() public {
        userProfile = new UserProfile();
    }

    // Test profile creation
    function testCreateProfile() public {
        vm.prank(user1);
        
        vm.expectEmit(true, false, false, true);
        emit ProfileCreated(user1, VALID_USERNAME);
        
        userProfile.createProfile(VALID_USERNAME, VALID_EMAIL);
        
        assertEq(userProfile.profileCount(), 1);
        
        // Check profile details
        (
            address wallet,
            string memory username,
            string memory email,
            string memory linkedinProfile,
            bool verified,
            uint256 createdAt
        ) = userProfile.getProfile(user1);
        
        assertEq(wallet, user1);
        assertEq(username, VALID_USERNAME);
        assertEq(email, VALID_EMAIL);
        assertEq(linkedinProfile, "");
        assertFalse(verified);
        assertGt(createdAt, 0);
        
        // Check username mapping
        assertEq(userProfile.usernameToAddress(VALID_USERNAME), user1);
        assertFalse(userProfile.isUsernameAvailable(VALID_USERNAME));
    }

    function testCreateProfileWithoutEmail() public {
        vm.prank(user1);
        userProfile.createProfile(VALID_USERNAME, "");
        
        (, , string memory email, , , ) = userProfile.getProfile(user1);
        assertEq(email, "");
    }

    function testCreateProfileAlreadyExists() public {
        vm.prank(user1);
        userProfile.createProfile(VALID_USERNAME, VALID_EMAIL);
        
        vm.prank(user1);
        vm.expectRevert("Profile already exists");
        userProfile.createProfile("newusername", VALID_EMAIL);
    }

    function testCreateProfileInvalidUsername() public {
        vm.prank(user1);
        
        // Test empty username
        vm.expectRevert("Username must be 3-30 characters");
        userProfile.createProfile("", VALID_EMAIL);
        
        // Test too short username
        vm.expectRevert("Username must be 3-30 characters");
        userProfile.createProfile("ab", VALID_EMAIL);
        
        // Test too long username
        string memory longUsername = "this_is_a_very_long_username_that_exceeds_thirty_characters";
        vm.expectRevert("Username must be 3-30 characters");
        userProfile.createProfile(longUsername, VALID_EMAIL);
    }

    function testCreateProfileUsernameTaken() public {
        vm.prank(user1);
        userProfile.createProfile(VALID_USERNAME, VALID_EMAIL);
        
        vm.prank(user2);
        vm.expectRevert("Username already taken");
        userProfile.createProfile(VALID_USERNAME, "user2@example.com");
    }

    function testCreateProfileInvalidUsernameCharacters() public {
        vm.prank(user1);
        
        // Test username with special characters
        vm.expectRevert("Invalid username character");
        userProfile.createProfile("test@user", VALID_EMAIL);
        
        // Test username with spaces
        vm.expectRevert("Invalid username character");
        userProfile.createProfile("test user", VALID_EMAIL);
        
        // Test username with hyphens
        vm.expectRevert("Invalid username character");
        userProfile.createProfile("test-user", VALID_EMAIL);
    }

    function testCreateProfileValidUsernameCharacters() public {
        vm.prank(user1);
        userProfile.createProfile("TestUser_123", VALID_EMAIL);
        
        (, string memory username, , , , ) = userProfile.getProfile(user1);
        assertEq(username, "TestUser_123");
    }

    // Test profile updates
    function testUpdateProfileUsername() public {
        vm.prank(user1);
        userProfile.createProfile(VALID_USERNAME, VALID_EMAIL);
        
        string memory newUsername = "newusername123";
        
        vm.expectEmit(true, false, false, true);
        emit ProfileUpdated(user1, "username", newUsername);
        
        vm.prank(user1);
        userProfile.updateProfile("username", newUsername);
        
        (, string memory username, , , , ) = userProfile.getProfile(user1);
        assertEq(username, newUsername);
        
        // Check old username is no longer mapped
        assertEq(userProfile.usernameToAddress(VALID_USERNAME), address(0));
        assertTrue(userProfile.isUsernameAvailable(VALID_USERNAME));
        
        // Check new username is mapped
        assertEq(userProfile.usernameToAddress(newUsername), user1);
        assertFalse(userProfile.isUsernameAvailable(newUsername));
    }

    function testUpdateProfileEmail() public {
        vm.prank(user1);
        userProfile.createProfile(VALID_USERNAME, VALID_EMAIL);
        
        string memory newEmail = "newemail@example.com";
        
        vm.expectEmit(true, false, false, true);
        emit ProfileUpdated(user1, "email", newEmail);
        
        vm.prank(user1);
        userProfile.updateProfile("email", newEmail);
        
        (, , string memory email, , , ) = userProfile.getProfile(user1);
        assertEq(email, newEmail);
    }

    function testUpdateProfileLinkedin() public {
        vm.prank(user1);
        userProfile.createProfile(VALID_USERNAME, VALID_EMAIL);
        
        vm.expectEmit(true, false, false, true);
        emit ProfileUpdated(user1, "linkedinProfile", VALID_LINKEDIN);
        
        vm.prank(user1);
        userProfile.updateProfile("linkedinProfile", VALID_LINKEDIN);
        
        (, , , string memory linkedinProfile, , ) = userProfile.getProfile(user1);
        assertEq(linkedinProfile, VALID_LINKEDIN);
    }

    function testUpdateProfileCustomField() public {
        vm.prank(user1);
        userProfile.createProfile(VALID_USERNAME, VALID_EMAIL);
        
        string memory customField = "company";
        string memory customValue = "Test Company";
        
        vm.expectEmit(true, false, false, true);
        emit ProfileUpdated(user1, customField, customValue);
        
        vm.prank(user1);
        userProfile.updateProfile(customField, customValue);
        
        string memory retrievedValue = userProfile.getCustomData(user1, customField);
        assertEq(retrievedValue, customValue);
    }

    function testUpdateProfileUnauthorized() public {
        vm.prank(user1);
        userProfile.createProfile(VALID_USERNAME, VALID_EMAIL);
        
        vm.prank(user2);
        vm.expectRevert("Unauthorized");
        userProfile.updateProfile("email", "hacker@example.com");
    }

    function testUpdateProfileNonexistentProfile() public {
        vm.prank(user1);
        vm.expectRevert("Profile does not exist");
        userProfile.updateProfile("email", VALID_EMAIL);
    }

    function testUpdateUsernameAlreadyTaken() public {
        vm.prank(user1);
        userProfile.createProfile(VALID_USERNAME, VALID_EMAIL);
        
        vm.prank(user2);
        userProfile.createProfile("user2name", "user2@example.com");
        
        vm.prank(user2);
        vm.expectRevert("Username already taken");
        userProfile.updateProfile("username", VALID_USERNAME);
    }

    function testUpdateUsernameInvalidLength() public {
        vm.prank(user1);
        userProfile.createProfile(VALID_USERNAME, VALID_EMAIL);
        
        vm.prank(user1);
        vm.expectRevert("Username must be 3-30 characters");
        userProfile.updateProfile("username", "ab");
    }

    function testUpdateUsernameInvalidCharacters() public {
        vm.prank(user1);
        userProfile.createProfile(VALID_USERNAME, VALID_EMAIL);
        
        vm.prank(user1);
        vm.expectRevert("Invalid username character");
        userProfile.updateProfile("username", "test@user");
    }

    // Test profile verification
    function testVerifyProfile() public {
        vm.prank(user1);
        userProfile.createProfile(VALID_USERNAME, VALID_EMAIL);
        
        vm.expectEmit(true, false, false, false);
        emit ProfileVerified(user1);
        
        vm.prank(user1);
        userProfile.verifyProfile();
        
        (, , , , bool verified, ) = userProfile.getProfile(user1);
        assertTrue(verified);
    }

    function testVerifyProfileAlreadyVerified() public {
        vm.prank(user1);
        userProfile.createProfile(VALID_USERNAME, VALID_EMAIL);
        
        vm.prank(user1);
        userProfile.verifyProfile();
        
        vm.prank(user1);
        vm.expectRevert("Profile already verified");
        userProfile.verifyProfile();
    }

    function testVerifyProfileUnauthorized() public {
        vm.prank(user1);
        userProfile.createProfile(VALID_USERNAME, VALID_EMAIL);
        
        vm.prank(user2);
        vm.expectRevert("Unauthorized");
        userProfile.verifyProfile();
    }

    function testVerifyProfileNonexistent() public {
        vm.prank(user1);
        vm.expectRevert("Profile does not exist");
        userProfile.verifyProfile();
    }

    // Test profile retrieval
    function testGetProfileByUsername() public {
        vm.prank(user1);
        userProfile.createProfile(VALID_USERNAME, VALID_EMAIL);
        
        (
            address wallet,
            string memory email,
            string memory linkedinProfile,
            bool verified,
            uint256 createdAt
        ) = userProfile.getProfileByUsername(VALID_USERNAME);
        
        assertEq(wallet, user1);
        assertEq(email, VALID_EMAIL);
        assertEq(linkedinProfile, "");
        assertFalse(verified);
        assertGt(createdAt, 0);
    }

    function testGetProfileByUsernameNotFound() public {
        vm.expectRevert("Username not found");
        userProfile.getProfileByUsername("nonexistent");
    }

    function testGetProfileNotFound() public {
        vm.expectRevert("Profile not found");
        userProfile.getProfile(user1);
    }

    function testGetCustomDataProfileNotFound() public {
        vm.expectRevert("Profile not found");
        userProfile.getCustomData(user1, "company");
    }

    // Test username availability
    function testIsUsernameAvailable() public {
        assertTrue(userProfile.isUsernameAvailable(VALID_USERNAME));
        
        vm.prank(user1);
        userProfile.createProfile(VALID_USERNAME, VALID_EMAIL);
        
        assertFalse(userProfile.isUsernameAvailable(VALID_USERNAME));
        assertTrue(userProfile.isUsernameAvailable("otherusername"));
    }

    // Test multiple profiles
    function testMultipleProfiles() public {
        vm.prank(user1);
        userProfile.createProfile("user1", "user1@example.com");
        
        vm.prank(user2);
        userProfile.createProfile("user2", "user2@example.com");
        
        vm.prank(user3);
        userProfile.createProfile("user3", "user3@example.com");
        
        assertEq(userProfile.profileCount(), 3);
        
        // Check each profile
        (, string memory username1, , , , ) = userProfile.getProfile(user1);
        (, string memory username2, , , , ) = userProfile.getProfile(user2);
        (, string memory username3, , , , ) = userProfile.getProfile(user3);
        
        assertEq(username1, "user1");
        assertEq(username2, "user2");
        assertEq(username3, "user3");
        
        // Check username mappings
        assertEq(userProfile.usernameToAddress("user1"), user1);
        assertEq(userProfile.usernameToAddress("user2"), user2);
        assertEq(userProfile.usernameToAddress("user3"), user3);
    }

    // Test custom data functionality
    function testMultipleCustomFields() public {
        vm.prank(user1);
        userProfile.createProfile(VALID_USERNAME, VALID_EMAIL);
        
        vm.prank(user1);
        userProfile.updateProfile("company", "Test Company");
        
        vm.prank(user1);
        userProfile.updateProfile("position", "Developer");
        
        vm.prank(user1);
        userProfile.updateProfile("location", "New York");
        
        assertEq(userProfile.getCustomData(user1, "company"), "Test Company");
        assertEq(userProfile.getCustomData(user1, "position"), "Developer");
        assertEq(userProfile.getCustomData(user1, "location"), "New York");
    }

    function testCustomDataOverwrite() public {
        vm.prank(user1);
        userProfile.createProfile(VALID_USERNAME, VALID_EMAIL);
        
        vm.prank(user1);
        userProfile.updateProfile("company", "Old Company");
        
        vm.prank(user1);
        userProfile.updateProfile("company", "New Company");
        
        assertEq(userProfile.getCustomData(user1, "company"), "New Company");
    }

    // Fuzz tests
    function testFuzz_CreateProfile(string memory username, string memory email) public {
        vm.assume(bytes(username).length >= 3 && bytes(username).length <= 30);
        vm.assume(_isValidUsername(username));
        
        vm.prank(user1);
        userProfile.createProfile(username, email);
        
        assertEq(userProfile.profileCount(), 1);
        
        (, string memory profileUsername, string memory profileEmail, , , ) = userProfile.getProfile(user1);
        assertEq(profileUsername, username);
        assertEq(profileEmail, email);
    }

    function testFuzz_UpdateCustomData(string memory field, string memory value) public {
        vm.assume(bytes(field).length > 0);
        vm.assume(
            keccak256(bytes(field)) != keccak256(bytes("username")) &&
            keccak256(bytes(field)) != keccak256(bytes("email")) &&
            keccak256(bytes(field)) != keccak256(bytes("linkedinProfile"))
        );
        
        vm.prank(user1);
        userProfile.createProfile(VALID_USERNAME, VALID_EMAIL);
        
        vm.prank(user1);
        userProfile.updateProfile(field, value);
        
        assertEq(userProfile.getCustomData(user1, field), value);
    }

    function testFuzz_UsernameAvailability(string memory username) public {
        vm.assume(bytes(username).length >= 3 && bytes(username).length <= 30);
        vm.assume(_isValidUsername(username));
        
        assertTrue(userProfile.isUsernameAvailable(username));
        
        vm.prank(user1);
        userProfile.createProfile(username, VALID_EMAIL);
        
        assertFalse(userProfile.isUsernameAvailable(username));
    }

    // Helper function to validate username characters
    function _isValidUsername(string memory username) internal pure returns (bool) {
        bytes memory usernameBytes = bytes(username);
        for (uint i = 0; i < usernameBytes.length; i++) {
            bytes1 char = usernameBytes[i];
            if (
                !(char >= 0x30 && char <= 0x39) && // 0-9
                !(char >= 0x41 && char <= 0x5A) && // A-Z
                !(char >= 0x61 && char <= 0x7A) && // a-z
                char != 0x5F // _
            ) {
                return false;
            }
        }
        return true;
    }

    // Test edge cases
    function testUsernameWithUnderscores() public {
        vm.prank(user1);
        userProfile.createProfile("test_user_123", VALID_EMAIL);
        
        (, string memory username, , , , ) = userProfile.getProfile(user1);
        assertEq(username, "test_user_123");
    }

    function testUsernameWithNumbers() public {
        vm.prank(user1);
        userProfile.createProfile("user123456", VALID_EMAIL);
        
        (, string memory username, , , , ) = userProfile.getProfile(user1);
        assertEq(username, "user123456");
    }

    function testUsernameAllUppercase() public {
        vm.prank(user1);
        userProfile.createProfile("TESTUSER", VALID_EMAIL);
        
        (, string memory username, , , , ) = userProfile.getProfile(user1);
        assertEq(username, "TESTUSER");
    }

    function testUsernameAllLowercase() public {
        vm.prank(user1);
        userProfile.createProfile("testuser", VALID_EMAIL);
        
        (, string memory username, , , , ) = userProfile.getProfile(user1);
        assertEq(username, "testuser");
    }

    function testUsernameMixedCase() public {
        vm.prank(user1);
        userProfile.createProfile("TestUser", VALID_EMAIL);
        
        (, string memory username, , , , ) = userProfile.getProfile(user1);
        assertEq(username, "TestUser");
    }
}