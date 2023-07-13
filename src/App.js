import React, { Component } from 'react';
import './App.css';

import web3 from './web3';
import lottery from './lottery';

class App extends Component {
    state = {
        manager: '',
        players: [],
        balance: '',
        value: '',
        message: '',
    };

    async componentDidMount() {
        const manager = await lottery.methods.manager().call();
        const players = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);

        this.setState({ manager, players, balance });
    }
    render() {
        return (
            <div>
                <h2>Lottery Contract</h2>
                <p>This contract is managed by {this.state.manager}</p>
                <p>
                    There are currently {this.state.players.length} players in
                    this lottery, competing to win{' '}
                    {web3.utils.fromWei(this.state.balance, 'ether')} ether.
                </p>
                <hr></hr>
                <form onSubmit={this.onSubmit}>
                    <h4>Like to Play?</h4>
                    <div>
                        <label>Amount in ether to enter</label>
                        <input
                            onChange={(event) =>
                                this.setState({ value: event.target.value })
                            }
                            value={this.state.value}
                        ></input>
                    </div>
                    <button>Enter</button>
                </form>
                <hr />
                <p>Ready to pick a winner?</p>
                <button onClick={this.pickWinner}>Pick a winner</button>
                <hr />
                <h2>{this.state.message}</h2>
            </div>
        );
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        this.setState({ message: 'Waiting for transaction to be completed' });
        await lottery.methods.addPlayer().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.value, 'ether'),
        });
        this.setState({ message: 'Player is added to the game' });
    };

    pickWinner = async (event) => {
        const accounts = await web3.eth.getAccounts();
        this.setState({ message: 'Waiting for transaction success' });
        await lottery.methods.pickWinner().send({
            from: accounts[0],
        });
        this.setState({ message: 'Winner has been picked' });
    };
}

export default App;
