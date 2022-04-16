import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

const vote = sdk.getVote("0x97B0583C8732e262ac9F3D404ab57d789cA69954");
const token = sdk.getToken("0x29b3A9D9821e121DFec1b852212bB8aFef4f28C5");

(async () => {
    try {
        // Create proposal to mint 420,000 new tokens to the treasury
        const amount = 420000;
        const description = `Should the DAO mint an additional ${amount} tokens into the treasury?`;
        const executions = [{
            // token address that executes the mint
            toAddress: token.getAddress(),
            // nativeTokenValue is the amount of ETH we want to send in this proposal
            // In this casem we are sending nothing since we are just minting new tokens to the treasury
            nativeTokenValue: 0,
            // tx data needs to be in wei
            transactionData: token.encoder.encode(
                "mintTo",
                [vote.getAddress(), ethers.utils.parseUnits(amount.toString(), 18)]
            )
        }];

        await vote.propose(description, executions);
        console.log("✅ Successfully created proposal to mint tokens");
    } catch (err) {
        console.error("failed to create first proposal", err);
        process.exit(1);
    }

    try {
        // Create proposal to transfer myself 6,900 tokens 
        const amount = 6900;
        const description = `Should the DAO transfer ${amount} tokens from the treasury to ${process.env.WALLET_ADDRESS} just cuz?`;
        const executions = [{
            toAddress: token.getAddress(),
            nativeTokenValue: 0,
            transactionData: token.encoder.encode(
                "transfer",
                [process.env.WALLET_ADDRESS, ethers.utils.parseUnits(amount.toString(), 18)]
            )
        }]
        await vote.propose(description, executions);
        console.log("✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!");
    } catch (err) {
        console.log("failed to create second proposal", err);
    }
})();