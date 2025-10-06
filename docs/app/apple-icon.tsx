import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

/**
 * Generate Apple touch icon for iOS devices
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
 */
export default async function AppleIcon() {
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
        background: "white",
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: ImageResponse requires img element */}
      <img src={logoSrc} width="160" height="160" alt="fdu logo" />
    </div>,
    {
      ...size,
    },
  );
}
