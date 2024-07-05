interface PrefenceSelectorBarProps {}

export default function PrefenceSelectorBar({}: PrefenceSelectorBarProps) {
  return (
    <div
      className={
        "w-[90vw] h-[65px] mx-auto flex flex-row justify-around items-center bg-green-500"
      }
    >
      <div className={"w-28 h-10 bg-rose-500 rounded-xl"}>High Protein</div>
      <div className={"w-28 h-10 bg-rose-500 rounded-xl"}>Low Carb</div>
      <div className={"w-28 h-10 bg-rose-500 rounded-xl"}>Vegetarian</div>
      <div className={"w-28 h-10 bg-rose-500 rounded-xl"}>Halal</div>
      {/*<div className={"w-28 h-10 bg-rose-500 rounded-xl"}></div>*/}
      {/*<div className={"w-28 h-10 bg-rose-500 rounded-xl"}></div>*/}
      {/*<div className={"w-28 h-10 bg-rose-500 rounded-xl"}></div>*/}
      {/*<div className={"w-28 h-10 bg-rose-500 rounded-xl"}></div>*/}
      {/*<div className={"w-28 h-10 bg-rose-500 rounded-xl"}></div>*/}
      {/*<div className={"w-28 h-10 bg-rose-500 rounded-xl"}></div>*/}
    </div>
  );
}
