// export type SignUpForm = {
//   apiKey: string;
//   password: string;
//   email: string;
//   nickname: string;
// };

export interface SignUpFormVO {
  apiKey: SignUpPropertyValidation;
  password: SignUpPropertyValidation;
  email: SignUpPropertyValidation;
  nickname: SignUpPropertyValidation;
}


type SignUpPropertyValidation = {
  text: string;
  checkDuplicate: boolean;
};
