import { theme, ThemeColors } from '~/types/theme';
import * as icons from './svg';

interface IconProps {
  name: keyof typeof icons;
  size?: string;
  color?: ThemeColors;
}

const Icon = ({ name, size = '20', color = 'white' }: IconProps) => {
  const SvgIcon = icons[name];
  return <SvgIcon width={size} height={size} color={theme.colors[color]} />;
};

export default Icon;
