import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0x29b3A9D9821e121DFec1b852212bB8aFef4f28C5");

(async () => {
    try {
        const amount = 1000000;
        await token.mint(amount);
        const totalSupply = await token.totalSupply();
        console.log("✅ There now is", totalSupply.displayValue, "$HOKAGE in circulation");
    } catch (err) {
        console.error("Failed to print money", err);
    }
})();