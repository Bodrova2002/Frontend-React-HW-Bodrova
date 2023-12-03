const users = {
    username1: {
        password: 'password1',
        name: 'User One'
    },
    username2: {
        password: 'password2',
        name: 'User Two'
    }
};

export const authenticate = (username, password) => {
    if (users[username] && users[username].password === password) {
        localStorage.setItem('authenticatedUser', JSON.stringify(users[username]));
        return true;
    }
    return false;
};

export const logout = () => {
    localStorage.removeItem('authenticatedUser');
};