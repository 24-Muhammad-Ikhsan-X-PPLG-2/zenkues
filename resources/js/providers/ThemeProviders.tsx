import { parseSettings } from '@/lib/settingsDB';
import { User } from '@/types';
import { ThemeProvider } from 'next-themes';
import { FC, ReactNode } from 'react';

type Props = {
    children: ReactNode;
    user: User | null;
};

const ThemeProviders: FC<Props> = ({ children, user }) => {
    const settings = parseSettings(user?.settings ?? null);
    return (
        <ThemeProvider attribute={'class'} defaultTheme={settings?.appearance.theme ?? 'light'} enableSystem={true}>
            {children}
        </ThemeProvider>
    );
};

export default ThemeProviders;
