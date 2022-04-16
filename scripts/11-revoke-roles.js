import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0x29b3A9D9821e121DFec1b852212bB8aFef4f28C5");

(async () => {
    try {
        const allRoles = await token.roles.getAll();
        console.log("👀 Roles that exist right now:", allRoles);

        // Revoke all the superpowers your wallet had over the ERC-20 contract.
        await token.roles.setAll({ admin: [], minter: [] });
        console.log("🎉 Roles after revoking ourselves", await token.roles.getAll());
        console.log("✅ Successfully revoked our superpowers from the ERC-20 contract");
    } catch (err) {
        console.error("failed to revoke personal wallet from DAO treasury", err);
    }
})();