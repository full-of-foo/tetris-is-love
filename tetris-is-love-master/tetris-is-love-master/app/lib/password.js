import bcrypt from 'bcryptjs';

const getSafePassword = password => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
};

export {getSafePassword};
