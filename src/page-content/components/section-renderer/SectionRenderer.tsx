import React from "react";
import { ReactNode } from "react";
import Section from "@/components/section/Section";
import SolidDivider from "@/page-content/components/divider/SolidDivider";

export type SectionKind = "content" | "cta";

export type SectionItem = {
  key: string;
  kind: SectionKind;
  render: ReactNode;
  enabled?: boolean;
  sectionId?: string;
  useHeaderImage?: boolean;
  headerHeight?: string;
  disableTopDivider?: boolean;
  disableBottomDivider?: boolean;
};

function shouldRenderDivider(prev?: SectionItem, next?: SectionItem) {
  if (!prev || !next) return false;

  if (next.disableTopDivider) return false;
  if (prev.disableBottomDivider) return false;

  if (prev.kind === "cta" || next.kind === "cta") return false;

  return true;
}

export function renderSectionsWithDividers(sections: SectionItem[]) {
  const visibleSections = sections.filter((s) => s.enabled !== false);

  return visibleSections.map((section, index) => {
    const prev = visibleSections[index - 1];

    return (
      <React.Fragment key={section.key}>
        {shouldRenderDivider(prev, section) && <SolidDivider useHeaderImage />}

        {section.kind === "content" ? (
          <Section
            id={section.sectionId}
            useHeaderImage={section.useHeaderImage}
            headerHeight={section.headerHeight}
          >
            {section.render}
          </Section>
        ) : (
          section.render
        )}
      </React.Fragment>
    );
  });
}
