import { MainType, SubType, SubWithAllType } from '../constant/category';
import { mainCategories, subCategories } from './converter';

export function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String;
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
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

export function isBrowser() {
  return typeof window !== 'undefined';
}

export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

export function isMocking() {
  return process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';
}
