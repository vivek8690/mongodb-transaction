// eslint-disable-next-line strict
const mongoose = require('mongoose');

const { Schema } = mongoose;

const isBalanceExceeds = function() {
    if (this.accountType === 'basicsavings') {
        return this.balance < 50000;
    }
    return true;
};

const AccountSchema = new Schema({
    accountType: {
        type: String,
        enum: ['savings', 'current', 'basicsavings'],
    },
    customerName: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
        validate: [isBalanceExceeds, `balance should
         not exceed 50,000 in  BasicSavings`],
    },
}, { timestamps: true });

module.exports = mongoose.model('Account', AccountSchema);
