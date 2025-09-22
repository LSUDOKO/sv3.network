// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../contracts/Organization.sol";

contract OrganizationTest is Test {
    Organization public organization;
    
    address public owner = address(0x1);
    address public admin = address(0x2);
    address public member = address(0x3);
    address public user1 = address(0x4);
    address public user2 = address(0x5);
    
    string constant VALID_NAME = "Test Organization";
    string constant VALID_DESCRIPTION = "This is a test organization for testing purposes";
    
    event OrganizationCreated(uint256 indexed orgId, address indexed owner, string name);
    event OrganizationUpdated(uint256 indexed orgId, string field, string value);
    event MemberAdded(uint256 indexed orgId, address indexed member, uint256 role);
    event MemberRemoved(uint256 indexed orgId, address indexed member);
    event MemberRoleChanged(uint256 indexed orgId, address indexed member, uint256 newRole);
    event OrganizationDeleted(uint256 indexed orgId);

    function setUp() public {
        organization = new Organization();
    }

    // Test organization creation
    function testCreateOrganization() public {
        vm.prank(owner);
        
        vm.expectEmit(true, true, false, true);
        emit OrganizationCreated(1, owner, VALID_NAME);
        
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        assertEq(organization.getActiveOrganizationCount(), 1);
        
        // Check organization details
        (
            uint256 id,
            address orgOwner,
            string memory name,
            string memory description,
            address[] memory members,
            uint256 createdAt,
            bool isActive
        ) = organization.getOrganization(1);
        
        assertEq(id, 1);
        assertEq(orgOwner, owner);
        assertEq(name, VALID_NAME);
        assertEq(description, VALID_DESCRIPTION);
        assertEq(members.length, 1);
        assertEq(members[0], owner);
        assertTrue(isActive);
        assertGt(createdAt, 0);
        
        // Check owner role
        assertEq(organization.getMemberRole(1, owner), organization.ROLE_OWNER());
        assertTrue(organization.isMember(1, owner));
        
        // Check user organizations
        uint256[] memory userOrgs = organization.getUserOrganizations(owner);
        assertEq(userOrgs.length, 1);
        assertEq(userOrgs[0], 1);
    }

    function testCreateOrganizationInvalidName() public {
        vm.prank(owner);
        
        // Test empty name
        vm.expectRevert("Name must be 3-50 characters");
        organization.createOrganization("", VALID_DESCRIPTION);
        
        // Test too short name
        vm.expectRevert("Name must be 3-50 characters");
        organization.createOrganization("ab", VALID_DESCRIPTION);
        
        // Test too long name
        string memory longName = "This is a very long organization name that exceeds the maximum allowed length";
        vm.expectRevert("Name must be 3-50 characters");
        organization.createOrganization(longName, VALID_DESCRIPTION);
    }

    function testCreateOrganizationInvalidDescription() public {
        vm.prank(owner);
        
        // Create a description that's too long (over 500 characters)
        string memory longDescription = "This is a very long description that exceeds the maximum allowed length of 500 characters. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        
        vm.expectRevert("Description too long");
        organization.createOrganization(VALID_NAME, longDescription);
    }

    // Test organization updates
    function testUpdateOrganization() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        string memory newName = "Updated Organization Name";
        
        vm.expectEmit(true, false, false, true);
        emit OrganizationUpdated(1, "name", newName);
        
        vm.prank(owner);
        organization.updateOrganization(1, "name", newName);
        
        (, , string memory name, , , , ) = organization.getOrganization(1);
        assertEq(name, newName);
    }

    function testUpdateOrganizationDescription() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        string memory newDescription = "Updated organization description";
        
        vm.expectEmit(true, false, false, true);
        emit OrganizationUpdated(1, "description", newDescription);
        
        vm.prank(owner);
        organization.updateOrganization(1, "description", newDescription);
        
        (, , , string memory description, , , ) = organization.getOrganization(1);
        assertEq(description, newDescription);
    }

    function testUpdateOrganizationUnauthorized() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(user1);
        vm.expectRevert("Only owner");
        organization.updateOrganization(1, "name", "New Name");
    }

    function testUpdateOrganizationInvalidField() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(owner);
        vm.expectRevert("Invalid field");
        organization.updateOrganization(1, "invalid", "value");
    }

    // Test member management
    function testAddMember() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.expectEmit(true, true, false, true);
        emit MemberAdded(1, member, organization.ROLE_MEMBER());
        
        vm.prank(owner);
        organization.addMember(1, member, organization.ROLE_MEMBER());
        
        assertTrue(organization.isMember(1, member));
        assertEq(organization.getMemberRole(1, member), organization.ROLE_MEMBER());
        
        address[] memory members = organization.getOrganizationMembers(1);
        assertEq(members.length, 2);
        assertEq(members[1], member);
        
        uint256[] memory userOrgs = organization.getUserOrganizations(member);
        assertEq(userOrgs.length, 1);
        assertEq(userOrgs[0], 1);
    }

    function testAddMemberAsAdmin() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.expectEmit(true, true, false, true);
        emit MemberAdded(1, admin, organization.ROLE_ADMIN());
        
        vm.prank(owner);
        organization.addMember(1, admin, organization.ROLE_ADMIN());
        
        assertTrue(organization.isMember(1, admin));
        assertEq(organization.getMemberRole(1, admin), organization.ROLE_ADMIN());
    }

    function testAddMemberInvalidRole() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(owner);
        vm.expectRevert("Invalid role");
        organization.addMember(1, member, 999);
    }

    function testAddMemberInvalidAddress() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(owner);
        vm.expectRevert("Invalid address");
        organization.addMember(1, address(0), organization.ROLE_MEMBER());
    }

    function testAddMemberAlreadyMember() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(owner);
        organization.addMember(1, member, organization.ROLE_MEMBER());
        
        vm.prank(owner);
        vm.expectRevert("Already a member");
        organization.addMember(1, member, organization.ROLE_MEMBER());
    }

    function testAddMemberUnauthorized() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(user1);
        vm.expectRevert("Only admin or owner");
        organization.addMember(1, member, organization.ROLE_MEMBER());
    }

    function testRemoveMember() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(owner);
        organization.addMember(1, member, organization.ROLE_MEMBER());
        
        vm.expectEmit(true, true, false, false);
        emit MemberRemoved(1, member);
        
        vm.prank(owner);
        organization.removeMember(1, member);
        
        assertFalse(organization.isMember(1, member));
        
        address[] memory members = organization.getOrganizationMembers(1);
        assertEq(members.length, 1);
        assertEq(members[0], owner);
        
        uint256[] memory userOrgs = organization.getUserOrganizations(member);
        assertEq(userOrgs.length, 0);
    }

    function testRemoveMemberCannotRemoveOwner() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(owner);
        vm.expectRevert("Cannot remove owner");
        organization.removeMember(1, owner);
    }

    function testRemoveMemberNotMember() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(owner);
        vm.expectRevert("Not a member");
        organization.removeMember(1, user1);
    }

    function testChangeMemberRole() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(owner);
        organization.addMember(1, member, organization.ROLE_MEMBER());
        
        vm.expectEmit(true, true, false, true);
        emit MemberRoleChanged(1, member, organization.ROLE_ADMIN());
        
        vm.prank(owner);
        organization.changeMemberRole(1, member, organization.ROLE_ADMIN());
        
        assertEq(organization.getMemberRole(1, member), organization.ROLE_ADMIN());
    }

    function testChangeMemberRoleCannotChangeOwner() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(owner);
        vm.expectRevert("Cannot change owner role");
        organization.changeMemberRole(1, owner, organization.ROLE_ADMIN());
    }

    function testChangeMemberRoleInvalidRole() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(owner);
        organization.addMember(1, member, organization.ROLE_MEMBER());
        
        vm.prank(owner);
        vm.expectRevert("Invalid role");
        organization.changeMemberRole(1, member, 999);
    }

    function testChangeMemberRoleNotMember() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(owner);
        vm.expectRevert("Not a member");
        organization.changeMemberRole(1, user1, organization.ROLE_ADMIN());
    }

    // Test organization deletion
    function testDeleteOrganization() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(owner);
        organization.addMember(1, member, organization.ROLE_MEMBER());
        
        vm.expectEmit(true, false, false, false);
        emit OrganizationDeleted(1);
        
        vm.prank(owner);
        organization.deleteOrganization(1);
        
        (, , , , , , bool isActive) = organization.getOrganization(1);
        assertFalse(isActive);
        
        // Check that members are removed from user organizations
        uint256[] memory ownerOrgs = organization.getUserOrganizations(owner);
        uint256[] memory memberOrgs = organization.getUserOrganizations(member);
        assertEq(ownerOrgs.length, 0);
        assertEq(memberOrgs.length, 0);
    }

    function testDeleteOrganizationUnauthorized() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(user1);
        vm.expectRevert("Only owner");
        organization.deleteOrganization(1);
    }

    // Test ownership transfer
    function testTransferOwnership() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(owner);
        organization.addMember(1, user1, organization.ROLE_MEMBER());
        
        vm.expectEmit(true, true, false, true);
        emit MemberRoleChanged(1, owner, organization.ROLE_ADMIN());
        
        vm.expectEmit(true, true, false, true);
        emit MemberRoleChanged(1, user1, organization.ROLE_OWNER());
        
        vm.prank(owner);
        organization.transferOwnership(1, user1);
        
        (, address newOwner, , , , , ) = organization.getOrganization(1);
        assertEq(newOwner, user1);
        assertEq(organization.getMemberRole(1, user1), organization.ROLE_OWNER());
        assertEq(organization.getMemberRole(1, owner), organization.ROLE_ADMIN());
    }

    function testTransferOwnershipInvalidAddress() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(owner);
        vm.expectRevert("Invalid address");
        organization.transferOwnership(1, address(0));
    }

    function testTransferOwnershipToSameOwner() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(owner);
        vm.expectRevert("Already owner");
        organization.transferOwnership(1, owner);
    }

    // Test access control modifiers
    function testOnlyOrgOwnerModifier() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(user1);
        vm.expectRevert("Only owner");
        organization.updateOrganization(1, "name", "New Name");
    }

    function testOnlyOrgAdminModifier() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(user1);
        vm.expectRevert("Only admin or owner");
        organization.addMember(1, user2, organization.ROLE_MEMBER());
    }

    function testOrgExistsModifier() public {
        vm.expectRevert("Organization not found");
        organization.getOrganization(999);
    }

    // Test admin can add members
    function testAdminCanAddMembers() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(owner);
        organization.addMember(1, admin, organization.ROLE_ADMIN());
        
        vm.prank(admin);
        organization.addMember(1, member, organization.ROLE_MEMBER());
        
        assertTrue(organization.isMember(1, member));
    }

    function testAdminCanRemoveMembers() public {
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(owner);
        organization.addMember(1, admin, organization.ROLE_ADMIN());
        
        vm.prank(owner);
        organization.addMember(1, member, organization.ROLE_MEMBER());
        
        vm.prank(admin);
        organization.removeMember(1, member);
        
        assertFalse(organization.isMember(1, member));
    }

    // Fuzz tests
    function testFuzz_CreateOrganization(string memory name, string memory description) public {
        vm.assume(bytes(name).length >= 3 && bytes(name).length <= 50);
        vm.assume(bytes(description).length <= 500);
        
        vm.prank(owner);
        organization.createOrganization(name, description);
        
        assertEq(organization.getActiveOrganizationCount(), 1);
        
        (, , string memory orgName, string memory orgDescription, , , ) = organization.getOrganization(1);
        assertEq(orgName, name);
        assertEq(orgDescription, description);
    }

    function testFuzz_AddMultipleMembers(address[] memory members) public {
        vm.assume(members.length > 0 && members.length <= 10);
        
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        uint256 validMembers = 0;
        for (uint i = 0; i < members.length; i++) {
            if (members[i] != address(0) && members[i] != owner) {
                bool alreadyExists = false;
                for (uint j = 0; j < i; j++) {
                    if (members[j] == members[i]) {
                        alreadyExists = true;
                        break;
                    }
                }
                
                if (!alreadyExists) {
                    vm.prank(owner);
                    organization.addMember(1, members[i], organization.ROLE_MEMBER());
                    validMembers++;
                }
            }
        }
        
        address[] memory orgMembers = organization.getOrganizationMembers(1);
        assertEq(orgMembers.length, validMembers + 1); // +1 for owner
    }

    function testFuzz_RolePermissions(uint256 role) public {
        vm.assume(role <= organization.ROLE_MEMBER());
        
        vm.prank(owner);
        organization.createOrganization(VALID_NAME, VALID_DESCRIPTION);
        
        vm.prank(owner);
        organization.addMember(1, user1, role);
        
        assertEq(organization.getMemberRole(1, user1), role);
        assertTrue(organization.isMember(1, user1));
    }
}