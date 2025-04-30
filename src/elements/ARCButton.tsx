import {HTMLAttributes} from "react";
import ButtonArrow from "./ButtonArrow.tsx";

export type ARCButtonProps = {
  className?: HTMLAttributes<HTMLButtonElement>['className'];
  children: string
  onClick: () => void;
};

export default function ARCButton(props: ARCButtonProps) {
  return (
    <button onClick={props.onClick} className={`${props.className || ""} rounded-full font-bold`}>
      <div className={"flex flex-row justify-between align-middle"}>
        {props.children}
        <ButtonArrow className={"self-center ml-4"}/>
      </div>
    </button>
  );
}