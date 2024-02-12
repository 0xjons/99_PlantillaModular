import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [address, setAddress] = useState(null);
    const [web3Modal, setWeb3Modal] = useState(null);

    const connectWallet = useCallback(async () => {
        if (!web3Modal) return;
        try {
            const connection = await web3Modal.connect();
            const web3Provider = new ethers.providers.Web3Provider(connection);
            setProvider(web3Provider);

            const signer = web3Provider.getSigner();
            const resolvedAddress = await signer.getAddress();
            setAddress(resolvedAddress);
        } catch (error) {
            console.error("Error al conectar la billetera:", error);
        }
    }, [web3Modal]);

    useEffect(() => {
        const initWeb3Modal = () => {
            const web3ModalInstance = new Web3Modal({
                network: "sepolia",
                cacheProvider: true, // Nota: Esto aún permite que Web3Modal recuerde el último proveedor conectado
            });
            setWeb3Modal(web3ModalInstance);
        };
    
        initWeb3Modal();
    }, []);

    // Comenta o elimina este useEffect para prevenir la conexión automática
    // useEffect(() => {
    //     if (web3Modal && web3Modal.cachedProvider) {
    //         connectWallet();
    //     }
    // }, [web3Modal, connectWallet]);

    const disconnectWallet = async () => {
        web3Modal?.clearCachedProvider();
        setProvider(null);
        setAddress(null);
        window.location.reload();
    };

    return (
        <Web3Context.Provider value={{ provider, address, connectWallet, disconnectWallet }}>
            {children}
        </Web3Context.Provider>
    );
};


export const useWeb3 = () => useContext(Web3Context);
