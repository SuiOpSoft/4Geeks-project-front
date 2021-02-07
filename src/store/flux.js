const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			separatorsOutput: [
                {
					separator: "Equipo",
                    Separator_Cross_sectional_Area_Ratio: "",
                    Separator_Cross_sectional_Area: "",
                    Inlet_Nozzle_Area: "",
                    Gas_Nozzle_Area:"",
                    Liquid_Nozzle_Area:"",
                    High_Level_Trip_Gas_Area:"",
                    Normal_Level_Gas_Area:"",
                    Low_Level_Gas_Area:"",
                    High_LEvel_Trip_Liquid_Area:"",
                    Normal_LEvel_Trip_Liquid_Area:"",
                    Low_LEvel_Trip_Liquid_Area:"",
                }]
		},
		actions: {
			addFavorites(item) {
				const store = getStore();

				function filterFavorites(arr, criteria) {
					return arr.filter(function(obj) {
						return Object.keys(criteria).every(function(c) {
							return obj[c] == criteria[c];
						});
					});
				}
				if (filterFavorites(store.favorites, { label: item }).length < 1) {
					setStore({
						favorites: [
							...store.favorites,
							{
								label: item,
								icon: "pi pi-times",
								command: () => {
									store.favorites.splice(store.favorites.findIndex(e => e.label === item), 1);
								}
							}
						]
					});
				} else {
					setStore({ modalActive: true });
				}
			},
			changeModal() {
				setTimeout(function() {
					setStore({ modalActive: false });
				}, 3000);
			}
		}
	};
};

export default getState;