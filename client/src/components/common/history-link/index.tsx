import React from 'react';

import { NavLink, BodyText } from '@make-software/cspr-design';

import { StyledWrapper } from './styled';

interface HistoryLinkProps {
  href: string;
  target?: string;
  children: React.ReactNode;
  monotype?: boolean;
}

export const HistoryLink: React.FC<HistoryLinkProps> = ({
  href,
  children,
  target,
  monotype = false
}) => {
  const normalizedHref =
    href.startsWith('http://') || href.startsWith('https://') ? href : `https://${href}`;
  return (
    <StyledWrapper>
      <NavLink href={normalizedHref} target={target}>
        <BodyText size={3} monotype={monotype}>
          {children}
        </BodyText>
      </NavLink>
    </StyledWrapper>
  );
};
