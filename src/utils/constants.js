const climateIconVals = {
	hot: { color: "yellow-darken-4", icon: "mdi-fire-circle" },
	rocky: { color: "yellow-lighten-3", icon: " mdi-image-filter-hdr" },
	superheated: { color: "deep-orange-lighten-1", icon: "mdi-white-balance-sunny" },
	subartic: { color: "light-blue-lighten-1", icon: "mdi-snowflake-alert" },
	arid: { color: "lime-darken-1", icon: "mdi-forest" },
	frigid: { color: "light-blue-accent-4", icon: "mdi-snowflake-alert" },
	murky: { color: "lime", icon: "mdi-water-polo" },
	windy: { color: "grey-darken-1", icon: "mdi-weather-dust" },
	moist: { color: "grey-darken-1", icon: "mdi-water-thermometer" },
	temperate: { color: "grey-darken-1", icon: "mdi-thermometer-lines" },
	unknown: { color: "grey-darken-1", icon: "mdi-crosshairs-question" },
	humid: { color: "cyan-lighten-1", icon: "mdi-water-percent-alert" },
	polluted: { color: "blue-grey-darken-3", icon: "mdi-tailwind" },
	artificial: { color: "green-darken-3", icon: "mdi-office-building-plus-outline" },
	frozen: { color: "light-blue-accent-4", icon: "mdi-snowflake-alert" },
	tropical: { color: "green-darken-3", icon: "mdi-forest" },
	artic: { color: "light-blue-lighten-1", icon: "mdi-snowflake-alert" },
}

export const getClimateIconData=(climate)=> climateIconVals[climate]?climateIconVals[climate]:{ color: "primary", icon: "mdi-crosshairs-question" }