import { sign, type JwtPayload, verify } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1d",
};

/** sign 함수를 통해서 token을 얻어내서 리턴하는 함수 */
export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  const SECRET_KEY = process.env.SECRET_KEY!;
  const token = sign(payload, SECRET_KEY, options);
  return token;
}

/** token이 정확한 건지 체크하는 함수가 있어야 함 */
export function verifyJwt(token: string) {
  try {
    const SECRET_KEY = process.env.SECRET_KEY!;
    const decoded = verify(token, SECRET_KEY);
    return decoded as JwtPayload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
