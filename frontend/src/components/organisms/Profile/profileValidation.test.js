import assert from "node:assert/strict";
import test from "node:test";
import { validateProfile } from "./profileValidation.js";

test("requires a name but allows empty contact fields", () => {
  assert.equal(validateProfile({ name: "   ", address: "", phone: "" }), "Name is required.");
  assert.equal(validateProfile({ name: "Ada", address: "", phone: "" }), "");
});

test("rejects malformed or too-short phone numbers", () => {
  assert.equal(validateProfile({ name: "Ada", address: "Road", phone: "abc" }), "Enter a valid phone number.");
  assert.equal(validateProfile({ name: "Ada", address: "Road", phone: "1------" }), "Enter a valid phone number.");
  assert.equal(validateProfile({ name: "Ada", address: "Road", phone: "+91 98765 43210" }), "");
});

test("limits name and address to database-safe lengths", () => {
  assert.equal(validateProfile({ name: "A".repeat(101), address: "", phone: "" }), "Name must be 100 characters or fewer.");
  assert.equal(validateProfile({ name: "Ada", address: "A".repeat(256), phone: "" }), "Address must be 255 characters or fewer.");
});
