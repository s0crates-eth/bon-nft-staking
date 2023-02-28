// import contract data
const EthDenverBonNft = (
	{}
);


class EthDenverBonNftMinter {
  constructor() {
    this.CONTRACT_ADDRESS = '0xA0Fa98901f9Ac8Fd0d59D281677a140664E6C0AE';
    this.currentAccount = '';
    this.selectedMintQuantity = 1;

    this.connectButton = document.getElementById('connectButtonHTML');
    this.mintButton = document.getElementById('mintButtonHTML');

    this.NFTCostAmount = 0.69; // 690000000000000000
  }

  

  async connectWallet() {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('Connected', accounts[0]);
      this.currentAccount = accounts[0]; 
      this.connectButton.innerText = `${
        this.currentAccount.substring(0, 6)}...${
          this.currentAccount.substring((this.currentAccount.length-4), this.currentAccount.length)
      }`;

      this.setupEventListener();

    } catch (error) {
      console.log(error);
    }
  }

  async setupEventListener() {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          this.CONTRACT_ADDRESS,
          EthDenverBonNft.abi,
          signer
        );

        connectedContract.on('NewNFTMinted', (from, tokenId) => {
          console.log(from, tokenId.toNumber());
          alert(
            `Congrats! You've minted your NFT and sent it to your wallet! 
            It should take less than 10 min to show up on OpenSea.`
          );
        });

        console.log('Setup event listener!');
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async askContractToMintNft() {
    try {
        const { ethereum } = window;
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const connectedContract = new ethers.Contract(
            this.CONTRACT_ADDRESS,
            EthDenverBonNft.abi,
            signer
          );
  
          this.mintButton.innerText = '*please wait*';
          this.mintButton.disabled = true;
  
          const options = {
            value: ethers.utils.parseEther(
              `${this.selectedMintQuantity * this.NFTCostAmount}`
            ),
          };
          console.log(
            `Going to try enact a transaction to mint ${this.selectedMintQuantity} NFTs for a total of ${this.selectedMintQuantity * this.NFTCostAmount}MATIC.`
          );
          let nftTxn = await connectedContract.mint(
            String(this.selectedMintQuantity),
            options
          );
  
          console.log('Mining...please wait.');
          await nftTxn.wait();
  
          console.log(
            `Mined, see transaction: https://polygonscan.com/tx/${nftTxn.hash} && see NFT: https://opensea.io/assets/matic/${this.CONTRACT_ADDRESS}/${tokenId.toNumber()}`
          );
  
          alert(
            `Minted! TXN: https://polygonscan.com/tx/${nftTxn.hash} && NFT: https://opensea.io/assets/matic/${this.CONTRACT_ADDRESS}/${tokenId.toNumber()}`
          );
  
          this.mintButton.innerText = 'MINT AGAIN';
          this.mintButton.disabled = false;
        } else {
          console.log("Ethereum object doesn't exist!");
          alert(
            `Error -- please check your settings`
          );
          this.mintButton.innerText = '-MINT AGAIN-';
          this.mintButton.disabled = false;
        }
    } catch (error) {
        console.log(error);
        alert(
          `Error -- please check your settings`
        );
        this.mintButton.innerText = '-MINT AGAIN-';
        this.mintButton.disabled = false;
    }
  }

  async checkIfWalletIsConnected() {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have metamask!');
      return;
    } else {
      console.log('We have the ethereum object', ethereum);
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log('Found an authorized account:', account);
      this.currentAccount = account;
      this.connectButton.innerText = `${
        this.currentAccount.substring(0, 6)}...${
          this.currentAccount.substring((this.currentAccount.length-4), this.currentAccount.length)
      }`;

      this.setupEventListener();

    } else {
      console.log('No authorized account found');
    }

    let chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log('Connected to chain ' + chainId);

    const polygonChainId = '0x89';
    if (chainId !== polygonChainId) {
      alert(
        'You are NOT connected to the POLYGON MAINNET! If you mint on any other network it will NOT WORK!'
      );
    }
  }
}

const EthDenverBonNftMinter_ = new EthDenverBonNftMinter();
EthDenverBonNftMinter_.checkIfWalletIsConnected();