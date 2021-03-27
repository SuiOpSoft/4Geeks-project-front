const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			endpoint: 'https://3001-turquoise-moose-ksnnjong.ws-eu03.gitpod.io',
			
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
			user:
				{
					company_id: "",
					email: "",
					firstname: "-",
					id: "-",
					lastname: "-",
					password: "-"
			}
			,
			facility:
			{
				company_id: "",
				facilitycode: "",
				id: "-",
				location: "-",
				name: "-",
		}
	

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