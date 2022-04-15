import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";

(async () => {
    try {
        const tokenAddress = await sdk.deployer.deployToken({
            name: "DCSDAO Governance Token",
            symbol: "DCS",
            primary_sale_recipient: AddressZero,
        });
        console.log(
            "✅ Successfully deployed token module, address:",
            tokenAddress,
        );
    } catch (err) {
        console.error("failed to deploy token module", err);
    }
})();