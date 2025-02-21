<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn color="red" @click="clearCart" v-if="icons.length">Clear Cart</v-btn>
				<v-btn color="success" @click="this.$emit('save-cart',primaryIcon)" style="margin: 10px;" v-if="icons.length">Save Cart</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <!-- LISTED ICONS -->
        <IconList 
          :icons="icons"
          :showNames="showNames"
          @icon-click="setPrimary"
          :primaryIcon="primaryIcon"
				  :highlightZero="highlightZero"
        />
    </v-row>
  </v-container>
</template>

<script>
import IconList from './IconList.vue'
export default {
  name: "IconCart",
  components:{IconList},
  props: {
    icons: {
      type: Array,
      required: true,
    },
    showNames:{
      type:Boolean,
      default:false
    },
    highlightZero: Boolean
  },
  data() {
    return {
      primaryIcon: null,
    };
  },
  mounted() {
    this.setRandomPrimary();
  },
  watch: {
    icons(newIcons) {
      // If primary item is removed, select next available item
      if (!newIcons.includes(this.primaryIcon)) {
        this.setRandomPrimary();
      }
    },
  },
  methods: {
    setRandomPrimary() {
      if (this.icons.length > 0) {
        this.primaryIcon = this.icons[Math.floor(Math.random() * this.icons.length)];
      } else {
        this.primaryIcon = null;
      }
    },
    setPrimary(icon) {
      this.primaryIcon = icon;
    },
    removeIcon(icon) {
      this.$emit("remove-icon", icon);
    },
    clearCart() {
      this.$emit("clear-cart");
    },
  },
};
</script>

<style scoped>
.icon-card {
	overflow: visible;
	background-color: #fff;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  text-align: center;
  border-radius: 10px;
  transition: transform 0.2s ease-in-out;
  position: relative;
  cursor: pointer;
}

.icon-card:hover {
  transform: scale(1.1);
}

.primary-item {
  /* border: 5px solid var(--nile-colors-primary-700); */
  animation: heartbeat 1.5s infinite ease-in-out;
}

.icon-name {
  font-size: 14px;
  font-weight: 500;
  color: #555;
}

.remove-btn {
	scale: 0.5;
	position: absolute;
	top: -22px;
	right: -22px;
}

</style>
