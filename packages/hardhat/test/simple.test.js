import { test, expect } from "bun:test";

test("basic math operations", () => {
  expect(2 + 2).toBe(4);
  expect(5 * 3).toBe(15);
});

test("string operations", () => {
  expect("hello".toUpperCase()).toBe("HELLO");
  expect("world".length).toBe(5);
});