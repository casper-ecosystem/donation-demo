import React from 'react';
import { Tooltip as UiTooltip, TooltipProps } from '@make-software/cspr-design';

export const Tooltip = (props: TooltipProps) => (
  <UiTooltip scale={'xs'} lineHeight={'xs'} paddingScale={1} {...props} />
);
