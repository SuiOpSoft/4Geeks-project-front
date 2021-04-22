const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
			tutorial_inputs: false,
			
			tutorial_outputs:false,

			endpoint: 'https://3001-copper-canidae-eoz3dy6c.ws-eu03.gitpod.io',
			
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
			// runTutorialTrigger(run) {
			// 	const store = getStore();
			// 	setStore({ runTutorial: run });
			//}
		}
	};
};

export default getState;