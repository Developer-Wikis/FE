import { MainType, MAIN_CATEGORIES, SubWithAllType, SUB_CATEGORIES } from '../constant/category';
import { convertMainCategory, convertSubCategory } from './converter';

export function getMainCategorySelectList() {
  return MAIN_CATEGORIES.map((mainCode) => ({
    value: mainCode,
    text: convertMainCategory(mainCode),
  }));
}

export function getSubCategorySelectList(mainCategory: MainType) {
  return SUB_CATEGORIES[mainCategory].map((subCode) => ({
    value: subCode,
    text: convertSubCategory(subCode),
  }));
}

export function getSubCategoryWithAllSelectList(mainCategory: MainType) {
  return ['all', ...SUB_CATEGORIES[mainCategory]].map((subCode) => ({
    value: subCode,
    text: convertSubCategory(subCode as SubWithAllType),
  }));
}
