import { MainType, SubType, SubWithAllType } from '../constant/category';
import { mainCategories, subCategories } from './converter';

export function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String;
}

export function isMainType(value: unknown): value is MainType {
  return isString(value) && value in mainCategories;
}

export function isSubType(value: unknown): value is SubType {
  return isString(value) && value in subCategories;
}

export function isSubWithAllType(value: unknown): value is SubWithAllType {
  return isSubType(value);
}
