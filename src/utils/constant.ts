import dotGreen from '~/assets/images/dotGreen.svg';
import dotOrange from '~/assets/images/dotOrange.svg';

export const DATE = 'yyyy/MM/dd';
export const DATE_VI_FORMAT = 'dd/MM/yyyy';
export const DATE_SIMPLE = 'MM/dd';


export enum UserStatus {
  'ACTIVE' = 'Active',
  'INACTIVE' = 'Inactive',
}

export enum Gender {
  'MALE' = 'Male',
  'FEMALE' = 'Female',
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
