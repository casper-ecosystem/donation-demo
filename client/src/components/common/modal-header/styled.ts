import styled from 'styled-components';
import { FlexRow, SvgIcon } from '@make-software/cspr-design';

export const ModalHeaderContainer = styled(FlexRow)<{
  marginBottom?: string;
}>(({ theme, marginBottom }) =>
  theme.withMedia({
    marginBottom: marginBottom ? marginBottom : '0'
  })
);

export const CloseButton = styled.div(() => ({
  cursor: 'pointer',
  padding: '0 10px'
}));

export const StyledSvg = styled(SvgIcon)(({ theme }) =>
  theme.withMedia({
    path: {
      fill: theme.styleguideColors.contentTertiary
    }
  })
);
