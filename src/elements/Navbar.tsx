import arcLogo from "../assets/images/arc-logo-dark.png";
import {HTMLAttributes} from "react";

export type NavbarProps = {
  className?: HTMLAttributes<HTMLHeadingElement>['className'];
}

export default function Navbar(props: NavbarProps) {
  return (
    <header className={`${props.className || ""} fixed z-40 top-0 left-0 w-full drop-shadow-lg/25`}>
      {/*Primary Navbar*/}
      <div className={"bg-sec-arc-copengreen w-full h-12"}>
      
      </div>
      {/*Secondary Navbar*/}
      <div className={"bg-prim-arc-white w-full h-20"}>
        <div className={"lg:w-[57%] w-[80%] ml-auto mr-auto h-full flex flex-row justify-between items-center"}>
          <a href={"/"}><img alt={"ARC Logo"} src={arcLogo} className={"h-5"}/></a>
          <h1 className={"font-thewave-demibold"}>Item Registration</h1>
        </div>
      </div>
    </header>
  );
}