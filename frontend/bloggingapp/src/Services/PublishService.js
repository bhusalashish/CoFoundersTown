const baseurl = "https://mighty-chamber-79109.herokuapp.com";

export default {
    publish: (article) => {
        const url = baseurl + "/publish";
        return fetch(url, {
            method: "post",
            body: JSON.stringify(article),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.status !== 401) {
                return response.json().then((data) => data);
            } else
                return { message: { msgBody: "UnAuthorized" }, msgError: true };
        });
    },
};
