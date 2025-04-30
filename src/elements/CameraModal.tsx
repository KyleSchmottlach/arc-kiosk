import {HTMLAttributes} from "react";
import IconButton from "./IconButton.tsx";
import CloseIcon from "./CloseIcon.tsx";

export type CameraModalProps = {
  className?: HTMLAttributes<HTMLDivElement>['className'];
}

export default function CameraModal(props: CameraModalProps) {
  return (
    <div className={`${props.className || ""}`}>
      <div className={"fixed h-screen w-screen top-0 left-0 bg-prim-arc-black opacity-60"} style={{zIndex: 45}} onClick={() => console.log("Closing Modal")}/>
      <div className={"fixed w-[60%] h-[60%] top-[50%] left-[50%] translate-[-50%] bg-prim-arc-white rounded-xl"} style={{zIndex: 50}}>
        <IconButton className={"absolute top-0 left-0 m-2"} onClick={() => console.log("Closing Modal")} iconElement={<CloseIcon />}/>
        <div className={"flex w-full h-full flex-col justify-center align-middle"}>
        
        </div>
      </div>
    </div>
  );
}