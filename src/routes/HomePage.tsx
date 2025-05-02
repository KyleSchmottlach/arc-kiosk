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
        <div className={"flex md:flex-row flex-col items-center w-[80%] mr-auto ml-auto"}>
          <div className={"flex flex-col md:w-[50%] w-[80%] md:justify-start md:items-start items-center"}>
            <h1 className={"font-thewave-bold text-3xl w-fit"}>Item Registration</h1>
            <DividerBar />
            <p className={"w-fit"}>Use this site to register items taken</p>
            <ARCButton onClick={() => {setRegistering(true)}} className={"w-fit mt-6"} icon>Register Items</ARCButton>
          </div>
          <div className={"md:w-[50%] w-[80%] md:ml-4 md:mt-0 ml-0 mt-8"}>
            <img alt={"Picture of an ARC Reuse Center"} src={ReuseCenter} className={"grow"} style={{justifyContent: "inherit", alignContent: "inherit"}}/>
          </div>
        </div>
        {registering ? <CameraModal closeOnClick={() => setRegistering(false)}/> : <></>}
      </div>
    </div>
  );
};