import React, { Component } from 'react';
import NavPage from './NavPage';
import HeaderPage from './HeaderPage';

const addedToCartIndex = [];
var btnName = '';

export { addedToCartIndex };

class MainPage extends Component {

   constructor(props) {
      super(props);
      window.mainComponent = this;
      this.state = {
         products: ['Fancy Product', 'Special Item', 'Sale Item', 'Popular Item', 'Sale Item', 'Fancy Product', 'Special Item', 'Popular Item'],
         prices: ['$40.00 - $80.00', '$20.00 $18.00', '$50.00 $25.00', '$40.00', '$50.00 $25.00', '$120.00 - $280.00', '$20.00 $18.00', '$40.00'],
         cart_count: 0
      }
   }

   displayReview = (product, index) => {

      if (product === 'Special Item' || product === 'Popular Item') {
         setTimeout(() => {this.handleRating(index)},100);
         return (
            <div id= {'stars' + index} className="text-warning mb-2" style={{fontSize: '22px'}}>
               <span className="bi-star"></span>
               <span className="bi-star"></span>
               <span className="bi-star"></span>
               <span className="bi-star"></span>
               <span className="bi-star"></span>
            </div>
         )
      }
   }
  
   handleRating = (index) => {
       
      const stars = document.querySelectorAll(`#stars${index} span`);
      
      stars.forEach((star, index1) => {
           star.addEventListener("click", () => {
               stars.forEach((star, index2) => {
                   if(index1 >= index2) {
                     star.classList.remove("bi-star");
                     star.classList.add("bi-star-fill");
                   } else {
                     star.classList.remove("bi-star-fill");
                     star.classList.add("bi-star");
                   }
               })
           });
           star.style.cursor = 'pointer';
      });
   }

   displayPrice = (product, price) => {

      if (product === 'Special Item' || product === 'Sale Item') {

         if (price !== 'sale') {
            let p = price.split(' ');
            return (
               <>
                  <span className="text-muted text-decoration-line-through">{p[0]}</span> {p[1]}
               </>
            )
         } else {
            return (
               <div className="badge bg-dark text-white position-absolute" style={{ top: "0.5rem", right: "0.5rem" }}>Sale</div>
            )
         }
      } else {
         if (price !== 'sale') {
            return (
               <>
                  {price}
               </>
            )
         }
      }
   }

   displayBtnName = (product, index) => {

      if (product === '') {
         product = this.state.products[index];
         btnName = 'Remove Item';
      }
      else {
         btnName = 'Add to cart';
      }
      return [product, btnName];
   }

   displayCartCount = (product, index) => {

      var btnEle = document.getElementById(index);

      if (btnEle.innerText === 'Add to cart') {

         btnEle.disabled = true;
         addedToCartIndex.push(index);

         if (this.state.cart_count <= 8) {
            this.setState({ cart_count: this.state.cart_count + 1 });
         }
      }
      else if (btnEle.innerText === 'Remove Item') {

         setTimeout(() => {
            btnEle = document.getElementById(index);
            btnEle.disabled = false;
         }, 500)

         addedToCartIndex.splice(addedToCartIndex.indexOf(index), 1);

         if (this.state.cart_count > 0) {
            this.setState({ cart_count: this.state.cart_count - 1 });
         }
      }
   }

   displayProduct = (product, index) => {
      
      [product, btnName] = this.displayBtnName(product, index);
      return (
         <div className="col mb-5">
            <div className="card h-100">
               {/* <!-- Sale badge--> */}
               {this.displayPrice(product, "sale")}
               {/* <!-- Product image--> */}
               <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
               {/* <!-- Product details--> */}
               <div className="card-body p-4">
                  <div className="text-center">
                     {/* <!-- Product name--> */}
                     <h5 className="fw-bolder">{product}</h5>
                     {/* <!-- Product reviews--> */}

                     {this.displayReview(product, index)}

                     {/* <!-- Product price--> */}
                     {this.displayPrice(product, this.state.prices[index])}
                  </div>
               </div>
               {/* <!-- Product actions--> */}
               <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center"><button className="btn btn-outline-dark mt-auto" onClick={() => { this.displayCartCount(product, index) }} id={index}>{(product !== 'Fancy Product') ? btnName : 'View options'}</button></div>
               </div>
            </div>
         </div>
      )
   }

   render() {

      return (
         <>
            <NavPage count={this.state.cart_count} />
            <HeaderPage />
            <section className="py-5">
               <div className="container px-4 px-lg-5 mt-5">
                  <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

                     {this.state.products.map((product, index) => (
                        this.displayProduct(product, index)
                     ))}

                  </div>
               </div>
            </section>

         </>
      )
   }
}

export default MainPage;