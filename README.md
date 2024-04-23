## Supermajority.info
In a world where a single bug can cause significant problems, having a variety of software clients is crucial for the fault tolerance of the Ethereum network. This project aims to explore the diversity of these clients by collecting and analyzing data.

A client software that is used by more than 2/3 of all active validators is considered a supermajority client. It has the capability to finalize the chain without the agreement of the other clients. A consensus bug within such a client would cause catastrophic results, such as a network split, loss of funds, and reputation damage.

Previously, publicly available data wasn't as helpful because it was based on **nodes** instead of **validators**. This project specifically targets validators to provide an improved view of client diversity, especially in the context of the proof-of-stake protocol.

The popular website clientdiversity.org relies on data from supermajority.info to track the diversity of execution clients.

### Methodology
**Requesting Data from Staking Services**
The project actively requests data from platforms where Ether is staked, to accurately identify which execution clients are being utilized.

**Using Public Data**
The data is enhanced by adding information from public sources such as blogs, forums, and other open platforms. This method of integrating various sources helps to obtain a better picture of the distribution of clients across the ecosystem.

**Developing Analysis Tools**
Once the data is collected, the project analyzes it and shares the insights via an easy-to-use dashboard. This dashboard not only presents the findings but also enables simulations, allowing users to explore different scenarios.

### Expected Impact
This project aims to encourage the use of different clients, making Ethereum more bug-resistant and less dependent on any single software. By providing more accurate data, it helps ensure Ethereum remains resistant to failures and manipulation.

Thanks to strong support from the community and staking operators, significant progress has already been made, reducing Geth dominance from ~84% to ~63%. This achievement demonstrates the effectiveness of the project in enhancing the decentralization and resilience of Ethereum.
