const jasmineErrorHandler = (err, done) => {
    console.error('Async Jasmine error: :', err);
    expect(true).toBe(false);
    done();
};

export {jasmineErrorHandler};
