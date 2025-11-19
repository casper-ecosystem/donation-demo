import React from 'react';
import { BodyText, SvgIcon } from '@make-software/cspr-design';

import {
  FooterLinkSectionItem,
  FooterLinksSection,
  FooterLinksSectionLogo,
  FooterLinksSectionTitle
} from '../styled';

interface FooterLinkItem {
  label: string;
  url: string;
  target?: string;
}

interface FooterLinkGroupProps {
  logoSrc: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  title: string;
  items: FooterLinkItem[];
  linkType?: string;
}

export const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({
  logoSrc,
  logoAlt,
  logoWidth,
  logoHeight,
  title,
  items,
  linkType
}) => (
  <FooterLinksSection>
    <FooterLinksSectionLogo>
      <SvgIcon src={logoSrc} alt={logoAlt} width={logoWidth} height={logoHeight} />
    </FooterLinksSectionLogo>
    <FooterLinksSectionTitle size={1}>{title}</FooterLinksSectionTitle>
    {items.map((item, index) => (
      <FooterLinkSectionItem
        key={item.label + index}
        linkType={linkType}
        href={item.url}
        target={item.target ?? '_blank'}>
        <BodyText size={3} scale="xs">
          {item.label}
        </BodyText>
      </FooterLinkSectionItem>
    ))}
  </FooterLinksSection>
);
