const SHA256 = require('crypto-js/sha256');
//from CryptoJS import hash;

class Block{
    constructor(index, timestamp, data, previousHash = ''){ 
        this.index = index;     // index tells wer the block sits on the chain
        this.timestamp = timestamp;     // timestamp tells us when it was created 
        this.data = data;    // data refers to data associated to the block
        this.previousHash = previousHash;       // previousHash is the string that contains the hash of the block before this one
        this.hash = this.calculateHash; //will contain the hash of our block
        this.nonce = 0; //hash of a block wont change without changing the contents of block,hence we use nonce, a random value that does not have anything to do with the block but can be changed.
    } // constructor will have properties of block
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }       //calculate the hash function of the block using sha256
    
    
    mineBlock(difficulty) {  //difficulty is the no of zero's that our block chain should begin with
        x = this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0");
        while (true) { //loop through array to make hash begin with rq no of 0 
            this.nonce++; // increment until our hash starts with rq no of zero's.
            this.hash = calculateHash();
        }
        console.log("Block mined " + this.hash);
    }
}


class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];    //array of blocks #initialize this array with first block
        this.difficulty = 2;
    }   //properties of blockchain

    createGenesisBlock(){
        return new Block(0, "01/01/2019", "Genesis Block", "0");
    } //first block has to be added munually (index, date, data, privious hash)

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        //newBlock.hash = newBlock.calculateHash(); //calculate the hash of new block
        this.chain.push(newBlock); // push it to the chain
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){    //i = 1 since first block is genesis block
            const currentBlock  = this.chain[i];
            const previousBlock = this.chain[i - 1];
        
            if(currentBlock.hash !== currentBlock.calculateHash()){  //recalculate the hash
                return false;   
            }
            if(currentBlock.previousHash !== previousBlock.hash){    //check if hash matches
                return false;
            }
        }   //to check if our block chain is valid
        return true;
    }
}

let coin = new BlockChain();    //instence of blockchain for testing
console.log('mining block 1.......');
coin.addBlock(new Block(1, "10/07/2019", { amount: 4}));    //adding new blocks
console.log('mining block 2 ......');
coin.addBlock(new Block(2, "12/07/2019", { amount: 10}));





