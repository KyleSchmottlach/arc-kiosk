import {HTMLAttributes, useCallback, useEffect, useRef, useState} from "react";
import IconButton from "./IconButton.tsx";
import CloseIcon from "./CloseIcon.tsx";
import Webcam from "react-webcam";
import ARCButton from "./ARCButton.tsx";
import axios from "axios";
import Spinner from "./Spinner.tsx";
// import ClassDropdown from "./ClassDropdown.tsx";

export type CameraModalProps = {
  className?: HTMLAttributes<HTMLDivElement>['className'];
  closeOnClick: () => void;
}

type ResultsType = {
  class: string;
  score: number;
  weight: number;
};

export default function CameraModal(props: CameraModalProps) {
  const webcamRef = useRef<Webcam | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [results, setResults] = useState<ResultsType[] | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  
  const [readableResults, setReadableResults] = useState<Record<string, number>>({});
  
  const videoConstraints: MediaTrackConstraints = {
    facingMode: "environment",
    width: 1920,
    height: 1080,
  };
  
  const capture = useCallback(() => {
    if(webcamRef.current) setCapturedImage(webcamRef.current.getScreenshot());
  }, [webcamRef]);
  
  const handleUploadImage = () => {
    const reqURL = import.meta.env.PROD ? "/api/detectron2" : `${import.meta.env.VITE_BACKEND_URL}/api/detectron2`;
    
    setProcessing(true);
    
    axios.post(reqURL, {
      imageData: capturedImage
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      setProcessedImage(res.data.image);
      setResults(res.data.results);
      setProcessing(false);
    }).catch(err => {
      console.log(err);
      setProcessing(false);
    });
  }
  
  useEffect(() => {
    const tempReadableResults: Record<string, number> = {};
    
    if(results) {
      results.forEach((val: ResultsType) => {
        tempReadableResults[val.class] = (tempReadableResults[val.class] || 0) + 1;
      })
    }
    
    setReadableResults(tempReadableResults);
  }, [results]);
  
  useEffect(() => {
    console.log(readableResults);
  }, [readableResults]);
  
  return (
    <div className={`${props.className || "fixed w-screen h-screen p-4 top-0 left-0 z-50 flex justify-center items-center min-w-[350px] overflow-scroll"}`}>
      <div className={"fixed h-screen w-screen top-0 left-0 bg-prim-arc-black opacity-60"} style={{zIndex: 45}} onClick={props.closeOnClick}/>
      <div className={"relative sm:w-[80%] w-full h-fit max-h-[calc(100vh-2rem)] bg-prim-arc-white rounded-xl z-50 flex flex-col justify-center items-center align-middle"}>
        <IconButton className={"absolute self-start top-0 left-0 m-2"} onClick={props.closeOnClick} iconElement={<CloseIcon />}/>
        <div className={"w-full h-fit overflow-scroll"}>
          <div className={"flex w-full p-8 flex-col justify-center align-middle"}>
            { !capturedImage ?
              <>
                <Webcam disablePictureInPicture audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className={"pb-4 w-[80%] mx-auto"} videoConstraints={videoConstraints}/>
                <ARCButton onClick={capture} className={"w-fit self-center"}>Take Photo</ARCButton>
              </> : !processedImage ?
              <>
                <img alt={"Captured Image"} src={capturedImage} className={"w-[80%] mx-auto pt-6"}/>
                <div className={"flex flex-row justify-center pt-6"}>
                  <ARCButton onClick={handleUploadImage} className={"w-fit"} disabled={processing} emphasized>{processing ? <Spinner /> : "Submit Photo"}</ARCButton>
                  <div className={"h-0 px-[1%]"}/>
                  <ARCButton onClick={() => {
                    setCapturedImage(null);
                    setProcessedImage(null);
                    setResults(null);
                  }} className={"w-fit"} disabled={processing}>Retake Photo</ARCButton>
                </div>
              </> :
              <>
                <img alt={"Processed Image"} src={processedImage} className={"w-[80%] mx-auto pt-6"}/>
                {/*<div className={"w-[50%] mx-auto"}>*/}
                {/*{Object.entries(readableResults).map(([key, value]) => {*/}
                {/*  */}
                {/*  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {*/}
                {/*    console.log(e.target.value);*/}
                {/*    */}
                {/*    const newReadableResults = Object.fromEntries(*/}
                {/*      Object.entries(readableResults).filter(([keyToRemove]) => keyToRemove !== key)*/}
                {/*    );*/}
                {/*    */}
                {/*    newReadableResults[e.target.value] = value;*/}
                {/*    */}
                {/*    console.log(newReadableResults);*/}
                {/*    */}
                {/*    setReadableResults(newReadableResults);*/}
                {/*  }*/}
                {/*  */}
                {/*  console.log(key, value);*/}
                {/*  return (*/}
                {/*    <ClassDropdown defaultValue={key} handleOnChange={handleOnChange} readableResults={readableResults}/>*/}
                {/*  );*/}
                {/*})}*/}
                {/*</div>*/}
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}