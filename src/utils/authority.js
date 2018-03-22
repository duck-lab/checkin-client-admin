// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('antd-pro-authority') || 'admin';
}

export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', authority);
}

export function setAccessToken(token) {
  localStorage.setItem('accessToken', token.accessToken || null);
  localStorage.setItem('accessTokenExpiresAt', token.accessTokenExpiresAt || null);
  localStorage.setItem('refreshToken', token.refreshToken || null);
  localStorage.setItem('refreshTokenExpiresAt', token.refreshTokenExpiresAt || null);
  return
}
