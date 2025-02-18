export function jwtDecode(token: string): any {
  const jwtContent = Buffer.from(token.split('.')[1], 'base64url').toString();
  return JSON.parse(jwtContent);
}
