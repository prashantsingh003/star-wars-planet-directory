<template>
  <div class="icon-collection-container">
    <div v-for="(icons, primaryIcon) in iconCollections" :key="primaryIcon" class="icon-family">
      <v-card class="family-card">
        <v-row align="center" justify="space-between" class="family-header">
          <v-col cols="auto" class="primary-icon-title">
            <nile-icon :name="primaryIcon" size="28"></nile-icon>
            <span>{{ primaryIcon }}</span>
          </v-col>
          <v-col cols="auto">
            <v-btn icon variant="text" class="delete-btn" @click="deleteFamily(primaryIcon)">
              <v-icon size="20" color="red">mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <div class="icon-list-wrapper">
          <IconList
            :icons="icons.map(name => ({ name }))"
            :showNames="false"
          />
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import IconList from './IconList.vue';

export default {
  name: 'IconCollection',
  components: { IconList },
  props: {
    initialCollections: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      iconCollections: this.getIconCollections(),
    };
  },
  watch: {
    initialCollections: {
      handler(newVal) {
        this.iconCollections=newVal;
      },
      deep: true,
    },
  },
  methods: {
    // ✅ Retrieve collections from localStorage or initialize with default
    getIconCollections() {
      const stored = localStorage.getItem('iconsObj');
      return stored ? JSON.parse(stored) : this.initialCollections;
    },

    // ✅ Save collections to localStorage
    saveToLocalStorage(data) {
      localStorage.setItem('iconsObj', JSON.stringify(data));
    },

    // ✅ Delete entire family (primary + its icons)
    deleteFamily(primaryIcon) {
      if (confirm(`Are you sure you want to delete the "${primaryIcon}" family?`)) {
				this.$emit('delete-family',primaryIcon)
      }
    },

    // ✅ Delete individual icon from family (except primary icon)
    // deleteIcon(primaryIcon, icon) {
    //   if (icon.name !== primaryIcon) {
    //     this.iconCollections[primaryIcon] = this.iconCollections[primaryIcon].filter(name => name !== icon.name);
				
		// 		this.emit('update-family',primaryIcon,this.iconCollections[primaryIcon])
    //   } else {
    //     alert("Primary icon cannot be deleted!");
    //   }
    // },
  },
};
</script>
<style>
.icon-collection-container {
  padding: 16px;
  overflow-y: auto;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.icon-family {
  margin-bottom: 12px;
}

.family-card {
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.family-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.family-header {
  background: #f5f5f5;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.primary-icon-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.delete-btn {
  transition: background-color 0.2s, color 0.2s;
}

.delete-btn:hover {
  background-color: #ffebee;
}

.icon-list-wrapper {
  overflow-x: auto;
  white-space: nowrap;
  padding: 10px 10px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.icon-list-wrapper::-webkit-scrollbar {
  height: 6px;
}

.icon-list-wrapper::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.icon-list-wrapper::-webkit-scrollbar-thumb:hover {
  background: #999;
}

</style>