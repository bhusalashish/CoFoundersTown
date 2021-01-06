const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            index: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            index: true,
            unique: true,
        },
        name: {
            first_name: {
                type: String,
                required: true,
            },
            last_name: {
                type: String,
                required: true,
            },
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
        },
        // articles: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: Article,
        //     },
        // ],
    },
    { timestamps: true }
);

UserSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    } else {
        bcrypt.hash(this.password, 10, (err, HashedPassword) => {
            if (err) {
                return next(err);
            } else {
                this.password = HashedPassword;
                next();
            }
        });
    }
});

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return callback(err);
        if (!isMatch) return callback(null, isMatch);
        return callback(null, this);
    });
};

module.exports = mongoose.model("User", UserSchema);
