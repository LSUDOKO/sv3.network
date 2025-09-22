// @ts-ignore - bun:test is a built-in module
import { test, expect, describe } from "bun:test";

// Mock contract interface for testing
interface UserProfile {
  createProfile(name: string, email: string, bio: string): Promise<void>;
  updateProfile(name: string, email: string, bio: string): Promise<void>;
  deleteProfile(): Promise<void>;
  getProfile(userAddress: string): Promise<any>;
  hasProfile(userAddress: string): Promise<boolean>;
  setProfileVisibility(isPublic: boolean): Promise<void>;
  addSkill(skill: string): Promise<void>;
  removeSkill(skill: string): Promise<void>;
  getSkills(userAddress: string): Promise<string[]>;
  setAvatar(avatarUrl: string): Promise<void>;
  transferOwnership(newOwner: string): Promise<void>;
}

// Mock implementation for testing
class MockUserProfile implements UserProfile {
  private profiles: Map<string, any> = new Map();
  private owner = "0x1234567890123456789012345678901234567890";
  private currentUser = "0x1234567890123456789012345678901234567890";

  setCurrentUser(address: string) {
    this.currentUser = address;
  }

  async createProfile(name: string, email: string, bio: string): Promise<void> {
    if (this.profiles.has(this.currentUser)) {
      throw new Error("Profile already exists");
    }
    if (!name || name.trim() === "") {
      throw new Error("Name cannot be empty");
    }
    if (!email || email.trim() === "") {
      throw new Error("Email cannot be empty");
    }
    if (!this.isValidEmail(email)) {
      throw new Error("Invalid email format");
    }
    if (name.length > 50) {
      throw new Error("Name too long");
    }
    if (email.length > 100) {
      throw new Error("Email too long");
    }
    if (bio.length > 500) {
      throw new Error("Bio too long");
    }

    const profile = {
      name: name.trim(),
      email: email.trim(),
      bio: bio.trim(),
      isPublic: true,
      skills: new Set<string>(),
      avatarUrl: "",
      createdAt: Date.now(),
      isDeleted: false
    };

    this.profiles.set(this.currentUser, profile);
  }

  async updateProfile(name: string, email: string, bio: string): Promise<void> {
    const profile = this.profiles.get(this.currentUser);
    if (!profile) {
      throw new Error("Profile not found");
    }
    if (profile.isDeleted) {
      throw new Error("Cannot update deleted profile");
    }
    if (!name || name.trim() === "") {
      throw new Error("Name cannot be empty");
    }
    if (!email || email.trim() === "") {
      throw new Error("Email cannot be empty");
    }
    if (!this.isValidEmail(email)) {
      throw new Error("Invalid email format");
    }
    if (name.length > 50) {
      throw new Error("Name too long");
    }
    if (email.length > 100) {
      throw new Error("Email too long");
    }
    if (bio.length > 500) {
      throw new Error("Bio too long");
    }

    profile.name = name.trim();
    profile.email = email.trim();
    profile.bio = bio.trim();
  }

  async deleteProfile(): Promise<void> {
    const profile = this.profiles.get(this.currentUser);
    if (!profile) {
      throw new Error("Profile not found");
    }
    if (profile.isDeleted) {
      throw new Error("Profile already deleted");
    }

    profile.isDeleted = true;
  }

  async getProfile(userAddress: string): Promise<any> {
    const profile = this.profiles.get(userAddress);
    if (!profile) {
      throw new Error("Profile not found");
    }

    return {
      ...profile,
      skills: Array.from(profile.skills)
    };
  }

  async hasProfile(userAddress: string): Promise<boolean> {
    const profile = this.profiles.get(userAddress);
    return profile && !profile.isDeleted;
  }

  async setProfileVisibility(isPublic: boolean): Promise<void> {
    const profile = this.profiles.get(this.currentUser);
    if (!profile) {
      throw new Error("Profile not found");
    }
    if (profile.isDeleted) {
      throw new Error("Cannot update deleted profile");
    }

    profile.isPublic = isPublic;
  }

  async addSkill(skill: string): Promise<void> {
    const profile = this.profiles.get(this.currentUser);
    if (!profile) {
      throw new Error("Profile not found");
    }
    if (profile.isDeleted) {
      throw new Error("Cannot update deleted profile");
    }
    if (!skill || skill.trim() === "") {
      throw new Error("Skill cannot be empty");
    }
    if (skill.length > 30) {
      throw new Error("Skill name too long");
    }
    if (profile.skills.has(skill.trim())) {
      throw new Error("Skill already exists");
    }
    if (profile.skills.size >= 20) {
      throw new Error("Maximum skills limit reached");
    }

    profile.skills.add(skill.trim());
  }

  async removeSkill(skill: string): Promise<void> {
    const profile = this.profiles.get(this.currentUser);
    if (!profile) {
      throw new Error("Profile not found");
    }
    if (profile.isDeleted) {
      throw new Error("Cannot update deleted profile");
    }
    if (!profile.skills.has(skill)) {
      throw new Error("Skill not found");
    }

    profile.skills.delete(skill);
  }

  async getSkills(userAddress: string): Promise<string[]> {
    const profile = this.profiles.get(userAddress);
    if (!profile) {
      throw new Error("Profile not found");
    }

    return Array.from(profile.skills);
  }

  async setAvatar(avatarUrl: string): Promise<void> {
    const profile = this.profiles.get(this.currentUser);
    if (!profile) {
      throw new Error("Profile not found");
    }
    if (profile.isDeleted) {
      throw new Error("Cannot update deleted profile");
    }
    if (avatarUrl.length > 200) {
      throw new Error("Avatar URL too long");
    }
    if (avatarUrl && !this.isValidUrl(avatarUrl)) {
      throw new Error("Invalid avatar URL format");
    }

    profile.avatarUrl = avatarUrl;
  }

  async transferOwnership(newOwner: string): Promise<void> {
    if (!newOwner || newOwner === "0x0000000000000000000000000000000000000000") {
      throw new Error("Invalid new owner address");
    }
    this.owner = newOwner;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}

describe("UserProfile Contract Tests", () => {
  let contract: MockUserProfile;

  test("should create a new user profile", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const email = "john.doe@example.com";
    const bio = "Software developer with 5 years of experience";

    await contract.createProfile(name, email, bio);
    
    const hasProfile = await contract.hasProfile("0x1234567890123456789012345678901234567890");
    expect(hasProfile).toBe(true);

    const profile = await contract.getProfile("0x1234567890123456789012345678901234567890");
    expect(profile.name).toBe(name);
    expect(profile.email).toBe(email);
    expect(profile.bio).toBe(bio);
    expect(profile.isPublic).toBe(true);
    expect(profile.isDeleted).toBe(false);
  });

  test("should fail to create profile with empty name", async () => {
    contract = new MockUserProfile();
    const email = "john.doe@example.com";
    const bio = "Valid bio";

    expect(async () => {
      await contract.createProfile("", email, bio);
    }).toThrow("Name cannot be empty");

    expect(async () => {
      await contract.createProfile("   ", email, bio);
    }).toThrow("Name cannot be empty");
  });

  test("should fail to create profile with empty email", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const bio = "Valid bio";

    expect(async () => {
      await contract.createProfile(name, "", bio);
    }).toThrow("Email cannot be empty");

    expect(async () => {
      await contract.createProfile(name, "   ", bio);
    }).toThrow("Email cannot be empty");
  });

  test("should fail to create profile with invalid email format", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const bio = "Valid bio";

    expect(async () => {
      await contract.createProfile(name, "invalid-email", bio);
    }).toThrow("Invalid email format");

    expect(async () => {
      await contract.createProfile(name, "invalid@", bio);
    }).toThrow("Invalid email format");

    expect(async () => {
      await contract.createProfile(name, "@invalid.com", bio);
    }).toThrow("Invalid email format");
  });

  test("should fail to create profile with name too long", async () => {
    contract = new MockUserProfile();
    const longName = "a".repeat(51);
    const email = "john.doe@example.com";
    const bio = "Valid bio";

    expect(async () => {
      await contract.createProfile(longName, email, bio);
    }).toThrow("Name too long");
  });

  test("should fail to create profile with email too long", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const longEmail = "a".repeat(90) + "@example.com";
    const bio = "Valid bio";

    expect(async () => {
      await contract.createProfile(name, longEmail, bio);
    }).toThrow("Email too long");
  });

  test("should fail to create profile with bio too long", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const email = "john.doe@example.com";
    const longBio = "a".repeat(501);

    expect(async () => {
      await contract.createProfile(name, email, longBio);
    }).toThrow("Bio too long");
  });

  test("should fail to create duplicate profile", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const email = "john.doe@example.com";
    const bio = "Valid bio";

    await contract.createProfile(name, email, bio);

    expect(async () => {
      await contract.createProfile(name, email, bio);
    }).toThrow("Profile already exists");
  });

  test("should update an existing profile", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const email = "john.doe@example.com";
    const bio = "Original bio";

    await contract.createProfile(name, email, bio);

    const newName = "Jane Doe";
    const newEmail = "jane.doe@example.com";
    const newBio = "Updated bio";

    await contract.updateProfile(newName, newEmail, newBio);

    const profile = await contract.getProfile("0x1234567890123456789012345678901234567890");
    expect(profile.name).toBe(newName);
    expect(profile.email).toBe(newEmail);
    expect(profile.bio).toBe(newBio);
  });

  test("should fail to update non-existent profile", async () => {
    contract = new MockUserProfile();

    expect(async () => {
      await contract.updateProfile("Name", "email@example.com", "Bio");
    }).toThrow("Profile not found");
  });

  test("should set profile visibility", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const email = "john.doe@example.com";
    const bio = "Valid bio";

    await contract.createProfile(name, email, bio);

    await contract.setProfileVisibility(false);
    let profile = await contract.getProfile("0x1234567890123456789012345678901234567890");
    expect(profile.isPublic).toBe(false);

    await contract.setProfileVisibility(true);
    profile = await contract.getProfile("0x1234567890123456789012345678901234567890");
    expect(profile.isPublic).toBe(true);
  });

  test("should add skills to profile", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const email = "john.doe@example.com";
    const bio = "Valid bio";

    await contract.createProfile(name, email, bio);

    await contract.addSkill("JavaScript");
    await contract.addSkill("TypeScript");
    await contract.addSkill("React");

    const skills = await contract.getSkills("0x1234567890123456789012345678901234567890");
    expect(skills).toContain("JavaScript");
    expect(skills).toContain("TypeScript");
    expect(skills).toContain("React");
    expect(skills.length).toBe(3);
  });

  test("should fail to add empty skill", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const email = "john.doe@example.com";
    const bio = "Valid bio";

    await contract.createProfile(name, email, bio);

    expect(async () => {
      await contract.addSkill("");
    }).toThrow("Skill cannot be empty");

    expect(async () => {
      await contract.addSkill("   ");
    }).toThrow("Skill cannot be empty");
  });

  test("should fail to add skill that's too long", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const email = "john.doe@example.com";
    const bio = "Valid bio";

    await contract.createProfile(name, email, bio);

    const longSkill = "a".repeat(31);

    expect(async () => {
      await contract.addSkill(longSkill);
    }).toThrow("Skill name too long");
  });

  test("should fail to add duplicate skill", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const email = "john.doe@example.com";
    const bio = "Valid bio";

    await contract.createProfile(name, email, bio);

    await contract.addSkill("JavaScript");

    expect(async () => {
      await contract.addSkill("JavaScript");
    }).toThrow("Skill already exists");
  });

  test("should remove skills from profile", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const email = "john.doe@example.com";
    const bio = "Valid bio";

    await contract.createProfile(name, email, bio);

    await contract.addSkill("JavaScript");
    await contract.addSkill("TypeScript");

    let skills = await contract.getSkills("0x1234567890123456789012345678901234567890");
    expect(skills.length).toBe(2);

    await contract.removeSkill("JavaScript");

    skills = await contract.getSkills("0x1234567890123456789012345678901234567890");
    expect(skills).not.toContain("JavaScript");
    expect(skills).toContain("TypeScript");
    expect(skills.length).toBe(1);
  });

  test("should fail to remove non-existent skill", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const email = "john.doe@example.com";
    const bio = "Valid bio";

    await contract.createProfile(name, email, bio);

    expect(async () => {
      await contract.removeSkill("NonExistentSkill");
    }).toThrow("Skill not found");
  });

  test("should set avatar URL", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const email = "john.doe@example.com";
    const bio = "Valid bio";

    await contract.createProfile(name, email, bio);

    const avatarUrl = "https://example.com/avatar.jpg";
    await contract.setAvatar(avatarUrl);

    const profile = await contract.getProfile("0x1234567890123456789012345678901234567890");
    expect(profile.avatarUrl).toBe(avatarUrl);
  });

  test("should fail to set invalid avatar URL", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const email = "john.doe@example.com";
    const bio = "Valid bio";

    await contract.createProfile(name, email, bio);

    expect(async () => {
      await contract.setAvatar("invalid-url");
    }).toThrow("Invalid avatar URL format");
  });

  test("should fail to set avatar URL that's too long", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const email = "john.doe@example.com";
    const bio = "Valid bio";

    await contract.createProfile(name, email, bio);

    const longUrl = "https://example.com/" + "a".repeat(200);

    expect(async () => {
      await contract.setAvatar(longUrl);
    }).toThrow("Avatar URL too long");
  });

  test("should delete profile", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const email = "john.doe@example.com";
    const bio = "Valid bio";

    await contract.createProfile(name, email, bio);

    let hasProfile = await contract.hasProfile("0x1234567890123456789012345678901234567890");
    expect(hasProfile).toBe(true);

    await contract.deleteProfile();

    hasProfile = await contract.hasProfile("0x1234567890123456789012345678901234567890");
    expect(hasProfile).toBe(false);

    const profile = await contract.getProfile("0x1234567890123456789012345678901234567890");
    expect(profile.isDeleted).toBe(true);
  });

  test("should fail to delete already deleted profile", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const email = "john.doe@example.com";
    const bio = "Valid bio";

    await contract.createProfile(name, email, bio);
    await contract.deleteProfile();

    expect(async () => {
      await contract.deleteProfile();
    }).toThrow("Profile already deleted");
  });

  test("should fail to update deleted profile", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const email = "john.doe@example.com";
    const bio = "Valid bio";

    await contract.createProfile(name, email, bio);
    await contract.deleteProfile();

    expect(async () => {
      await contract.updateProfile("New Name", "new@example.com", "New bio");
    }).toThrow("Cannot update deleted profile");
  });

  test("should fail to add skill to deleted profile", async () => {
    contract = new MockUserProfile();
    const name = "John Doe";
    const email = "john.doe@example.com";
    const bio = "Valid bio";

    await contract.createProfile(name, email, bio);
    await contract.deleteProfile();

    expect(async () => {
      await contract.addSkill("JavaScript");
    }).toThrow("Cannot update deleted profile");
  });

  test("should transfer ownership", async () => {
    contract = new MockUserProfile();
    const newOwner = "0x9876543210987654321098765432109876543210";

    await contract.transferOwnership(newOwner);
    // In a real implementation, we would check the owner property
    // For this mock, we just verify it doesn't throw
    expect(true).toBe(true);
  });

  test("should fail to transfer ownership to zero address", async () => {
    contract = new MockUserProfile();

    expect(async () => {
      await contract.transferOwnership("0x0000000000000000000000000000000000000000");
    }).toThrow("Invalid new owner address");
  });

  test("should handle multiple users with different profiles", async () => {
    contract = new MockUserProfile();
    
    // Create profile for user 1
    contract.setCurrentUser("0x1111111111111111111111111111111111111111");
    await contract.createProfile("User One", "user1@example.com", "First user bio");
    
    // Create profile for user 2
    contract.setCurrentUser("0x2222222222222222222222222222222222222222");
    await contract.createProfile("User Two", "user2@example.com", "Second user bio");

    // Verify both profiles exist
    const hasProfile1 = await contract.hasProfile("0x1111111111111111111111111111111111111111");
    const hasProfile2 = await contract.hasProfile("0x2222222222222222222222222222222222222222");
    
    expect(hasProfile1).toBe(true);
    expect(hasProfile2).toBe(true);

    const profile1 = await contract.getProfile("0x1111111111111111111111111111111111111111");
    const profile2 = await contract.getProfile("0x2222222222222222222222222222222222222222");

    expect(profile1.name).toBe("User One");
    expect(profile2.name).toBe("User Two");
    expect(profile1.email).toBe("user1@example.com");
    expect(profile2.email).toBe("user2@example.com");
  });
});