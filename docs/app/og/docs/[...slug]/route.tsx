import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { getPageImage, source } from "@/lib/source";

export const revalidate = false;

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}

export async function GET(
  _req: Request,
  { params }: RouteContext<"/og/docs/[...slug]">,
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #121212 0%, #191919 100%)",
        padding: "60px 80px",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "rgb(235, 235, 235)",
              lineHeight: 1,
            }}
          >
            @pyyupsk/fdu
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "rgba(235, 235, 235, 0.8)",
              marginTop: "4px",
            }}
          >
            Zero-dependency Date Library
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <div
            style={{
              background: "rgba(250, 250, 250, 0.1)",
              backdropFilter: "blur(10px)",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "14px",
              color: "rgb(235, 235, 235)",
              fontWeight: "500",
            }}
          >
            TypeScript
          </div>
          <div
            style={{
              background: "rgba(250, 250, 250, 0.1)",
              backdropFilter: "blur(10px)",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "14px",
              color: "rgb(235, 235, 235)",
              fontWeight: "500",
            }}
          >
            Immutable
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "auto",
          marginBottom: "auto",
        }}
      >
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "rgb(235, 235, 235)",
            lineHeight: 1.1,
            maxWidth: "1000px",
          }}
        >
          {page.data.title}
        </div>
        {page.data.description && (
          <div
            style={{
              fontSize: "40px",
              color: "rgba(179, 179, 179, 0.8)",
              lineHeight: 1.4,
              maxWidth: "1000px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {page.data.description.length > 120
              ? `${page.data.description.slice(0, 120)}...`
              : page.data.description}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "auto",
          paddingTop: "40px",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            color: "rgba(179, 179, 179, 0.8)",
            fontWeight: "500",
          }}
        >
          fdu.fasu.dev/docs
        </div>
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              background: "rgba(235, 235, 235, 0.6)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              width: "8px",
              height: "8px",
              background: "rgba(235, 235, 235, 0.8)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              width: "8px",
              height: "8px",
              background: "rgb(235, 235, 235)",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
