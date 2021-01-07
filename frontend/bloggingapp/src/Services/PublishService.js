export default {
    publish: (article) => {
        return fetch("/publish", {
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
