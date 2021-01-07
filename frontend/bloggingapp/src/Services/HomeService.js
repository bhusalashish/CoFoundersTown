const baseurl = "https://mighty-chamber-79109.herokuapp.com";

export default {
    getBlogs: () => {
        const url = baseurl + "/";
        return fetch(url).then((response) => {
            if (response.status !== 401) {
                return response.json().then((data) => data);
            } else
                return {
                    message: {
                        msgBody: "Something went Wrong",
                        msgError: true,
                    },
                };
        });
    },
};
