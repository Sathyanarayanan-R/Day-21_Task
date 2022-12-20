import React, {Component} from 'react';
import './modal.css';
import { addedToCartIndex } from './MainPage';

class ModalComponent extends Component {

    constructor(props) {
        super(props)
    }
    
    render() {

      const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        return (
            <div className={showHideClassName}>
        
            <section className="modal-main py-5" style = {{height: '100vh', overflow: 'auto'}}>
              <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                  {(addedToCartIndex.length !== 0)?
                  (addedToCartIndex.map((value) =>
                      window.mainComponent.displayProduct('',value)
                  )):
                  <h1 style = {{color: 'white'}}>Nothing Added to cart!</h1>}
                </div>
              </div>
              <button type="button" style = {{float: 'right', padding : '2px 30px', margin: '0px 100px', borderRadius : '10px'}} onClick={this.props.handleClose}>
                Close
              </button>
            </section>
          </div>
        )
    }
}

export default ModalComponent;