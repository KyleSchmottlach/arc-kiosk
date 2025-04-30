import {useEffect, useRef} from "react";

export default function Camera() {
  const camera = useRef(null);
  
  useEffect(() => {
  
  }, []);
  
  return (
    <video ref={camera} className={"rounded-2xl "}></video>
  );
}