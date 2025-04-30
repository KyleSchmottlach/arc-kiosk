import {HTMLAttributes, JSX} from "react";

export type IconButtonProps = {
  className?: HTMLAttributes<HTMLButtonElement>['className'];
  iconElement: JSX.Element;
  onClick: () => void;
}

export default function IconButton(props: IconButtonProps) {
  return (
    <button
      className={`
        ${props.className || ""}
        rounded-full
        p-1
        bg-transparent
        text-sec-arc-copengreen
        cursor-pointer
        transition-colors duration-[250ms]
        hover:bg-sec-arc-lightgrey
      `}
      onClick={props.onClick}
    >{props.iconElement}</button>
  );
}