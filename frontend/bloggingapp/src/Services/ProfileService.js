export default {
    getProfile: ({ username }) => {
        const url = "/user/" + username;
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
    // postTodo: (todo) => {
    //     return fetch("/user/todo", {
    //         method: "post",
    //         body: JSON.stringify(todo),
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     }).then((response) => {
    //         if (response.status !== 401) {
    //             return response.json().then((data) => data);
    //         } else
    //             return { message: { msgBody: "UnAuthorized" }, msgError: true };
    //     });
    // },
};
