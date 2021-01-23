export const wrapper = (promise: Promise<any>): Promise<{ data: any; error: any }> =>
    promise.then((data) => ({ data, error: null })).catch((error) => ({ error, data: null }));
