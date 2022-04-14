import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x88b4db6af79B04f1bE6eD06230ab5bFcf1db731a");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Riddim Boat",
        description: "This NFT will give you access to DSCDAO",
        image: readFileSync("scripts/assets/riddim.PNG"),
      }
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (err) {
    console.error("failed to create the new NFT", err);
  }
})();