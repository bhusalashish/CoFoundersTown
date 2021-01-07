const baseurl = "https://mighty-chamber-79109.herokuapp.com";

export default {
    getProfile: ({ username }) => {
        const url = baseurl + "/user/" + username;
        return fetch(url).then((response) => {
            if (response.status !== 401) {
                return response.json().then((data) => data);
            } else
                return {
                    message: {
                        msgBody: "You are UnAuthorized",
                        msgError: true,
                    },
                };
        });
    },
};
