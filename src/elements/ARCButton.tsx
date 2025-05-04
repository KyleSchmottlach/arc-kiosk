import {HTMLAttributes, JSX} from "react";
import ButtonArrow from "./ButtonArrow.tsx";

export type ARCButtonProps = {
  className?: HTMLAttributes<HTMLButtonElement>['className'];
  children: JSX.Element | string;
  onClick: () => void;
  icon?: boolean;
  emphasized?: boolean;
  disabled?: boolean;
};

export default function ARCButton(props: ARCButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`${props.className || ""}
        rounded-full
        font-bold
        border-[3px]
        border-solid
        border-sec-arc-ctagreen
        ${props.emphasized ? 'bg-sec-arc-ctagreen' : 'bg-prim-arc-white'}
        ${props.emphasized ? 'text-prim-arc-white' : 'text-sec-arc-ctagreen'}
        py-[0.6em]
        px-[1.2em]
        cursor-pointer
        transition-colors duration-[250ms]
        hover:bg-sec-arc-copengreen
        hover:text-prim-arc-white
        hover:border-sec-arc-copengreen
        ${props.emphasized ? "disabled:bg-sec-arc-copengreen" : "disabled:bg-sec-arc-lightgrey"}
        ${props.emphasized ? "disabled:text-prim-arc-white": "disabled:text-sec-arc-copengreen"}
        disabled:border-sec-arc-copengreen
        disabled:cursor-not-allowed`
      }
      disabled={props.disabled}
    >
      <div className={"flex flex-row justify-between align-middle"}>
        {props.children}
        {props.icon ? <ButtonArrow className={"self-center ml-4"}/> : <></>}
      </div>
    </button>
  );
}