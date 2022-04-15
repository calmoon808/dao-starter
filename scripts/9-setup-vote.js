import sdk from "./1-initialize-sdk.js";

const vote = sdk.getVote("0x97B0583C8732e262ac9F3D404ab57d789cA69954");
const token = sdk.getToken("0x29b3A9D9821e121DFec1b852212bB8aFef4f28C5");

(async () => {
    try {
        // Give our treasury the power to mint additional token if needed
        await token.roles.grant("minter", vote.getAddress());
        console.log("successfully gave vote contract permissions to act on token contract");
    } catch (err) {
        console.error("failed to grant vote contract permissions on token contract", err);
        process.exit(1);
    }

    try {
        // Grab our wallet's token balance
        const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);

        // Grab 90% of the supply that we hold
        const ownedAmount = ownedTokenBalance.displayValue;
        const percent90 = Number(ownedAmount) / 100 * 90;

        // Transfer 90% of the held supply to the voting contract
        await token.transfer(
            vote.getAddress(),
            percent90
        );

        console.log("✅ Successfully transferred " + percent90 + " tokens to vote contract");
    } catch (err) {
        console.error("failed to transfer tokens to vote contract", err);
    }
})();