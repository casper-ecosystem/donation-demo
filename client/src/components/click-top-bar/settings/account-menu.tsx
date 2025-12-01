import { AccountCardMenuItem, AccountMenuItem, BadgeProps } from '@make-software/csprclick-ui';
import CSPRClickIcon from 'assets/logos/click-logo.svg';
import CloudIcon from 'assets/logos/cloud.svg';
import DocsIcon from 'assets/logos/docs.svg';

const openInNewTab = (url: string) => () => window.open(url, '_blank');

type MenuItemConfig = {
    label: string;
    url: string;
    badge?: BadgeProps,
    icon?: any;
};

const menuConfig: MenuItemConfig[] = [
    {
        label: 'CSPR.click docs',
        url: 'https://docs.cspr.click',
        icon: CSPRClickIcon,
    },
    {
        label: 'CSPR.cloud docs',
        url: 'https://docs.cspr.cloud',
        icon: CloudIcon
    },
    {
        label: 'Odra docs',
        url: 'https://odra.dev/docs',
        icon: DocsIcon
    }
];

export const accountMenuItems = [
    <AccountCardMenuItem key="account-card" />,
    ...menuConfig.map((item: MenuItemConfig, index: number) => (
        <AccountMenuItem
            key={index}
            onClick={openInNewTab(item.url)}
            icon={item.icon}
            label={item.label}
            {...(item.badge && { badge: item.badge })}
        />
    ))
];
