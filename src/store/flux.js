const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
			input_fluids_data: [
				{
					separator: "V-36102",
					operating_Pressure: "5536.33",
					operating_Temperature: "37",
					oil_Density: "794.08",
					gas_Density: "52.18",
					mixture_Density: "197.76",
					water_Density: "1001",
					feed_BSW: "0.1",
					liquid_Viscosity: "2.1065",
					gas_Viscosity: "0.013385",
					gas_Mw: "20.80",
					liq_MW: "155.53",
					gas_Compressor: "0.8558",
					specific_Heat_Ratio: "1.4913",
					liquid_Surface_Tension: "15.49",
					liquid_Vapor_Pressure: "5536.3",
					liquid_Critical_Pressure: "12541.9",
					standard_Gas_flow: "25835.9",
					standard_Liquid_Flow: "103.9",
					actual_Gas_Flow: "435.5",
					actual_Liquid_Flow: "106.33",
				  }
			],
			input_separators_data:[
				{
					
					separator: "V-36102",
					internal_Diameter: "1800",
					t_t_length: "6300",
					high_Level_Trip: "1080",
					high_Level_Alarm: "900",
					normal_Liquid_Level: "650",
					low_Level_Alarm: "390",
					inlet_Nozzle: "203.2",
					gas_Oulet_Nozzle: "152.4",
					liquid_Outlet_Nozzle: "203.2",
					inlet_Device_Type: "-",
					demister_Type: "-",
				  }
			],
			input_relief_valve_data:[
				{
					separator: "V-36102",
					RV_Tag: "RV-450",
					RV_set_pressure: "7900",
					RV_Orifice_Area_value: "0.785",
				  }
			],
			input_level_control_valve:[
				{
					separator: "V-36102",
					lcv_Tag: "LCV-2021",
					lcv_Cv: "47",
					lcv_Factor_Fl: "0.9",
					lcv_Factor_Fp: "0.92",
					lcv_Inlet_Pressure: "5636.325",
					lcv_Outlet_Pressure: "2286.325",
				  }
			],

			output_separator_gas_and_liquid_areas: [
				
			],
			output_inlet_nozzle_parameters: [
				{
					separator: "V-36102",
					Mixture_Inlet_Nozzle_Velocity: "7",
					Inlet_Nozzle_Momentum: "2",
					Maximum_Mixture_Inlet_Nozzle_Velocity: "6",
					Maximum_Inlet_Nozzle_Momentum: "1",
					Maximun_Liquid_Flow_Inlet_Nozzle: "5",
					Maximum_Gas_Flow_Inlet_Nozzle: "8",
					Status_Inlet_Nozzle: "6"
				}
			],
			output_gas_nozzle_parameters:[
				{
					separator: "V-36102",
					Gas_Nozzle_Velocity: "5",
					Gas_Nozzle_Momentum: "2",
					Maximum_Gas_Nozzle_Velocity: "6",
					Maximum_Gas_Nozzle_Momentum: "3",
					Maximum_Gas_Nozzle_Flow: "8",
					Status_Gas_Nozzle: "7"					
				}
			],
			output_liquid_nozzle_parameters:[
				{
					separator: "V-36102",
					Liquid_Nozzle_Velocity: "3",
					Maximum_Liquid_Nozzle_Velocity: "4",
					Maximum_Liquid_Nozzle_Flow: "3",
					Status_Liquid_Nozzle: "5"				
				}
			],
			output_vessel_gas_capacity_parameters:[
				{
					separator: "V-36102",
					Gas_Load_Factor: "4",
					Maximum_Gas_Flow_at_HH_level: "5",
					Maximum_Gas_Flow_at_Normal_level: "7",
					Status_Gas_Capacity_at_high_level: "3",
					Status_Gas_Capacity_at_normal_level: "5"

				}
			],
			output_vessel_liquid_capacity_parameters:[
				{
					separator: "V-36102",
					Maximum_Vessel_Liquid_Flow_Capacity_at_Normal_Level: "2",
   					Status_Vessel_Liquid_Capacity: "7"

				}
			],
			output_relief_valve_parameters:[
				{
					separator: "V-36102",
					Relief_Valve_Capacity: "6",
					Relief_Valve_Capacity_Status: "7"
					
				}
			],
			output_level_control_valve_parameters:[
				{
					separator: "Equipo",
					LCV_Liquid_Flow_Capacity:"2",
					Level_Valve_required_Cv:"9",
					Level_Control_Valve_Status:"1"

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