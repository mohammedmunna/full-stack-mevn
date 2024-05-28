<template>
  <div v-if="product">
    <div class="img-wrap">
      <img :src="product.imageUrl" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button
        v-if="user && !isItemInCart"
        @click="addToCart"
        class="add-to-cart"
      >
        Add to cart
      </button>
      <button v-if="user && isItemInCart" class="grey-button">
        Item is already in cart
      </button>
      <button @click="signIn" class="sign-in" v-if="!user">
        Sign in to add to cart
      </button>
    </div>
  </div>
  <div v-else>
    <NotFoundPage />
  </div>
</template>

<script>
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import axios from "axios";
import NotFoundPage from "./NotFoundPage.vue";

export default {
  name: "ProductDetailPage",
  components: { NotFoundPage },
  props: ["user"],
  data() {
    return {
      product: {},
      cartItems: [],
    };
  },
  computed: {
    isItemInCart() {
      return this.cartItems.some(
        (item) => item.id === this.$route.params.productId
      );
    },
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
    async addToCart() {
      const response = await axios.post(`/api/users/${this.user.uid}/cart`, {
        id: this.$route.params.productId,
      });
      if (response.status == 200) alert("Product added to cart!");
    },
    async signIn() {
      const email = prompt("Please enter your email to sign in:");
      const auth = getAuth();
      const actionCodeSettings = {
        url: `http://localhost:8080/products/${this.$route.params.productId}`,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      alert("Check your email to sign in!");
      window.localStorage.setItem("emailForSignIn", email);
    },
  },
  async created() {
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem("emailForSignIn");
      await signInWithEmailLink(auth, email, window.location.href);
      alert("You have been signed in successfully!");
      window.localStorage.removeItem("emailForSignIn");
    }

    const response = await axios.get(
      `/api/products/${this.$route.params.productId}`
    );
    if (response.status === 200) this.product = response.data;

    if (this.user) {
      const cartResponse = await axios.get(`/api/users/${this.user.uid}/cart`);
      if (cartResponse.status === 200) this.cartItems = cartResponse.data;
    }
  },
};
</script>
