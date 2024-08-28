export interface Signin {
  apiKey: string;
  password: string;
  email: string;
}

export interface Signup {
  apiKey: SignupItemForm;
  password: SignupItemForm;
  email: SignupItemForm;
  nickname: SignupItemForm;
}

type SignupItemForm = {
  text: string;
  checkDuplicate: boolean;
};
