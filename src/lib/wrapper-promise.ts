function wrapPromise<T>(promise: Promise<T>) {
    let status = "pending";
    let result: T;
    let error: any;

    const suspender = promise.then(
        (r) => {
            status = "success";
            result = r;
        },
        (e) => {
            status = "error";
            error = e;
        }
    );

    return {
        read() {
            if (status === "pending") throw suspender;
            if (status === "error") throw error;
            if (result === undefined) throw new Error("No result available");
            return result;
        },

        getStatus: () => status
    };
}

export default wrapPromise;