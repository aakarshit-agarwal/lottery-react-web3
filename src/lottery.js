import web3 from './web3';

const address = '0x93970bb15D9cE46483D6e8667082D56EEAB96aBf';
const abi = [
    {
        constant: false,
        inputs: [],
        name: 'addPlayer',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'manager',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [],
        name: 'pickWinner',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'getPlayers',
        outputs: [{ name: '', type: 'address[]' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [{ name: '', type: 'uint256' }],
        name: 'players',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
];

const contract = new web3.eth.Contract(abi, address);

export default contract;
