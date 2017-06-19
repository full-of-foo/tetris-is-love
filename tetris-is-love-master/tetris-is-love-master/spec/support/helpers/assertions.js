const _assertRes = (res, statusCode) => {
    return new Promise((resolve, reject) => {
        if(!res) return reject(false);

        expect(res.statusCode).toEqual(422);
        expect(res.data).toEqual({});
        return resolve(res);
    });
};

const assertResNotFound = res => _assertRes(res, 404);
const assertResUnprocessable = res => _assertRes(res, 422);

export {assertResNotFound, assertResUnprocessable};
