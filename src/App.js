import React, { Component } from 'react';
import { Button, Table, TableHead, TableBody, TableRow, TableCell, Container, CircularProgress } from '@mui/material';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [{
        codigo: 1, 
        descripcion: 'coca-cola',
        precio: 2.50
   },{
        codigo: 2, 
        descripcion: 'inka-cola',
        precio: 2.20
   },{
        codigo: 3, 
        descripcion: 'fanta',
        precio: 1.70
   }],
      recuperado: true,
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/producto/')
      .then((response) => response.json())
      .then((prod) => {
        this.setState({ 
          productos: prod,
          recuperado: true
        });
      });
  } 

  borrar(cod) {
    var temp = this.state.productos.filter((el) => el.codigo !== cod);
    this.setState({
      productos: temp
    });
  }

  mostrarTabla() {
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>                    
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.productos.map(prod => (
              <TableRow key={prod.codigo}>
                <TableCell>{prod.codigo}</TableCell>
                <TableCell>{prod.descripcion}</TableCell>
                <TableCell>{prod.precio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  render() {
    return (
      <Container maxWidth="md">
        {this.state.recuperado ? (
          this.mostrarTabla()
        ) : (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <CircularProgress />
          </div>
        )}
      </Container>
    );
  }
}

export default App;
