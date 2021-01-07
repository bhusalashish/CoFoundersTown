const baseurl = "https://mighty-chamber-79109.herokuapp.com";
const AuthService = {
    login: (user) => {
        // console.log(user);
        const url = baseurl + "/user/login";
        console.log(url);
        return fetch(url, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.status !== 401) return res.json().then((data) => data);
            else
                return {
                    isAuthenticated: false,
                    user: { username: "", name: {} },
                };
        });
    },
    register: (user) => {
        // console.log(user);
        const url = baseurl + "/user/register";
        return fetch(url, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => data);
    },
    logout: () => {
        const url = baseurl + "/user/logout";
        return fetch(url).then((res) => {
            if (res.status !== 401) return res.json().then((data) => data);
            else {
                return {
                    isAuthenticated: false,
                    user: { username: "", name: {} },
                };
            }
        });
    },
    isAuthenticated: () => {
        const url = baseurl + "/user/isAuthenticated";
        return fetch(url).then((res) => {
            if (res.status !== 401) return res.json().then((data) => data);
            else
                return {
                    isAuthenticated: false,
                    user: "",
                };
        });
    },
};

export default AuthService;
