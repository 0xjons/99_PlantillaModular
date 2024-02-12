import React from 'react';
import { Web3Provider, useWeb3 } from './obj/Web3Provider'; // Asegúrate de importar useWeb3 correctamente
import NavBar from './obj/NavBar'; // Importa NavBar
import { Container, Button, Form } from 'react-bootstrap'; // Importa los componentes de React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar los estilos de Bootstrap

function MainContent() {
  const { address, connectWallet } = useWeb3(); // Utiliza useWeb3 para acceder a la dirección y la función de conexión

  // Función para formatear la dirección
  const formatAddress = (address) => {
    // Implementa aquí la lógica para convertir la dirección en un ENS si es posible
    // De lo contrario, simplemente recorta la dirección
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <Container className="pt-5 text-center">
      {!address ? (
        // Muestra este contenido si no hay una wallet conectada
        <>
          <h1>Conecta tu wallet para comenzar</h1>
          <Button variant="primary" onClick={connectWallet}>Conectar Wallet</Button>
        </>
      ) : (
        // Muestra este contenido si hay una wallet conectada
        <>
          <h1>Bienvenido {formatAddress(address)}</h1>
          <Form className="d-flex justify-content-center align-items-center mt-4">
            <Form.Group style={{ maxWidth: '800px', width: '100%' }} controlId="searchInput">
              <Form.Control type="text" placeholder="Escribe aquí para buscar..." />
            </Form.Group>
            <Button variant="secondary" type="submit">BUSCAR</Button>
          </Form>
        </>
      )}
    </Container>
  );
}

function App() {
  return (
    <Web3Provider>
      <div className="App">
        <NavBar /> {/* NavBar para la barra de navegación */}
        <MainContent /> {/* Componente principal que muestra el contenido condicional */}
      </div>
    </Web3Provider>
  );
}

export default App;
