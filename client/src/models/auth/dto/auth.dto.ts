// export interface SignIn {
//   apiKey: string;
//   password: string;
//   email: string;
// }

export interface SignUp {
  apiKey: SignUpItemForm;
  password: SignUpItemForm;
  email: SignUpItemForm;
  nickname: SignUpItemForm;
}

type SignUpItemForm = {
  text: string;
  checkDuplicate: boolean;
};
