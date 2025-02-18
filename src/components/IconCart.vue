<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn color="red" @click="clearCart" v-if="icons.length">Clear Cart</v-btn>
				<v-btn color="success" style="margin: 10px;" @click="saveCart" v-if="icons.length">Save Cart</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="(icon, index) in icons" :key="index" cols="auto">
				<v-card
					class="icon-card"
					:class="{ 'primary-item': icon === primaryItem }"
					elevation="3"
					@click="setPrimary(icon)"
				>
					<v-btn class="remove-btn" @click.stop="removeIcon(icon)" elevation="2" icon x-small>
						<v-icon dark>mdi-close</v-icon>
					</v-btn>
					<nile-icon :name="icon" size="32"></nile-icon>
					<p class="icon-name">{{ icon }}</p>
				</v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "IconCart",
  props: {
    icons: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      primaryItem: null,
    };
  },
  mounted() {
    this.setRandomPrimary();
  },
  watch: {
    icons(newIcons) {
      // If primary item is removed, select next available item
      if (!newIcons.includes(this.primaryItem)) {
        this.setRandomPrimary();
      }
    },
  },
  methods: {
    setRandomPrimary() {
      if (this.icons.length > 0) {
        this.primaryItem = this.icons[Math.floor(Math.random() * this.icons.length)];
      } else {
        this.primaryItem = null;
      }
    },
    setPrimary(icon) {
      this.primaryItem = icon;
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

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
  }
  70% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
