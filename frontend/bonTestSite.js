// import contract data
const bonTestStakingAbi = (
	{
    "contractName": "bonTestStaking",
    "abi":
    [
      {
        "inputs": [],
        "name": "closePool",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "flipStakeState",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "",
            "type": "bytes"
          }
        ],
        "name": "onERC721Received",
        "outputs": [
          {
            "internalType": "bytes4",
            "name": "",
            "type": "bytes4"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_nftAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_tokenAddress",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "newStaked",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "reward",
            "type": "uint256"
          }
        ],
        "name": "newUnstaked",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          }
        ],
        "name": "setPrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_rwdRate",
            "type": "uint256"
          }
        ],
        "name": "setRate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_minimumTime",
            "type": "uint256"
          }
        ],
        "name": "setTime",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "unstake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "calculateRewards",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "calculateTime",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "erc20Token",
        "outputs": [
          {
            "internalType": "contract IERC20",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "isStakeActive",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "isStaked",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "minimumTime",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "nft",
        "outputs": [
          {
            "internalType": "contract IERC721",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "price",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "rwdRate",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "tokenOwnerOf",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "tokenStakedAt",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
    ,
  }

);


class bonTestStakingJS {
  constructor() {
    this.CONTRACT_ADDRESS = '0x5a1bfc5CAf4117f5C64525Fe4931acc9d79e11AE';
    this.currentAccount = '';
    this.selectedUnit = 0;
    this.cost1Amount = 0.42; // 420000000000000000matic
    this.cost2Amount = 0.01; // 10000000000000000matic

    this.unitInput = document.getElementById('unitInputHTML');
    this.connectButton = document.getElementById('connectButtonHTML');
    this.call1Button = document.getElementById('call1ButtonHTML');
    this.call2Button = document.getElementById('call2ButtonHTML');
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
          bonTestStakingAbi.abi,
          signer
        );

        connectedContract.on('newStaked', (sender, tokenId) => {
          console.log(sender, tokenId.toNumber());
          alert(
            `Congrats! You've staked NFT #${tokenId}!`
          );
        });

        connectedContract.on('newUnstaked', (sender, tokenId, reward) => {
          console.log(sender, tokenId.toNumber(), reward.toNumber());
          alert(
            `Congrats! You've unstaked NFT #${tokenId} and claimed your reward of ${reward}!`
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

  //Call1 ////////////////////////////this is NOOOOOOOOOOOOOOOOOOOTTTTTTTTTTTTTTTTT working
  // error hits BEFORE it goes to metamask -- could be due to arguements
  async askContractToStake() {
    if(this.selectedUnit < 1){
      alert(
        `Please input your unit ID.`
      );
    }
    if(this.selectedUnit >= 1){  
      try {
          const { ethereum } = window;
    
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const connectedContract = new ethers.Contract(
              this.CONTRACT_ADDRESS,
              bonTestStakingAbi.abi,
              signer
            );
    
            this.call1Button.innerText = '*please wait*';
            this.call1Button.disabled = true;
    
            const options = {
              value: ethers.utils.parseEther(
                `${this.cost1Amount}`
              ),
            };

            console.log(
              `New transaction: (unit -- ${this.selectedUnit}) (cost -- ${this.cost1Amount}MATIC)`
            );

            let call1Txn = await connectedContract.stake(
              String(this.selectedUnit),
              options
            );
    
            console.log('Mining...please wait.');
            await call1Txn.wait();
    
            console.log(
              `Mined, see transaction: https://polygonscan.com/tx/${call1Txn.hash}`
            );
    
            alert(
              `Mined! TXN: https://polygonscan.com/tx/${call1Txn.hash}`
            );
    
            this.call1Button.innerText = 'AGAIN';
            this.call1Button.disabled = false;
          } else {
            console.log("Ethereum object doesn't exist!");
            alert(
              `Error -- please check your settings`
            );
            this.call1Button.innerText = '-AGAIN-';
            this.call1Button.disabled = false;
          }
      } catch (error) {
          console.log(error);
          alert(
            `Error -- please check your settings`
          );
          this.call1Button.innerText = '-AGAIN-';
          this.call1Button.disabled = false;
      }
    }
      
  }

  //Call2 ////////////////////////////////////////this one is UNPAYABLE so need to adjust
  async askContractToUnstake() {
    if(this.selectedUnit < 1){
      alert(
        `Please input your unit ID.`
      );
    }
    if(this.selectedUnit >= 1){  
        try {
          const { ethereum } = window;
    
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const connectedContract = new ethers.Contract(
              this.CONTRACT_ADDRESS,
              bonTestStakingAbi.abi,
              signer
            );
    
            this.call2Button.innerText = '*please wait*';
            this.call2Button.disabled = true;
    
            const options = {
              value: ethers.utils.parseEther(
                `${this.cost2Amount}`
              ),
            };
            console.log(
              `New transaction: (unit -- ${this.selectedUnit}) (cost -- ${this.cost2Amount}MATIC)`
            );
            let call2Txn = await connectedContract.unstake(
              String(this.selectedUnit),
              options
            );
    
            console.log('Mining...please wait.');
            await call2Txn.wait();
    
            console.log(
              `Mined, see transaction: https://polygonscan.com/tx/${call1Txn.hash}`
            );
    
            alert(
              `Mined! TXN: https://polygonscan.com/tx/${call1Txn.hash}`
            );
    
            this.call2Button.innerText = 'AGAIN';
            this.call2Button.disabled = false;
          } else {
            console.log("Ethereum object doesn't exist!");
            alert(
              `Error -- please check your settings`
            );
            this.call2Button.innerText = '-AGAIN-';
            this.call2Button.disabled = false;
          }
      } catch (error) {
          console.log(error);
          alert(
            `Error -- please check your settings`
          );
          this.call2Button.innerText = '-AGAIN-';
          this.call2Button.disabled = false;
      }
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

  onInputUnit() {
    this.selectedUnit = this.unitInput.value;
    console.log(`selected unit: ${this.selectedUnit}`);
  }

}

const bonTestStakingJS_ = new bonTestStakingJS();
bonTestStakingJS_.checkIfWalletIsConnected();