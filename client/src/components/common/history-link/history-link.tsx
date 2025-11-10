import styled from 'styled-components';
import { NavLink, BodyText } from '@make-software/cspr-design';

const StyledWrapper = styled.span(({ theme }) => ({
  color: theme.styleguideColors.contentBlue,
  '& > *': {
    color: theme.styleguideColors.contentBlue
  },
  '&:hover > *': {
    color: theme.styleguideColors.fillPrimaryRed
  },
  '&:active > *': {
    color: theme.styleguideColors.fillPrimaryRedClick
  }
}));

interface HistoryLinkProps {
  href: string;
  target?: string;
  children: React.ReactNode;
  monotype?: boolean;
}

export const HistoryLink = ({ href, children, target, monotype = false }: HistoryLinkProps) => {
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
