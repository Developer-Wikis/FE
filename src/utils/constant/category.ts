const MAIN_CATEGORIES = ['fe', 'be'] as const;

const feSubCategory = [
  'basic',
  'css',
  'html',
  'javascript',
  'react',
  'design_pattern',
  'network/security',
  'database',
  'os',
  'data_structure/algorithm',
] as const;

const beSubCategory = [
  'basic',
  'java',
  'spring',
  'design_pattern',
  'infra/engineering',
  'network/security',
  'database',
  'os',
  'data_structure/algorithm',
] as const;

const SUB_CATEGORIES: Record<string, typeof feSubCategory | typeof beSubCategory> = {
  fe: feSubCategory,
  be: beSubCategory,
} as const;

export type MainType = typeof MAIN_CATEGORIES[number];

type FESubType = typeof feSubCategory[number];
type BESubType = typeof beSubCategory[number];
export type SubType = FESubType | BESubType;
export type SubWithAllType = SubType | 'all';

export { MAIN_CATEGORIES, SUB_CATEGORIES };
