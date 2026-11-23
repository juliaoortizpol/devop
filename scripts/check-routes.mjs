import assert from "node:assert/strict";

const base = process.env.TEST_BASE_URL ?? "http://localhost:3210";
let checks = 0;
async function request(path) {
  return fetch(new URL(path, base), { redirect: "manual" });
}
for (const [path, target] of [
  ["/", "/consultor"],
  ["/?utm_source=ig", "/consultor?utm_source=ig"],
  ["/en", "/dev/en"],
  ["/es", "/dev"],
  ["/en?utm_source=ig", "/dev/en?utm_source=ig"],
  ["/consultor/es", "/consultor"],
  ["/dev/es", "/dev"],
]) {
  const response = await request(path);
  assert.equal(response.status, 308, path);
  const location = new URL(response.headers.get("location"), base);
  assert.equal(location.pathname + location.search, target, path);
  checks++;
}
for (const [path, language, text, canonical] of [
  ["/consultor", "es", "Su idea merece", "/consultor"],
  ["/consultor/en", "en", "Your idea deserves", "/consultor/en"],
  ["/dev", "es", "Desarrollador Full-Stack", "/dev"],
  ["/dev/en", "en", "Full-Stack Developer", "/dev/en"],
]) {
  const response = await request(path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.ok(
    html.includes(`<html lang="${language}"`),
    `${path}: document language`,
  );
  assert.ok(html.includes(text), `${path}: expected content`);
  assert.ok(
    html.includes(`href="https://devjop.vercel.app${canonical}"`),
    `${path}: canonical`,
  );
  assert.ok(
    html.includes("Qik Banco Digital"),
    `${path}: preserved experience`,
  );
  if (path.startsWith("/consultor")) {
    assert.ok(
      html.includes("mailto:julioortizpol@gmail.com?subject="),
      `${path}: contact`,
    );
    assert.ok(
      !html.includes("cdn.tailwindcss.com"),
      `${path}: no runtime CSS CDN`,
    );
    for (const target of [
      "servicios",
      "proyectos",
      "proceso",
      "sobre-mi",
      "contacto",
    ])
      assert.ok(html.includes(`id="${target}"`), `${path}: ${target} anchor`);
  }
  checks++;
}
for (const path of ["/consultor/fr", "/dev/fr", "/missing"]) {
  assert.equal((await request(path)).status, 404, path);
  checks++;
}
assert.equal(
  (await request("/admin")).status,
  401,
  "admin authentication is preserved",
);
checks++;
for (const path of [
  "/api/og?lang=en",
  "/api/og/consultor?lang=es",
  "/api/og/consultor?lang=en",
]) {
  const response = await request(path);
  assert.equal(response.status, 200, path);
  assert.ok(response.headers.get("content-type").startsWith("image/"), path);
  checks++;
}
console.log(
  `Passed ${checks} route, content, metadata, image and authentication checks against ${base}.`,
);
