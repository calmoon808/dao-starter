import sdk from "./1-initialize-sdk.js";

(async () => {
    try {
        const voteContractAddress = await sdk.deployer.deployVote({
            name: "DCSDAO Governance",
            voting_token_address: "0x29b3A9D9821e121DFec1b852212bB8aFef4f28C5",
            // on Ethereum one block time = 13.14 seconds
            
            // delay for when people can start voting
            voting_delay_in_blocks: 0,
            // how long voters will have to vote; 1 day = 6570 blocks
            voting_period_in_blocks: 6570,
            // minimum % of the total supply that need to vote for the proposal to be valid after the time for the proposal has ended.
            voting_quorum_fraction: 0,
            // minimum # of tokens a use needs to be allowed to create a proposal
            proposal_token_threshold: 0,
        });

        console.log("✅ Successfully deployed vote contract, address:", voteContractAddress);
    } catch (err) {
        console.error("Failed to deploy vote contract", err);
    }
})();