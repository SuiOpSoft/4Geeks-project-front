const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			endpoint: 'https://3001-fuchsia-bedbug-nu1k5ciw.ws-eu03.gitpod.io',
			
			input_fluids_data: 
				{
					separator_tag: "",
					operatingpressure: "-",
					operatingtemperature: "-",
					oildensity: "-",
					gasdensity: "-",
					mixturedensity: "-",
					waterdensity: "-",
					feedbsw: "-",
					liquidviscosity: "-",
					gasviscosity: "-",
					gasmw: "-",
					liqmw: "-",
					gascomprz: "-",
					especificheatratio: "-",
					liquidsurfacetension: "-",
					liquidvaporpressure: "-",
					liquidcriticalpressure: "-",
					standardgasflow: "-",
					standardliquidflow: "-",
					actualgasflow: "-",
					actualliquidflow: "-"
				  }
			,
			input_separators_data:
				{
					separator_tag: "",
    				internaldiameter: "-",
    				ttlength: "-",
    				highleveltrip: "-",
    				highlevelalarm: "-",
    				normalliquidlevel: "-",
    				lowlevelalarm: "-",
    				inletnozzle: "-",
    				gasoutletnozzle: "-",
    				liquidoutletnozzle: "-",
    				inletdevicetype: "-",
    				demistertype: "-"
				  }
			,
			input_relief_valve_data:
				{
					separator_tag: '',
    				rvtag: "-",
    				rvsetpressure: "-",
    				rvorificearea: "-"
				  }
			,
			input_level_control_valve:
				{
					separator_tag: "",
					lcvtag: "-",
					lcvcv: "-",
					lcvfactorfl: "-",
					lcvfactorfi: "-",
					lcvfactorfp: "-",
					lcvinletpressure: "-",
					lcvoutletpressure: "-",
				  }
			,

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