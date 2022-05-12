module.exports = (connection, DataTypes) => {
    const schema = {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Valid Email required'
                },
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [8],
                    msg: 'Password must be 8 characters or more'
                },
            }
        },
    };

    const ReaderModel = connection.define('Reader', schema);
    return ReaderModel;
};