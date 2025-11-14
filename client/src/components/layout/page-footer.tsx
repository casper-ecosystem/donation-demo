import React from 'react';
import styled from 'styled-components';
import {
  BodyText,
  CaptionText,
  FlexBox,
  FlexRow,
  SvgIcon,
  SvgIconSocial
} from '@make-software/cspr-design';

import { aboutCSPRSuite, aboutMake, makeSocialChannels } from './page-footer-config';
import MakeLogo from 'assets/logos/make-full.svg';
import CsprSuiteLogo from 'assets/logos/cspr-suite.svg';

export const ContentWrapperTop = styled(FlexBox)(({ theme }) =>
  theme.withMedia({
    background: theme.styleguideColors.backgroundTertiary,
    width: '100%',
    flexDirection: ['row'],
    justifyContent: 'center'
  })
);

export const ContentWrapperBottom = styled(FlexBox)(({ theme }) =>
  theme.withMedia({
    background: theme.styleguideColors.backgroundQuaternary,
    width: '100%',
    flexDirection: ['row'],
    justifyContent: 'center'
  })
);

export const FooterTopBar = styled(FlexBox)(({ theme }) =>
  theme.withMedia({
    maxWidth: 1176,
    width: '100%',
    flexDirection: ['column', 'row'],
    padding: ['48px 28px 60px', '48px 32px 56px', '60px 56px', '60px 0px'],
    '> * + *': {
      marginTop: [60, 0],
      marginLeft: [0, 16, 20, 24]
    }
  })
);

export const FooterBottomBar = styled(FlexBox)(({ theme }) =>
  theme.withMedia({
    maxWidth: 1176,
    width: '100%',
    flexDirection: ['column', 'row'],
    padding: ['24px 28px', '24px 32px', '24px 56px', '24px 0px'],
    '> * + *': {
      marginTop: [32, 0],
      marginLeft: [0, 16, 20, 24]
    }
  })
);

export const FooterBarColumn = styled(FlexBox)(({ theme }) =>
  theme.withMedia({
    flexDirection: ['column'],
    width: '100%'
  })
);

export const FooterLinksSection = styled(FlexBox)(({ theme }) =>
  theme.withMedia({
    flexDirection: ['column'],
    width: '100%'
  })
);

export const FooterLinksSectionLogo = styled(FlexBox)(({ theme }) =>
  theme.withMedia({
    width: '100%',
    marginBottom: [40, 40, 60],
    height: 48
  })
);

export const FooterLinksSectionTitle = styled(BodyText)(({ theme }) =>
  theme.withMedia({
    marginBottom: 16,
    color: theme.styleguideColors.contentTertiary
  })
);

export const FooterLinkSectionItem = styled.a<{ linkType?: string }>(({ theme, linkType }) =>
  theme.withMedia({
    marginBottom: linkType === 'tos' ? 0 : 8,
    color: theme.styleguideColors.contentOnFill,
    cursor: 'pointer',
    ':hover': {
      fontWeight: theme.typography.fontWeight.semiBold,
      color: theme.styleguideColors.contentTertiary
    },
    lineHeight: '20px'
  })
);

export const FooterSocialsSection = styled(FlexRow)(({ theme }) =>
  theme.withMedia({
    width: [260, 195, 195, '100%'],
    flexWrap: 'wrap',
    marginTop: ['32px', '136px', '136px'],
    height: 80
  })
);

const SocialMediaIconContainer = styled(FlexRow)(({ theme }) =>
  theme.withMedia({
    width: '32px',
    height: '32px',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: [20, 16, 16, 16]
  })
);

export const StyledSocialMediaIcon = styled(SvgIconSocial)(({ theme }) =>
  theme.withMedia({
    color: theme.styleguideColors.contentOnFill,
    position: 'relative',
    bottom: ['unset', '-31px', '-31px'],
    ':after': {
      content: "''",
      position: 'absolute',
      left: '-8px',
      top: '-5px',
      width: '32px',
      height: '32px',
      borderRadius: '16px',
      backgroundColor: theme.styleguideColors.contentOnFill,
      opacity: 0.08
    }
  })
);

const MakeLogoBlackAndWhite = styled(SvgIcon)(({ theme }) =>
  theme.withMedia({
    marginTop: 8,
    'svg path': {
      fill: theme.styleguideColors.contentOnFill
    }
  })
);

const renderFooterLinkSectionItems = (
  data: { label: string; url: string; target?: string }[],
  linkType?: string
) =>
  data.map((item, index) => (
    <FooterLinkSectionItem
      linkType={linkType}
      target={item.target ? item.target : '_blank'}
      href={item.url}
      key={item.label + index}
    >
      <BodyText size={3} scale={'xs'}>
        {item.label}
      </BodyText>
    </FooterLinkSectionItem>
  ));

const renderFooterSocialsSectionItems = (data: any) =>
  data.map((social: any, index: any) => {
    return (
      <SocialMediaIconContainer key={social.label + index}>
        <StyledSocialMediaIcon
          key={social.key + 'icon'}
          socialMediaType={social.key}
          userId={social.urlUserId}
        />
      </SocialMediaIconContainer>
    );
  });

export const PageFooter = () => {
  return (
    <>
      <ContentWrapperTop>
        <FooterTopBar>
          <FooterBarColumn>
            <FooterLinksSection>
              <FooterLinksSectionLogo>
                <SvgIcon src={MakeLogo} alt="Make Logo" width={142} height={48} />
              </FooterLinksSectionLogo>
              <FooterLinksSectionTitle size={1}>{'About MAKE'}</FooterLinksSectionTitle>
              {renderFooterLinkSectionItems(aboutMake())}
            </FooterLinksSection>
            <FooterSocialsSection>
              {renderFooterSocialsSectionItems(makeSocialChannels())}
            </FooterSocialsSection>
          </FooterBarColumn>
          <FooterBarColumn>
            <FooterLinksSection>
              <FooterLinksSectionLogo>
                <SvgIcon src={CsprSuiteLogo} alt="CSPR Suite Logo" width={228} height={40} />
              </FooterLinksSectionLogo>
              <FooterLinksSectionTitle size={1}>{'CSPR Suite'}</FooterLinksSectionTitle>
              {renderFooterLinkSectionItems(aboutCSPRSuite())}
            </FooterLinksSection>
          </FooterBarColumn>
        </FooterTopBar>
      </ContentWrapperTop>

      <ContentWrapperBottom>
        <FooterBottomBar>
          <FooterBarColumn>
            <BodyText variation="darkGray" size={3} scale={'xs'}>
              Powered by
            </BodyText>
            <MakeLogoBlackAndWhite src={MakeLogo} alt="Make Logo" width={66} height={20} />
          </FooterBarColumn>
          <FooterBarColumn>
            <CaptionText variation="darkGray" size={2}>
              Donation Demo version: 0.0.1
            </CaptionText>
          </FooterBarColumn>
          )
        </FooterBottomBar>
      </ContentWrapperBottom>
    </>
  );
};
