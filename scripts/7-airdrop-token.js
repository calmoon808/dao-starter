import sdk from "./1-initialize-sdk.js";

const editionDrop = sdk.getEditionDrop("0x88b4db6af79B04f1bE6eD06230ab5bFcf1db731a");

const token = sdk.getToken("0x29b3A9D9821e121DFec1b852212bB8aFef4f28C5");

(async () => {
    try {
        const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);
        if (walletAddresses.length === 0) {
            console.log("No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!");
            process.exit(0);
        };

        const airdropTargets = walletAddresses.map((address) => {
            const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
            console.log("✅ Going to airdrop", randomAmount, "tokens to", address);
            const airdropTarget = {
                toAddress: address,
                amount: randomAmount
            }

            return airdropTarget;
        });

        console.log("🌈 Starting airdrop...");
        await token.transferBatch(airdropTargets);
        console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
    } catch (err) {
        console.err("Failed to airdrop tokens", err);
    }
})();   