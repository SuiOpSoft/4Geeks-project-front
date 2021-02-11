const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			output_separator_gas_and_liquid_areas: [],
			output_inlet_nozzle_parameters: [
				{
					separator: "Equipo",
					Mixture_Inlet_Nozzle_Velocity: "-",
					Inlet_Nozzle_Momentum: "-",
					Maximum_Mixture_Inlet_Nozzle_Velocity: "-",
					Maximum_Inlet_Nozzle_Momentum: "-",
					Maximun_Liquid_Flow_Inlet_Nozzle: "-",
					Maximum_Gas_Flow_Inlet_Nozzle: "-",
					Status_Inlet_Nozzle: "-"
				}
			],
			output_gas_nozzle_parameters:[
				{
					separator: "Equipo",
					Gas_Nozzle_Velocity: "-",
					Gas_Nozzle_Momentum: "-",
					Maximum_Gas_Nozzle_Velocity: "-",
					Maximum_Gas_Nozzle_Momentum: "-",
					Maximum_Gas_Nozzle_Flow: "-",
					Status_Gas_Nozzle: "-"					
				}
			],
			output_liquid_nozzle_parameters:[
				{
					separator: "Equipo",
					Liquid_Nozzle_Velocity: "-",
					Maximum_Liquid_Nozzle_Velocity: "-",
					Maximum_Liquid_Nozzle_Flow: "-",
					Status_Liquid_Nozzle: "-"				
				}
			],
			output_vessel_gas_capacity_parameters:[
				{
					separator: "Equipo",
					Gas_Load_Factor: "-",
					Maximum_Gas_Flow_at_HH_level: "-",
					Maximum_Gas_Flow_at_Normal_level: "-",
					Status_Gas_Capacity_at_high_level: "-",
					Status_Gas_Capacity_at_normal_level: "-"

				}
			],
			output_vessel_liquid_capacity_parameters:[
				{
					separator: "Equipo",
					Maximum_Vessel_Liquid_Flow_Capacity_at_Normal_Level: "-",
   					Status_Vessel_Liquid_Capacity: "-"

				}
			],
			output_relief_valve_parameters:[
				{
					separator: "Equipo",
					Relief_Valve_Capacity: "-",
					Relief_Valve_Capacity_Status: "-"
					
				}
			],
			output_level_control_valve_parameters:[
				{
					separator: "Equipo",
					LCV_Liquid_Flow_Capacity:"-",
					Level_Valve_required_Cv:"-",
					Level_Control_Valve_Status:"-"

				}
			]

		},
		actions: {
			addFavorites(item) {
				const store = getStore();

				function filterFavorites(arr, criteria) {
					return arr.filter(function(obj) {
						return Object.keys(criteria).every(function(c) {
							return obj[c] === criteria[c];
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