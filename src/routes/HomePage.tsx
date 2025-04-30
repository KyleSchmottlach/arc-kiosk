import DividerBar from "../elements/DividerBar.tsx";
import ReuseCenter from "../assets/images/ReuseCenter.png";
import Webcam from "react-webcam";
import {useCallback, useEffect, useRef, useState} from "react";
import ARCButton from "../elements/ARCButton.tsx";

export default function HomePage() {
  const webcamRef = useRef<Webcam | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [registering, setRegistering] = useState<boolean>(false);
  
  const videoConstraints: MediaTrackConstraints = {
    facingMode: "environment",
  };
  
  const capture = useCallback(() => {
    if(webcamRef.current) setCapturedImage(webcamRef.current.getScreenshot());
  }, [webcamRef]);
  
  useEffect(() => {
    console.log(capturedImage);
  }, [capturedImage]);
  
  useEffect(() => {
    console.log(registering);
  }, [registering]);
  
  return (
    <div className={"flex flex-col w-full h-full justify-center align-middle"}>
      <div>
        {/*Header Section*/}
        <br style={{lineHeight: "3rem"}}/>
        <div className={"flex flex-row items-center w-[80%] mr-auto ml-auto"}>
          <div className={"flex flex-col w-[50%] justify-start"}>
            <h1 className={"font-bold text-3xl w-fit"}>Item Registration</h1>
            <DividerBar />
            <p className={"w-fit"}><b>CHANGE THIS</b> Use this site to register items taken</p>
            <ARCButton onClick={() => {setRegistering(true)}} className={"w-fit mt-6"}>Click to Register</ARCButton>
          </div>
          <div className={"w-[50%]"}>
            <img alt={"Picture of an ARC Reuse Center"} src={ReuseCenter} className={"grow"} style={{justifyContent: "inherit", alignContent: "inherit"}}/>
          </div>
        </div>
        
        <br style={{lineHeight: "3rem"}}/>
        
        {/*Camera Section*/}
        <div className={"bg-sec-arc-lightgrey w-full h-fit"}>
          
          {/*<Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className={"pb-4 pt-4 ml-auto mr-auto h-96"} videoConstraints={videoConstraints}/>*/}
          {/*<button onClick={capture}>Capture Photo</button>*/}
        </div>
      </div>
    </div>
  );
};