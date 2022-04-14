import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
      // name of ERC-1155 collection
      name: "DCSDAO Membership",
      // description for collection
      description: "A token for the DSCDAO platform",
      // image that will be held the NFT
      image: readFileSync("scripts/assets/riddim.PNG"),
      // We need to pass in the address of the person who will bereceiving the proceeds from sales of nfts in the contract.
      // We're planning on not charging people for the drop, so we pass in the 0x0 address
      // you can  set this to your own wallet address if you want to charge for the drop.
      primary_sale_recipient: AddressZero,
    });

    // this init function returns the address of our contract,
    // we use this to init the contract on the thirdweb sdk
    const editionDrop = sdk.getEditionDrop(editionDropAddress);

    // this function gets the metadata of our contract
    const metadata = await editionDrop.metadata.get();

    console.log(
      "✅ Successfully deployed editionDrop contract, address:",
      editionDropAddress
    );
    console.log("✅ editionDrop metadata:", metadata);
  } catch (err) {
    console.error("failed to deploy editionDrop contract", err);
  }
})();