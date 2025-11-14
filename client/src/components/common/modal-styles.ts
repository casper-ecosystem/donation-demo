import styled from 'styled-components';
import { FlexColumn, Input, SubtitleText, SvgIcon } from '@make-software/cspr-design';

export const centerModalStyles = {
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  borderRadius: 'none',
  padding: '32px 24px 24px 24px',
  top: '50%',
  transform: 'translate(-50%, -50%)'
};

export const ModalContainer = styled(FlexColumn)(({ theme }) =>
  theme.withMedia({
    width: ['300px', '400px', '446px'],
    background: theme.styleguideColors.backgroundPrimary,
    borderColor: theme.styleguideColors.backgroundPrimary,
    overflowY: ['scroll', 'unset', 'unset'],
    height: ['500px', 'unset']
  })
);

export const StyledInput = styled(Input)<{ withBorder?: boolean }>(({ theme, withBorder }) =>
  theme.withMedia({
    width: '100%',
    'div:nth-child(2)': {
      border: withBorder ? `1px solid ${theme.styleguideColors.contentSecondary}` : 'none'
    }
  })
);

export const StyledFlexColumn = styled(FlexColumn)(({ theme }) =>
  theme.withMedia({
    textAlign: 'center',
    height: 'inherit'
  })
);

export const LoadingContainer = styled(StyledFlexColumn)(({ theme }) =>
  theme.withMedia({
    width: '100%',
    height: '300px'
  })
);

export const LoadingSvgIcon = styled(SvgIcon)(() => ({
  animationName: 'spin',
  animationDuration: '5000ms',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'linear'
}));

export const StyledTitle = styled(SubtitleText)<{ margin?: string }>(({ theme, margin }) =>
  theme.withMedia({
    fontWeight: 700,
    color: theme.styleguideColors.contentPrimary,
    margin: margin ? margin : '0 0 32px 0'
  })
);
