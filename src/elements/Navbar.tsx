import arcLogo from "../assets/images/arc-logo-dark.png";

export default function Navbar() {
  return (
    <div className={"absolute top-0 left-0 w-full drop-shadow-lg"}>
      {/*Primary Navbar*/}
      <div className={"bg-sec-arc-copengreen w-full h-12"}>
      
      </div>
      {/*Secondary Navbar*/}
      <div className={"bg-prim-arc-white w-full h-16"}>
        <div className={"w-[80%] ml-auto mr-auto h-full flex flex-row justify-between items-center"}>
          <a href={"/"}><img alt={"ARC Logo"} src={arcLogo} className={"h-7"}/></a>
          <h1 className={"text-lg"}>Register Items</h1>
        </div>
      </div>
    </div>
  );
}