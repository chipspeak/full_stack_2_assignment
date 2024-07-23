const fakeAuth = async (username: string, password: string): Promise<string> => {
  // Simulateing an API call to test the authentication
  return new Promise((resolve, reject) => {

    // Checking if the username is 'user1' and the password is not empty (its generated randomly as is)
    if (username === 'user1' && password.length > 0) {
      resolve('fake-token');
    } else {
      reject('Authentication failed');
    }
  });
};

export default fakeAuth;
