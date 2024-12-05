"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomiclabs/hardhat-ethers"); // Correct plugin
const config = {
    solidity: "0.8.0",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545",
            accounts: ["358cb4289159dd3a86d03cf3f0359b595cea6c914d7ad5cf5f1a90704be95e46"], // Replace with your account's private key
        },
    },
};
exports.default = config;
