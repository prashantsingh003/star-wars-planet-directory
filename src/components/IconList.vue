<template>
  <div class="icons-data-container card">
    <div 
      class="icon-div" 
      :class="{'icon-div':true,'primary-icon':primaryIconName==icon.name}"
      v-for="(icon, index) in icons" 
      :key="icon.name"
      @click="iconClick(icon)"
      @mouseover="hoveredIcon = icon.name"
      @mouseleave="hoveredIcon = ''"
    >
      <v-badge 
        :content="badgeContent(icon)" 
        :color="badgeColor(icon)"
      >
        <div class="icon-wrapper">
          <nile-icon :name="icon.name" size="32"></nile-icon>
        </div>
      </v-badge>
      <div v-if="showNames" class="icon-name">{{ icon.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IconList",
  props: {
    icons: Array, // List of icons with name & frequency
    cart: {
      type:Array,
      default:()=>[]
    }, // Current cart items
    primaryIcon:Object,
    cartEnabled: Boolean, // Whether carting is enabled
    showNames: Boolean, // Whether to show names
    highlightZero: Boolean
  },
  data() {
    return {
      hoveredIcon: "",
    };
  },
  computed: {
    primaryIconName(){
      return this.primaryIcon?this.primaryIcon.name:'';
    },
    badgeColor() {
      return (icon) => {
        if (this.cart.find(e=>e.name==icon.name)) return "error";
        else if (this.cartEnabled && this.hoveredIcon === icon.name) return "success";
        else if(this.highlightZero && !icon.frequency) return 'warning'
        return "primary";
      };
    },
    badgeContent() {
      return (icon) => {
        if (!this.cartEnabled || this.hoveredIcon !== icon.name) return icon.frequency;
        return this.cart.find(e=>e.name==icon.name) ? "-" : "+";
      };
    },
  },
  methods: {
    iconClick(icon){
      this.$emit("icon-click", icon);
    },
  },
};
</script>

<style scoped>
.icons-data-container {
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

.icon-div {
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  position: relative;
  color: #555;
  transition-duration: 200ms;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.icon-wrapper {
  padding: 10px;
}

.icon-div:hover {
  scale: 1.2;
}

.icon-name {
  max-width: 100%;
  overflow: auto;
  white-space: nowrap;
  padding: 0 10px;
}
.icon-name::-webkit-scrollbar {
  display: none;
}

.primary-icon {
  animation: heartbeat 1.5s infinite ease-in-out;
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
