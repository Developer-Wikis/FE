import { theme, ThemeColors } from '~/types/theme';
import IconButton from './IconButton';
import * as icons from './svg';
export interface IconProps {
  name: keyof typeof icons;
  size?: string;
  color?: ThemeColors;
}

const Icon = ({ name, size = '20', color = 'white', ...props }: IconProps) => {
  const SvgIcon = icons[name];
  return <SvgIcon width={size} height={size} color={theme.colors[color]} {...props} />;
};

Icon.Button = IconButton;

export default Icon;
