<template>
  <h1>Shopping Cart</h1>
  <div v-if="cartItems.length > 0">
    <ShoppingCartList
      @remove-from-cart="removeFromCart($event)"
      :products="cartItems"
    />
    <button class="checkout-button">Proceed to Checkout</button>
  </div>
  <div v-if="cartItems.length === 0">
    You currently have no items in your cart!
  </div>
</template>

<script>
import axios from "axios";
import ShoppingCartList from "../components/ShoppingCartList.vue";

export default {
  name: "ShoppingCartPage",
  components: { ShoppingCartList },
  props: ["user"],
  data() {
    return {
      cartItems: [],
    };
  },
  watch: {
    async user(newUserValue) {
      if (newUserValue) {
        const cartResponse = await axios.get(
          `/api/users/${newUserValue.uid}/cart`
        );
        if (cartResponse.status === 200) this.cartItems = cartResponse.data;
      }
    },
  },
  methods: {
    async removeFromCart(productId) {
      const response = await axios.delete(
        `/api/users/${this.user.uid}/cart/${productId}`
      );
      if (response.status === 200) this.cartItems = response.data;
    },
  },
  async created() {
    if (this.user) {
      const response = await axios.get(`/api/users/${this.user.uid}/cart`);
      if (response.status === 200) this.cartItems = response.data;
    }
  },
};
</script>
