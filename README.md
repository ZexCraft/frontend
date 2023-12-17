# TODO

### Frontend

1. Refactor NFT page UI

   - Instead of first transaction make signature
   - Instead of second transaction make user sign
     - Setup api/ to receive and make a transaction using DEV wallet
     - Send transaction hash back
   - Display transaction hash
   - Make supabase create NFT work

2. Refactor Create Relationship page UI

   - Send Relationship Request
   - If you own the NFT, display all relationship requests. On relationship created, direct to relationship page confetti animation
   - If you do not own the NFT, show all of your NFTs to form the relationship.
   - Relationship page. Display NFT and your children etc.

3. Tree??? - NO

### Integrations

1. Make Supabase work
2. Setup ethers/viem code to send transactions from the backend
3. Store signatures in the backend in case we need consent in the relationship

### Contracts

1. Signature verifications
   1. Check in InCraft contract => Create mint
   2. Check in Relationship Registry => Create relationship
   3. Check in Relationship => Before every transaction
   4. Check in ERC6551 Account => Before every transaction
   5. If possible, change the ERC20 to ERC20Permit

### Backend

1. Setup Supabase for usecase
2. Iterative fetching the only solution?

## Pitch

1. Design a pitch
