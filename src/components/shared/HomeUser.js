import React, { useState }from "react";
import { Dialog } from 'primereact/dialog';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";


export const HomeUser = () => {

  const [displayBasicInput, setDisplayBasicInput] = useState(false);
  const [displayBasicOutput, setDisplayBasicOutput] = useState(false);
  const [displayBasicChart, setDisplayBasicChart] = useState(false);

    const dialogFuncMap = {
        'displayBasicInput': setDisplayBasicInput,
       'displayBasicOutput': setDisplayBasicOutput,
       'displayBasicChart': setDisplayBasicChart
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
  }
  
  let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow });
  L.Marker.prototype.options.icon = DefaultIcon;
    
  return (
    <div className="index">
      <div className="dialog-demo home-user-grid">
        <div className="card home-user-img-input " onClick={() => onClick('displayBasicInput')}>
          <img className="home-user-img " alt="Logo" src="/assets/layout/images/input-icon.png"/>                
        </div>
        <div className="card home-user-img-out " onClick={() => onClick('displayBasicOutput')}>
          <img className="home-user-img" alt="Logo" src="/assets/layout/images/output-icon.png"/>            
        </div>
        <div className="card home-user-img-chart " onClick={() => onClick('displayBasicChart')}>
          <img className="home-user-img" alt="Logo" src="/assets/layout/images/charts-icon.png" />
        </div>
      </div>
      <iframe id="eia_widget" style={{width:"49%", height:"25em"}} src="//www.eia.gov/opendata/embed/iframe.php?series_id=STEO.BREPUUS.A" load="iframe_load"></iframe>
      <iframe id="eia_widget_1" style={{ width: "49%", height: "25em" }} src="//www.eia.gov/opendata/embed/iframe.php?geoset_id=INTL.53-1-TBPD.Q&map=world&relation_mode=line&regions=USA;SAU&start=2005Q1&end=2020Q1&analysis=indexval"></iframe>
      <div id="mapid">
      <MapContainer
				center={[51.505, -0.09]}
				zoom={13}
				scrollWheelZoom={true}
				style={{ height: "45vh", width: "45%", top:"8.9em", left:"1em", borderRadius:"5px" }}>
			  <TileLayer
			  	attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
			  	url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			  />
			  <Marker position={[51.505, -0.09]}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			  </Marker>
			</MapContainer>
      </div>
      <Dialog header="Input Data" visible={displayBasicInput} style={{ width: '70vw' }} onHide={() => onHide('displayBasicInput')}>
        <div className="dialog-learn">
          <div className="row">
            <div className="dialog-learn-input text-center col-5">
              <img src="/assets//layout/images/learn/learn-input.png" />
              <img className="arrow-learn" src="/assets//layout/images/learn/arrow.png"></img>
            </div>
            <div className="dialog-learn-col d-flex align-items-center col-7">
             <p>Click on input to show the available inputs data.</p>
            </div>
          </div>
          <div className="row mt-5">
          <div className="dialog-learn-col1 d-flex align-items-center col-7">
             <p>Here you can choose the input data.</p>
            </div>
            <div className="dialog-learn-input1 text-center col-5">
              <img src="/assets//layout/images/learn/learn-select-input.png" />
            </div>           
          </div>
          <div className="row mt-5">
            <div className="new-separator text-center">
              <img className="dialog-learn-new"src="/assets//layout/images/learn/learn-input-new.png" />
              <img className="arrow-learn-new" src="/assets//layout/images/learn/arrow.png"></img>
              <p>Click on "New" to add a new separator.</p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="new-separator text-center">
              <img className="dialog-learn-new"src="/assets//layout/images/learn/learn-calculate.png" />
              <img className="arrow-learn-scroll" src="/assets//layout/images/learn/arrow.png"></img>
              <p>Slide all the way right.</p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="dialog-learn-pencil text-center col-7">
              <img src="/assets//layout/images/learn/learn-input-pencil.png" />
              <img className="arrow-learn-pencil" src="/assets//layout/images/learn/arrow.png"></img>
            </div>
            <div className="dialog-learn-pencil d-flex align-items-center col-4">
             <p>Click here to open input text params.</p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="input-params text-center">
              <img className="dialog-learn-new"src="/assets//layout/images/learn/learn-input-params.png" />
              <img className="arrow-learn-scroll-params" src="/assets//layout/images/learn/arrow.png"></img>
              <img className="arrow-learn-scroll-params1 " src="/assets//layout/images/learn/arrow.png"></img>
              <p>Insert the data and click on the stick to save it.</p>
            </div>
          </div>
          <div className="row mb-5 mt-5">
            <div className="calculate text-center">
              <img className="dialog-learn-new"src="/assets//layout/images/learn/learn-calculate.png" />
              <img className="arrow-learn-calculate" src="/assets//layout/images/learn/arrow.png"></img>
              <p>When all the inputs data is complete push this button to calculate.</p>
            </div>
          </div>
        </div>
          </Dialog>
          <Dialog header="Output Data" visible={displayBasicOutput} style={{ width: '50vw' }} onHide={() => onHide('displayBasicOutput')}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Dialog>
          <Dialog header="Charts" visible={displayBasicChart} style={{ width: '50vw' }} onHide={() => onHide('displayBasicChart')}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Dialog>
      
    </div>
  );
};
