import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET(request: Request) {
  const english = new URL(request.url).searchParams.get("lang") === "en";
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#121416",
          color: "#F5F6F7",
          width: "100%",
          height: "100%",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span
            style={{
              background: "#D3D5D9",
              color: "#121416",
              padding: 18,
              borderRadius: 8,
              fontSize: 32,
            }}
          >
            JOP
          </span>
          <span style={{ fontSize: 30 }}>Julio Ortiz Pol</span>
        </div>
        <div style={{ fontSize: 68, lineHeight: 1.1, maxWidth: 1000 }}>
          {english
            ? "A clear path from idea to application."
            : "Un camino claro de la idea a la aplicación."}
        </div>
        <div style={{ fontSize: 28, color: "#D3D5D9" }}>
          {english
            ? "Software consulting and development"
            : "Consultoría y desarrollo de software"}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
