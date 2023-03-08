import dotGreen from '~/assets/images/dotGreen.svg';
import dotOrange from '~/assets/images/dotOrange.svg';

export const DATE = 'yyyy/MM/dd';
export const DATE_VI_FORMAT = 'dd/MM/yyyy';
export const DATE_SIMPLE = 'MM/dd';

export const SUCCESS = 'Success'
export const KEY_MESSAGE = 'message'

export const COMMON_PARAMS = {
  page: 1,
  limit: 5,
  sort: 'NAME_ASC'
}

export const PARAMS_GET_ALL = {
  page: 1,
  limit: 999,
  sort: 'NAME_ASC'
}

export const PARAMS_FILTER = {
  page: 1,
  limit: 999,
}

export enum SortIdeas {
  'POPULARITY_ASC' = 'Popularity (Ascending)',
  'POPULARITY_DESC' = 'Popularity (Descending)',
  'DATE_CREATED_ASC' = 'Date create (Ascending)',
  'DATE_CREATED_DESC' = 'Date create (Descending)',
  'LIKE_ASC' = 'Like (Accending)',
  'LIKE_DESC' = 'Like (Descending)',
  'DISLIKE_ASC' = 'Dislike (Ascending)',
  'DISLIKE_DESC' = 'Dislike (Descending)',
}


export enum SortAccount {
  'EMAIL_ASC' = 'Email (Ascending)',
  'EMAIL_DESC' = 'Email (Descending)',
  'NAME_ASC' = 'Name (Ascending)',
  'NAME_DESC' = 'Name (Descending)',
  'DATE_CREATED_ASC' = 'Date create (Accending)',
  'DATE_CREATED_DESC' = 'Date create (Descending)',
}

export enum UserStatus {
  'ACTIVE' = 'Active',
  'INACTIVE' = 'Inactive',
}

export enum Gender {
  'MALE' = 'Male',
  'FEMALE' = 'Female',
}

export enum Role {
  'ADMIN' = 'Admin',
  'STAFF' = 'Staff',
  'QUALITY_ASSURANCE_MANAGER' = 'Quality assurance manager',
  'QUALITY_ASSURANCE_COORDINATOR' = 'Quality assurance coordinator',
}

export enum Category {
  'ADMIN' = 'Admin',
  'STAFF' = 'Staff',
  'QUALITY_ASSURANCE_MANAGER' = 'Quality assurance manager',
  'QUALITY_ASSURANCE_COORDINATOR' = 'Quality assurance coordinator',
}

export enum UserRole {
  Admin = 'ADMIN',
  Staff = 'STAFF',
  QA_M = 'QUALITY_ASSURANCE_MANAGER',
  QA_C = 'QUALITY_ASSURANCE_COORDINATOR',
}

export const userIcon = {
  [-1]: '',
  [UserStatus.ACTIVE]: dotGreen,
  [UserStatus.INACTIVE]: dotOrange,
};

export interface Status {
  value: 'ACTIVE' | 'INACTIVE'
}

export const MAX_LENGTH = 255;
