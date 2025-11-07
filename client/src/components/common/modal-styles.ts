import styled from 'styled-components';
import {
  BodyText,
  Button,
  FlexColumn,
  FlexRow,
  Input,
  SubtitleText,
  SvgIcon
} from '@make-software/cspr-design';

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

export const StyledCaption = styled.div(({ theme }) =>
  theme.withMedia({
    textAlign: 'center',
    marginBottom: '16px'
  })
);

export const StyledCaptionText = styled(SubtitleText)(({ theme }) =>
  theme.withMedia({
    fontWeight: [600, 600, 700],
    fontSize: ['20px', '24px', '24px'],
    color: theme.styleguideColors.contentPrimary
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

export const ButtonsContainer = styled(FlexRow)(({ theme }) =>
  theme.withMedia({
    marginTop: ['16px', '32px'],
    flexDirection: ['column', 'row', 'row'],
    '& > * + *': {
      marginTop: [16, 0]
    }
  })
);

export const StyledConfirmButton = styled(Button)(({ theme }) =>
  theme.withMedia({
    width: ['100%', '45%', '47%'],
    backgroundColor: theme.styleguideColors.fillPrimaryBlue,
    ':hover': {
      background: theme.styleguideColors.fillPrimaryBlueHover
    },
    ':active': {
      background: theme.styleguideColors.fillPrimaryBlueClick
    }
  })
);

export const StyledDismissButton = styled(Button)<{ fullWidth?: boolean }>(({ theme, fullWidth }) =>
  theme.withMedia({
    width: fullWidth ? '100%' : ['100%', '45%', '47%'],
    color: theme.styleguideColors.contentBlue,
    ':hover': {
      background: theme.styleguideColors.fillSecondaryBlueHover
    },
    ':active': {
      background: theme.styleguideColors.fillSecondaryBlueClick
    }
  })
);

export const TableValidationErrorWrapper = styled(FlexRow)<{ top?: string }>(({ theme, top }) =>
  theme.withMedia({
    position: 'absolute',
    top: ['unset', 'unset', top ? top : '30px'],
    width: '100%',
    right: '20px'
  })
);
export const TableValidationText = styled(BodyText)(({ theme }) =>
  theme.withMedia({
    fontSize: '11px',
    position: 'relative',
    height: '0',
    color: theme.styleguideColors.borderRed
  })
);

export const UnexpectedErrorWrapper = styled(FlexRow)(({ theme }) =>
  theme.withMedia({
    margin: [' 20px 0', ' 30px 0', ' 60px 0']
  })
);

export const ErrorTextContainer = styled(FlexRow)<{ top?: string }>(({ theme, top }) =>
  theme.withMedia({
    position: 'relative',
    top: top ? top : '30px'
  })
);
export const ErrorText = styled(BodyText)(({ theme }) =>
  theme.withMedia({
    fontSize: '11px',
    lineHeight: '14px',
    position: 'relative',
    bottom: '42px',
    height: '0',
    color: theme.styleguideColors.borderRed
  })
);

export const StyledToggle = styled.div(({ theme }) =>
  theme.withMedia({
    marginTop: '32px',
    padding: '16px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: `1px solid ${theme.styleguideColors.borderSecondary}`,
    borderBottom: `1px solid ${theme.styleguideColors.borderSecondary}`
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
    width: '300px'
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

export const TOGGLE_ACTIVE_COLOR = '#0021A5';
