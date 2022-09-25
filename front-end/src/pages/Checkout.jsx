import React from 'react';
import { useProductsContext } from '../context/ProductsContext';
// import PropTypes from 'prop-types';

// Funcao temporaria para testar o context
function Checkout() {
  const { total } = useProductsContext();
  return (
    <>
      <p>Checkout</p>
      <p>{total}</p>
      <p>{JSON.stringify(localStorage.getItem('cart')) || []}</p>
    </>
    // <section>
    //   {/* // Finalizar pedido - 1º box */}
    //   <div>
    //     <p>Finalizar Pedido</p>
    //     <table width="100%">
    //       <thead style={ { width: '100%' } }>
    //         <th>Item</th>
    //         <th style={ { width: '50%' } }>Descricao</th>
    //         <th>Quantidade</th>
    //         <th>Valor Unitário</th>
    //         <th>Sub-total</th>
    //         <th>Remover item</th>
    //       </thead>
    //       <tbody align="center">
    //         <tr>
    //           <td>1</td>
    //           <td>Cerveja Stella 250ml</td>
    //           <td>20</td>
    //           <td>R$ 10,00</td>
    //           <td>R$ 200,00</td>
    //           <td>Remover</td>
    //         </tr>
    //         <tr>2</tr>
    //         <tr>3</tr>
    //         <tr>4</tr>
    //       </tbody>
    //     </table>
    //     <div style={ { width: '100%', textAlign: 'end' } }>
    //       <h1>Total R$ 200,00</h1>
    //     </div>
    //   </div>

  //   {/* Detalhes e endereco */}
  //   <div>
  //     <p>Dethalhes e Endereço para Entrega</p>
  //     <div>
  //       <div style={ { display: 'flex', justifyContent: 'space-around' } }>
  //         <label htmlFor="vendedor">
  //           <p>
  //             P. Vendedora Reponsável:
  //           </p>
  //           <select name="vendedor" id="vendedor">
  //             <option block value="FPereira">Fulana Pereira</option>
  //           </select>
  //         </label>

  //         <label htmlFor="endereco">
  //           <p>
  //             Endereço:
  //           </p>
  //           <input type="text" />
  //         </label>

  //         <label htmlFor="numero">
  //           <p>
  //             Numero:
  //           </p>
  //           <input type="text" />
  //         </label>
  //       </div>
  //       <p style={ { textAlign: 'center' } }>FINALIZAR PEDIDO</p>
  //     </div>
  //   </div>

  // </section>
  );
}

Checkout.propTypes = {};

export default Checkout;
