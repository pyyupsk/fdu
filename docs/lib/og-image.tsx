import type React from "react";

/**
 * Common props for OG image generation
 */
export interface OGImageProps {
  title: string;
  description?: string;
  tags?: string[];
}

/**
 * Common styles for OG images
 */
export const ogStyles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column" as const,
    background: "linear-gradient(135deg, #121212 0%, #191919 100%)",
    padding: "60px 80px",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "auto",
  },
  brandContainer: {
    display: "flex",
    flexDirection: "column" as const,
  },
  brandTitle: {
    fontSize: "32px",
    fontWeight: "bold" as const,
    color: "rgb(235, 235, 235)",
    lineHeight: 1,
  },
  brandSubtitle: {
    fontSize: "16px",
    color: "rgba(235, 235, 235, 0.8)",
    marginTop: "4px",
  },
  tagsContainer: {
    display: "flex",
    gap: "12px",
  },
  tag: {
    background: "rgba(250, 250, 250, 0.1)",
    backdropFilter: "blur(10px)",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "14px",
    color: "rgb(235, 235, 235)",
    fontWeight: "500" as const,
  },
  mainContent: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
    marginTop: "auto",
    marginBottom: "auto",
  },
  title: {
    fontSize: "72px",
    fontWeight: "bold" as const,
    color: "rgb(235, 235, 235)",
    lineHeight: 1.1,
    maxWidth: "1000px",
  },
  description: {
    fontSize: "40px",
    color: "rgba(179, 179, 179, 0.8)",
    lineHeight: 1.4,
    maxWidth: "1000px",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
    paddingTop: "40px",
  },
  footerUrl: {
    fontSize: "20px",
    color: "rgba(179, 179, 179, 0.8)",
    fontWeight: "500" as const,
  },
  dotsContainer: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
};

/**
 * Truncate text to a maximum length
 *
 * @internal
 */
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Generate OG image component with consistent branding
 */
export function generateOGImage({
  title,
  description,
  tags = ["TypeScript", "Immutable"],
}: OGImageProps): React.ReactElement {
  return (
    <div style={ogStyles.container}>
      {/* Header */}
      <div style={ogStyles.header}>
        <div style={ogStyles.brandContainer}>
          <div style={ogStyles.brandTitle}>@pyyupsk/fdu</div>
          <div style={ogStyles.brandSubtitle}>Zero-dependency Date Library</div>
        </div>
        <div style={ogStyles.tagsContainer}>
          {tags.map((tag) => (
            <div key={tag} style={ogStyles.tag}>
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={ogStyles.mainContent}>
        <div style={ogStyles.title}>{title}</div>
        {description && (
          <div style={ogStyles.description}>
            {truncateText(description, 120)}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={ogStyles.footer}>
        <div style={ogStyles.footerUrl}>fdu.fasu.dev</div>
        <div style={ogStyles.dotsContainer}>
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
    </div>
  );
}

/**
 * Default OG image size
 */
export const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};
