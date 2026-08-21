#!/usr/bin/env node
/**
 * Local high-signal secret scanner for Git-tracked text files.
 * Additional defense only — does not replace GitHub Secret Scanning / push protection.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const SKIP_PATH_PARTS = new Set([
  "node_modules",
  ".next",
  "dist",
  "build",
  ".git",
  "coverage",
  ".nyc_output",
]);

const PLACEHOLDER_RE =
  /^(https?:\/\/)?(dominio\.com|example\.com|localhost|changeme|your[-_]?|xxx+|TODO|REPLACE|dummy|placeholder)/i;

/** @type {{ category: string, pattern: RegExp }[]} */
const RULES = [
  {
    category: "private-key-block",
    pattern: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/,
  },
  {
    category: "github-token",
    pattern: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{20,}\b/,
  },
  {
    category: "vercel-token",
    pattern: /\bvercel_[A-Za-z0-9_]{20,}\b/i,
  },
  {
    category: "stripe-key",
    pattern: /\b(?:sk|rk|pk)_(?:live|test)_[A-Za-z0-9]{16,}\b/,
  },
  {
    category: "openai-key",
    pattern: /\bsk-[A-Za-z0-9]{20,}\b/,
  },
  {
    category: "aws-access-key",
    pattern: /\bAKIA[0-9A-Z]{16}\b/,
  },
  {
    category: "jwt-suspicious",
    pattern: /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/,
  },
  {
    category: "database-url-with-credentials",
    pattern:
      /\b(?:postgres|postgresql|mysql|mongodb(?:\+srv)?|redis):\/\/[^/\s:]+:[^@/\s]+@/i,
  },
  {
    category: "service-role-or-secret-assignment",
    pattern:
      /\b(?:PASSWORD|SECRET|PRIVATE_KEY|SERVICE_ROLE|ACCESS_TOKEN|AUTH_TOKEN|DATABASE_URL)\b\s*[:=]\s*['"`]?[^\s'"`]{8,}/i,
  },
  {
    category: "next-public-sensitive-name",
    pattern:
      /\bNEXT_PUBLIC_(?:SECRET|PASSWORD|PRIVATE|TOKEN|API_KEY|SERVICE_ROLE|DATABASE_URL)\b/i,
  },
];

function listedFiles() {
  const out = execSync("git ls-files -z", { encoding: "buffer" });
  return out
    .toString("utf8")
    .split("\0")
    .filter(Boolean)
    .filter((rel) => {
      const parts = rel.split(/[/\\]/);
      return !parts.some((p) => SKIP_PATH_PARTS.has(p));
    });
}

function isProbablyBinary(buf) {
  const sample = buf.subarray(0, Math.min(buf.length, 8000));
  if (sample.includes(0)) return true;
  let nonText = 0;
  for (const b of sample) {
    if (b < 9 || (b > 13 && b < 32)) nonText += 1;
  }
  return nonText / sample.length > 0.3;
}

function isEnvExample(rel) {
  return /(^|\/)\.env\.example$/.test(rel);
}

function looksLikePlaceholder(line) {
  const valueMatch = line.match(/[:=]\s*['"`]?([^'"`\s#]+)/);
  if (!valueMatch) return false;
  return PLACEHOLDER_RE.test(valueMatch[1]) || valueMatch[1].length === 0;
}

function scanFile(rel) {
  const abs = path.join(ROOT, rel);
  let buf;
  try {
    buf = fs.readFileSync(abs);
  } catch {
    return [];
  }
  if (isProbablyBinary(buf)) return [];

  const text = buf.toString("utf8");
  const lines = text.split(/\r?\n/);
  /** @type {{ file: string, line: number, category: string }[]} */
  const hits = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (isEnvExample(rel) && looksLikePlaceholder(line)) continue;
    if (looksLikePlaceholder(line) && /NEXT_PUBLIC_SITE_URL|GOOGLE_SITE_VERIFICATION/.test(line)) {
      continue;
    }

    for (const rule of RULES) {
      if (!rule.pattern.test(line)) continue;
      // Avoid flagging documentation that only names variable types.
      if (
        rule.category === "service-role-or-secret-assignment" &&
        (isEnvExample(rel) || /\.md$/i.test(rel)) &&
        looksLikePlaceholder(line)
      ) {
        continue;
      }
      hits.push({ file: rel, line: i + 1, category: rule.category });
      break;
    }
  }
  return hits;
}

function main() {
  const files = listedFiles();
  /** @type {{ file: string, line: number, category: string }[]} */
  const findings = [];
  for (const file of files) {
    findings.push(...scanFile(file));
  }

  if (findings.length === 0) {
    console.log(
      "security:check OK — no high-signal secret patterns in Git-tracked text files.",
    );
    console.log(
      "Note: this is an extra local check; enable GitHub Secret Scanning / push protection.",
    );
    process.exit(0);
  }

  console.error("security:check FAILED — possible secrets detected (values not shown):");
  for (const f of findings) {
    console.error(`- ${f.file}:${f.line} [${f.category}]`);
  }
  console.error(
    "Revoke/rotate any real credentials. Removing them from code does not invalidate leaked secrets.",
  );
  process.exit(1);
}

main();
