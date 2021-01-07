export default {
    getBlogs: () => {
        console.log("we masd");
        return fetch("http://localhost:4000/").then((response) => {
            if (response.status !== 401) {
                console.log(response);
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
