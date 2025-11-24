import React from 'react';
import { BodyText, CaptionText } from '@make-software/cspr-design';

import MakeLogo from '@/assets/logos/make-full.svg';

import { FooterBarColumn, FooterBottomBar, MakeLogoBlackAndWhite } from '../styled';

export const FooterBottomBarContent: React.FC = () => (
  <FooterBottomBar>
    <FooterBarColumn>
      <BodyText variation="darkGray" size={3} scale="xs">
        Powered by
      </BodyText>
      <MakeLogoBlackAndWhite src={MakeLogo} alt="Make Logo" width={66} height={20} />
    </FooterBarColumn>
    <FooterBarColumn>
      <CaptionText variation="darkGray" size={2}>
        Donation Demo version: 0.0.1
      </CaptionText>
    </FooterBarColumn>
  </FooterBottomBar>
);
