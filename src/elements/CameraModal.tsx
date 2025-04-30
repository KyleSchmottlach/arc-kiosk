import {HTMLAttributes, useCallback, useEffect, useRef, useState} from "react";
import IconButton from "./IconButton.tsx";
import CloseIcon from "./CloseIcon.tsx";
import Webcam from "react-webcam";
import ARCButton from "./ARCButton.tsx";
// import axios from "axios";

export type CameraModalProps = {
  className?: HTMLAttributes<HTMLDivElement>['className'];
  closeOnClick: () => void;
}

export default function CameraModal(props: CameraModalProps) {
  const webcamRef = useRef<Webcam | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const videoConstraints: MediaTrackConstraints = {
    facingMode: "environment",
    width: 1920,
    height: 1080,
  };
  
  const capture = useCallback(() => {
    if(webcamRef.current) setCapturedImage(webcamRef.current.getScreenshot({width: 1920, height: 1080}));
  }, [webcamRef]);
  
  const onMediaStreamHandler = (media: MediaStream) => {
    console.log(`Width: ${media.getVideoTracks()[0].getSettings().width}`);
    console.log(`Height: ${media.getVideoTracks()[0].getSettings().height}`);
  };
  
  const handleUploadImage = () => {
    // try {
    //   axios.post()
    // } catch (e) {
    //
    // }
    
  }
  
  useEffect(() => {
    console.log(capturedImage);
  }, [capturedImage]);
  
  return (
    <div className={`${props.className || "fixed w-screen h-screen p-4 top-0 left-0 z-50 flex justify-center items-center"}`}>
      <div className={"fixed h-screen w-screen top-0 left-0 bg-prim-arc-black opacity-60"} style={{zIndex: 45}} onClick={props.closeOnClick}/>
      <div className={"relative w-[60%] h-fit max-h-[calc(100vh-2rem)] bg-prim-arc-white rounded-xl z-50 flex flex-col justify-center items-center"}>
        <IconButton className={"absolute self-start top-0 left-0 m-2"} onClick={props.closeOnClick} iconElement={<CloseIcon />}/>
        <div className={"w-full h-fit overflow-scroll"}>
          <div className={"flex w-full p-8 flex-col justify-center align-middle"}>
            { !capturedImage ?
              <>
                <Webcam onUserMedia={onMediaStreamHandler} mirrored disablePictureInPicture audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className={"pb-4 w-[80%] mx-auto"} videoConstraints={videoConstraints}/>
                <ARCButton onClick={capture} className={"w-fit self-center"}>Take Photo</ARCButton>
              </> :
              <>
                <img alt={"Captured Image"} src={capturedImage} className={"w-[80%] mx-auto pt-6"}/>
                <div className={"flex flex-row justify-center pt-6"}>
                  <ARCButton onClick={handleUploadImage} className={"w-fit"} emphasized>Submit Photo</ARCButton>
                  <div className={"h-0 px-[1%]"}/>
                  <ARCButton onClick={() => setCapturedImage(null)} className={"w-fit"}>Retake Photo</ARCButton>
                </div>
              </>
            }
            
          </div>
        </div>
      </div>
    </div>
  );
}