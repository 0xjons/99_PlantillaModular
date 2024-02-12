import React from 'react';
import { useWeb3 } from './Web3Provider';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
    const { connectWallet, address, disconnectWallet } = useWeb3();

    function formatAddress(address) {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="navbar-brand m-3">MiAppWeb3</div>
            <div>
                {address ? (
                    <>
                        <span className="navbar-text mr-3">
                            {formatAddress(address)}
                        </span>
                        <button className="btn btn-outline-danger m-3" onClick={disconnectWallet}>Desconectar</button>
                    </>
                ) : (
                    <button className="btn btn-outline-success m-3" onClick={connectWallet}>Conectar Billetera</button>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
