import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

const editionDrop = sdk.getEditionDrop("0x88b4db6af79B04f1bE6eD06230ab5bFcf1db731a");

(async () => {
  try {
    // Define claim conditions
    const claimConditions = [{
      // when people are going to be able to start claiming NFTs (now)
      startTime: new Date(),
      // The max number of NFTs that can be claimed.
      maxQuantity: 50_000,
      // The price of the NFT (free)
      price: 0,
      // The amount of NFTs people can claim in one transaction
      quantityLimitPerTransaction: 1,
      // We set the wait between txs to MaxUint256, which means a person can only claim the NFT once.
      waitInSeconds: MaxUint256,
    }]

    // pass tokenId and claimConditions in to func
    await editionDrop.claimConditions.set("0", claimConditions);
    console.log("✅ Sucessfully set claim condition!")
  } catch (err) {
    console.error("Failed to set claim condition", err);
  }
})();