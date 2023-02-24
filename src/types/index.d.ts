export interface IParam {
  take?: number,
  page?: number,
}

export type UserInfoState = {
  "firstName": string;
  "phoneNumber"?: string;
  "lastName"?: string;
  "givenName"?: string;
  "avatar"?: string,
  "email"?: string;
  "role"?: string;
  "address"?: string;
  "dob"?: any;
  "gender"?: string;
  "_id": string
}