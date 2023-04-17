import React from "react";

export const Print = React.forwardRef((props, ref) => {
    const {cart, totalAmount, currentStore} = props;
    return (
      <div ref={ref} className="p-5">
        {currentStore && <h1 className="text-center">{currentStore.name}</h1>}
          <table className='table'>
                  <thead>
                    <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Price</td>
                      <td>Qty</td>
                      <td>Total</td>
                    </tr>
                  </thead>
                  <tbody>
                    { cart ? cart.map((cartProduct, key) => <tr key={key}>
                      <td>{cartProduct.id}</td>
                      <td>{cartProduct.name}</td>
                      <td>{cartProduct.price}</td>
                      <td>{cartProduct.quantity}</td>
                      <td>{cartProduct.totalAmount}</td>
                    

                    </tr>)

                    : ''}
                  </tbody>
                </table>
                <h2 className='px-2'>Total Amount: Rs. {totalAmount}</h2>
      </div>
    );
});