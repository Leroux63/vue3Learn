app.component("product", {
    template: `
    <div class="product-image">
    <!--au lieu de v-bind: on peut écrire : -->
    <img v-bind:src="image" alt="" class="src">
  </div>
  <div class="product-description">
    <h1>
    {{ title }}
    <img v-show="showBestSellerImg()" class="img-best-seller" src="assets/images/best-seller.png">
    </h1>
    <p v-show="notAvailable">Momentanément indisponible</p>
    <p v-if="sale">
      <span class="sale">{{ price }}€ </span>
      <span class="new-price">{{ price - 5}}€</span>
    </p>
    <p v-else>
      <span class="price">{{ price }}€</span>
    </p>
    <strong>Ingrédients </strong>
    <div>
      <span v-for="(ingredient, index) in ingredients" :key="index">{{ ingredient + ", "}}
      </span>
    </div>
    <br />

    <div class="sauces">
      <strong>Sauces au choix</strong>
      <ul>
        <li v-for="sauce in sauces" @mouseover="updateImage(sauce.image)"
          v-bind:style="{backgroundColor : sauce.color}" :key="sauce.id">
          {{ sauce.type }}
        </li>
      </ul>
    </div>

    <div>
      <strong>Valeurs nutritionnelles pour 100 grammes</strong>
      <ul>
        <li v-for="(value, name , index) in energy" :key="index">
          {{ name }} : {{ value }}
        </li>
      </ul>
    </div>
    <!-- Bouton d'ajout au panier -->
    <button :class="{notActiveBtn: notAvailable}" @click="addProduct()" v-bind:disabled="notAvailable">Ajouter à ma
      commande</button>
  </div>`,
    props: {
        bestseller: {
            type: Boolean,
        },
    },
    data() {
        return {
            product: "Pizza",
            type: "Orientale",
            price: 12,
            image: "assets/images/pizza1-tomate.jpg",
            sale: true,
            notAvailable: false,
            ingredients: [
                "Olives",
                "Poulet roti",
                "Bacon",
                "Poivrons",
                "Champignons",
                "Mozzarella",
                "Oeuf",
            ],
            sauces: [
                {
                    id: 1001,
                    type: "Sauce Tomate",
                    color: "#db4006",
                    image: "assets/images/pizza1-tomate.jpg",
                },
                {
                    id: 1002,
                    type: "Crème Fraiche",
                    color: "#e9cb8f",
                    image: "assets/images/pizza1-creme.jpg",
                },
            ],
            energy: {
                Kcal: 242,
                Glucides: 27.99,
                Fibres: 1.75,
                Proteines: 9.62,
                Sel: 11,
            },
        }
    },
    methods: {
        addProduct() {
            if (this.sale) {
                this.$emit("addProduct", this.price - 5);
            } else {
                this.$emit("addProduct", this.price);
            }

        },

        updateImage(newLinkImage) {
            this.image = newLinkImage;
        },
        showBestSellerImg() {
            if (this.bestseller) {
                return true;
            } else {
                false;
            }
        },
    },
    computed: {
        title() {
            return this.product + " " + this.type
        }
    }
})