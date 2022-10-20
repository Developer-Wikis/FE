import { MainType, SubWithAllType } from '../constant/category';

export const mainCategories = {
  fe: '프론트엔드',
  be: '백엔드',
} as const;

export const subCategories = {
  all: '전체',
  basic: '기본',
  css: 'CSS',
  html: 'HTML',
  javascript: 'JS',
  react: 'React',
  design_pattern: '디자인패턴',
  'network/security': '네트워크/보안',
  database: '데이터베이스',
  os: '운영체제',
  'data_structure/algorithm': '자료구조/알고리즘',
  java: 'Java',
  spring: 'Spring',
  'infra/engineering': '인프라/엔지니어링',
} as const;

export function convertMainCategory(code: MainType) {
  return mainCategories[code];
}

export function convertSubCategory(code: SubWithAllType) {
  return subCategories[code];
}
