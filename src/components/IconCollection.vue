<template>
  <div class="icon-collection-container">
    <div v-for="{primaryIcon,family} in iconCollections" :key="primaryIcon" class="icon-family">
      <v-card class="family-card">
        <v-row align="center" justify="space-between" class="family-header">
          <v-col cols="auto" class="primary-icon-title">
            <nile-icon :name="primaryIcon" size="28"></nile-icon>
            <span>{{ primaryIcon }}</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn icon variant="text" class="delete-btn" @click="copyRegex(family)">
              <v-icon size="20" color="green">mdi-content-copy</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn icon variant="text" class="delete-btn" @click="deleteFamily(primaryIcon)">
              <v-icon size="20" color="red">mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <div class="icon-list-wrapper">
          <IconList
            :icons="family"
            :showNames="showNames"
            :primaryIcon="{name:primaryIcon}"
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
    showNames:Boolean
  },
  data() {
    return { };
  },
  computed:{
    iconCollections(){
      return  this.$store.getters.getFinalizedCarts
    }
  },
  methods: {
    // ✅ Delete entire family (primary + its icons)
    deleteFamily(primaryIcon) {
      if (confirm(`Are you sure you want to delete the "${primaryIcon}" family?`)) {
				this.$store.commit('REMOVE_FROM_FINALIZED_CARTS',primaryIcon)
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
    copyRegex(icons){
      const regex=this.generateNileIconRegex(icons.map(i=>i.name))
      navigator.clipboard.writeText(regex)
				.then(() => {
					alert("Copied Regex: "+regex);
				})
    },
    generateNileIconRegex(strings) {
      // Escape special characters in each string to avoid regex injection
      const escapedStrings = strings.map(str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

      // Join the strings into a regex OR group
      const regexPattern = `<nile-icon.*?(${escapedStrings.join('|')}).*?>`;

      // Return a RegExp object with the 'g' and 'i' flags (global and case-insensitive)
      return new RegExp(regexPattern, 'gi');
    }

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