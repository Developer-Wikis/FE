export const middleCategories = [
  'FE 기본',
  'BE 기본',
  'CSS',
  'HTML',
  'JS',
  'REACT',
  'java',
  'spring',
  '네트워크',
  '데이터베이스',
  '디자인패턴',
  '보안',
  '운영체제',
  '자료구조/알고리즘',
  '인프라/엔지니어링',
];

export const categories = {
  fe: [
    'FE 기본',
    'CSS',
    'HTML',
    'Javascript',
    'React',
    '네트워크',
    '디자인패턴',
    '보안',
    '자료구조/알고리즘',
  ],
  be: [
    'BE 기본',
    'Java',
    'Spring',
    '네트워크',
    '데이터베이스',
    '디자인패턴',
    '보안',
    '운영체제',
    '자료구조/알고리즘',
    '인프라/엔지니어링',
  ],
};

export type MainCategory = keyof typeof categories;
