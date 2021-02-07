import { Context } from "../../store/context";
import {useContext} from 'react'


export function SeparatorGasAndLiquidAreasCalc(Diam, Length, HHl, Nl, Ll, INd, GOn, LOn){
    console.log(Diam)
    const { store, actions } = useContext(Context);


    let LA_Hh;
    let LA_Nl;
    let LA_Ll;


   let Pi = 3.14159265358979;
   let Area_Sep  = Pi * Diam**2/(4*10**6);
   let Radio = Diam/2;
   let INArea = Pi * INd**2/(4*10**6);
   let GONArea  = Pi * GOn**2/(4*10**6);
   let LONArea  = Pi * LOn**2/(4*10**6);
   let ABS_R_Hh = Math.abs(Radio-HHl);
   let ABS_R_Nl = Math.abs(Radio-Nl);
   let ABS_R_Ll = Math.abs(Radio-Ll);
   let AHh=2.0*Math.acos(ABS_R_Hh/Radio);
   let ANl=2.0*Math.acos(ABS_R_Nl/Radio);
   let ALl=2.0*Math.acos(ABS_R_Ll/Radio);
   let TAHh=0.5*ABS_R_Hh*Diam*Math.sin(AHh/2.0)/1.0e+6;
   let TANl=0.5*ABS_R_Nl*Diam*Math.sin(ANl/2.0)/1.0e+6;
   let TALl=0.5*ABS_R_Ll*Diam*Math.sin(ALl/2.0)/1.0e+6;
    if (HHl>Radio) {LA_Hh=Radio**2/2.0*(2*Pi-AHh)/1.0E+6+TAHh} 
        else {LA_Hh=Radio**2/2.0*AHh/1.0E+6-TAHh}
    if (Nl>Radio) {LA_Nl=Radio**2/2.0*(2*Pi-ANl)/1.0E+6+TANl} 
        else {LA_Nl=Radio**2/2.0*ANl/1.0E+6-TANl}
    if (Ll>Radio) {LA_Ll=Radio**2/2.0*(2*Pi-ALl)/1.0E+6+TALl} 
        else {LA_Ll=Radio**2/2.0*ALl/1.0E+6-TALl}
   let GA_Hh=Area_Sep-LA_Hh;
   let GA_Nl=Area_Sep-LA_Nl;
   let GA_Ll=Area_Sep-LA_Ll;

   return store.separatorsOutput.Separator_Cross_sectional_Area_Ratio=Radio;
   

}
