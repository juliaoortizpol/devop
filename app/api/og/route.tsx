import { ImageResponse } from "next/og";

export const runtime = "edge";

const locales = ["en", "es"] as const;
type Locale = (typeof locales)[number];

const content = {
  en: {
    role: "Full-Stack Developer | Software Engineer",
    summary: "Fintech, digital banking, web, mobile, and microservices architectures.",
  },
  es: {
    role: "Desarrollador Full-Stack | Ingeniero de Software",
    summary: "Fintech, banca digital, web, mobile y arquitecturas de microservicios.",
  },
};

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") ?? "en";
  const locale: Locale = locales.includes(lang as Locale) ? (lang as Locale) : "en";
  const copy = content[locale];

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #0f0d13 0%, #211a2c 55%, #112635 100%)",
          color: "#f5f1ff",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: 72,
          width: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: 36,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: 56,
            width: "100%",
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: 24 }}>
            <div
              style={{
                alignItems: "center",
                background: "linear-gradient(135deg, #cfbcff, #8fd9ff)",
                borderRadius: 24,
                color: "#0f0d13",
                display: "flex",
                fontSize: 40,
                fontWeight: 800,
                height: 96,
                justifyContent: "center",
                width: 96,
              }}
            >
              &lt;/&gt;
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ color: "#cfbcff", fontSize: 30, fontWeight: 700 }}>
                JAOP.
              </div>
              <div style={{ color: "#bdb5ca", fontSize: 24 }}>
                Portfolio
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ fontSize: 76, fontWeight: 900, lineHeight: 1 }}>
              Julio Antonio Ortiz Pol
            </div>
            <div style={{ color: "#8fd9ff", fontSize: 38, fontWeight: 700 }}>
              {copy.role}
            </div>
            <div style={{ color: "#d7d0df", fontSize: 30, lineHeight: 1.25, maxWidth: 900 }}>
              {copy.summary}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      height: 630,
      width: 1200,
    }
  );
}
