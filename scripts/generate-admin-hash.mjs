import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";

const password = process.argv[2];

if (!password) {
  console.error("Usage: npm run admin:hash -- <admin-password>");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
const secret = randomBytes(32).toString("base64url");
const envSafeHash = hash.replaceAll("$", "\\$");

console.log("ADMIN_PASSWORD_HASH=" + envSafeHash);
console.log("ADMIN_SESSION_SECRET=" + secret);
console.log("");
console.log("Paste these values into .env.local, then restart the dev server.");
