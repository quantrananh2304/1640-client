import dotGreen from '~/assets/images/dotGreen.svg';
import dotOrange from '~/assets/images/dotOrange.svg';

export const DATE = 'yyyy/MM/dd';
export const DATE_VI_FORMAT = 'dd/MM/yyyy';
export const DATE_SIMPLE = 'MM/dd';

export const SUCCESS = 'Success'

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

export const userIcon = {
  [-1]: '',
  [UserStatus.ACTIVE]: dotGreen,
  [UserStatus.INACTIVE]: dotOrange,
};

export interface Status {
  value: 'ACTIVE' | 'INACTIVE'
}

export const MAX_LENGTH = 255;
