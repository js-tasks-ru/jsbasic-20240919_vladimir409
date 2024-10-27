export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {
      return;}
    let isContain = false;
    let cartItem = {};
    if (this.cartItems.length > 0) {
      this.cartItems.forEach((i) => {
        if (i.product.id === product.id) {
          i.count += 1;
          cartItem = i;
          isContain = true;
        }
      });
    }
    if (!isContain) {
      cartItem = {
        product,
        count: 1,
      };
      this.cartItems.push(cartItem);
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, index) => {
      if (item.product.id === productId) {
        let count = item.count + amount;
        if (count <= 0) {
          this.cartItems = [...this.cartItems.slice(0, index), ...this.cartItems.slice(index + 1,)];
        } else {
          item.count = count;
        }
        this.onProductUpdate(item);
      }
    });
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => {
      return sum + item.count;
    }, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => {
      return sum + item.product.price * item.count;
    }, 0);
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
  }
}