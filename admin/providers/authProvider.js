// in src/authProvider.js
const authProvider = {
  // called when the user attempts to log in
  login: ({ username, password }) => {
    const request = new Request(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/login`,
      {
        method: 'POST',
        body: JSON.stringify({ email: username, password }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      }
    );

    return fetch(request)
      .then((response) => {
        console.log(response);
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((resp) => {
        console.log(resp);
        localStorage.setItem('token', JSON.stringify(resp.token));
        localStorage.setItem('user', JSON.stringify(resp.user));
      })
      .catch((error) => {
        throw new Error(error.message ? error.message : 'Network error');
      });
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};

export default authProvider;
