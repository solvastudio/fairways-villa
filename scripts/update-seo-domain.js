import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target domain from environment variable, fallback to template placeholder
const targetDomain = process.env.SITE_URL || "https://fairwaysvillabelek.com";

const publicDir = path.join(__dirname, "../public");
const filesToUpdate = ["robots.txt", "sitemap.xml"];

console.log(`[SEO Domain Update] Target domain is set to: ${targetDomain}`);

filesToUpdate.forEach((file) => {
  const filePath = path.join(publicDir, file);
  if (!fs.existsSync(filePath)) {
    console.warn(`[SEO Domain Update] File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");
  
  // Replace template placeholders or previous domains with the new targetDomain
  const updatedContent = content.replace(
    /https:\/\/(fairwaysvillabelek\.com|__REPLACE_WITH_YOUR_DOMAIN__|localhost:3000)/g,
    targetDomain.replace(/\/$/, "") // Remove trailing slash if any
  );

  fs.writeFileSync(filePath, updatedContent, "utf8");
  console.log(`[SEO Domain Update] Updated domain in ${file}`);
});
