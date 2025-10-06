import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

/**
 * Generate favicon/icon for the application
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
 */
export default async function Icon() {
  const logoData = await readFile(
    join(process.cwd(), "public/logo.svg"),
    "base64",
  );
  const logoSrc = `data:image/svg+xml;base64,${logoData}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#121212",
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: ImageResponse requires img element */}
      <img src={logoSrc} width="32" height="32" alt="fdu logo" />
    </div>,
    {
      ...size,
    },
  );
}
