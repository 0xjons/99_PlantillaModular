import React from 'react';
import { useWeb3 } from './Web3Provider';

function NavBar() {
    const { connectWallet, address, disconnectWallet } = useWeb3();

    // Función para formatear la dirección Ethereum
    function formatAddress(address) {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }

    return (
        <nav>
            {address ? (
                <>
                    {/* Muestra el nombre ENS o la dirección Ethereum formateada */}
                    <span>{address.includes('.eth') ? address : formatAddress(address)}</span>
                    <button onClick={disconnectWallet}>Desconectar</button>
                </>
            ) : (
                <button onClick={connectWallet}>Conectar Billetera</button>
            )}
        </nav>
    );
}

export default NavBar;
