import {HTMLAttributes} from "react";

export type ButtonArrowProps = {
  className?: HTMLAttributes<HTMLOrSVGElement>['className'];
}

export default function ButtonArrow(props: ButtonArrowProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none"
         className={`${props.className || ""}`}>
      <path d="M1 1l7.5 7.5L1 16" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path>
    </svg>
  );
}