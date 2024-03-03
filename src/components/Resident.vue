<template>

	<v-card class="mx-auto" style="position: relative;">
    <div class="cover-t"></div>
		<v-card-item>
			<v-card-title>{{resident.name}}</v-card-title>

			<v-card-subtitle>
        <div v-if="resident.gender=='male'">
          <v-chip color="light-blue-darken-3">{{ resident.gender }}</v-chip>
          <v-icon color="light-blue-darken-3" icon="mdi-gender-male" size="small"></v-icon>
        </div>
        <div v-else-if="resident.gender=='female'">
          <v-chip color="green-darken-1">{{ resident.gender }}</v-chip>
          <v-icon color="green-darken-1" icon="mdi-gender-female" size="small"></v-icon>
        </div>
			</v-card-subtitle>
		</v-card-item>

		<v-divider class="mx-4 mb-1"></v-divider>
		<v-card-text>
			<div class="d-flex flex-wrap">
				<v-chip class="my-1">Birth Year: {{resident?.birth_year}}</v-chip>
				<v-chip class="my-1">Eye Coloe: {{resident?.eye_color}}</v-chip>
				<v-chip class="my-1">Hair Color: {{resident?.hair_color}}</v-chip>
				<v-chip class="my-1">Height: {{resident?.height}} cm</v-chip>
			</div>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	name: 'Resident',
	props: ['currResident'],
  mounted(){
    console.log(this.resident)
  },
	data() {
		return {
      resident:this.currResident
    }
	},
	computed: {}
}
</script>
<style scoped>
.cover-t{
  height: 100%;
  position: absolute;
  width: 100%;
  background-color: #fff1;
}
</style>