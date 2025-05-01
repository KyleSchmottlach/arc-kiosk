import DividerBar from "../elements/DividerBar.tsx";
import ReuseCenter from "../assets/images/ReuseCenter.png";
import {useState} from "react";
import ARCButton from "../elements/ARCButton.tsx";
import CameraModal from "../elements/CameraModal.tsx";

export default function HomePage() {
  const [registering, setRegistering] = useState<boolean>(false);
  
  return (
    <div className={"flex flex-col w-full h-full justify-center align-middle"}>
      <div>
        <div className={"flex flex-row items-center w-[80%] mr-auto ml-auto"}>
          <div className={"flex flex-col w-[50%] justify-start"}>
            <h1 className={"font-thewave-bold text-3xl w-fit"}>Item Registration</h1>
            <DividerBar />
            <p className={"w-fit"}>CHANGE THIS Use this site to register items taken</p>
            <ARCButton onClick={() => {setRegistering(true)}} className={"w-fit mt-6"} icon>Click to Register</ARCButton>
          </div>
          <div className={"w-[50%]"}>
            <img alt={"Picture of an ARC Reuse Center"} src={ReuseCenter} className={"grow"} style={{justifyContent: "inherit", alignContent: "inherit"}}/>
          </div>
        </div>
        {registering ? <CameraModal closeOnClick={() => setRegistering(false)}/> : <></>}
      </div>
    </div>
  );
};