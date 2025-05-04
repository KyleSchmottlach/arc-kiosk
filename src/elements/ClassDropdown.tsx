import {Field, Select} from "@headlessui/react";
import React, {HTMLAttributes} from "react";

export type ClassDropdownProps = {
  className?: HTMLAttributes<HTMLSelectElement>['className'];
  defaultValue?: string;
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  readableResults: Record<string, number>;
};

const validClasses: Record<string, string> = {
  "bed": "Bed",
  "chair": "Chair",
  "bowl": "Bowl",
  "dining table": "Dining Table",
  "couch": "Couch",
  "tv": "Tv",
  "cup": "Cup",
  "wine glass": "Wine Glass",
  "bottle": "Bottle",
  "fork": "Fork",
  "knife": "Knife",
  "spoon": "Spoon",
  "umbrella": "Umbrella",
  "backpack": "Backpack",
  "handbag": "Handbag",
  "suitcase": "Suitcase",
  "skis": "Skis",
  "snowboard": "Snowboard",
  "frisbee": "Frisbee",
  "sports ball": "Sports Ball",
  "skateboard": "Skateboard",
  "tennis racket": "Tennis Racket",
  "toilet": "Toilet",
  "book": "Book",
  "teddy bear": "Teddy Bear"
}

export default function ClassDropdown(props: ClassDropdownProps) {
  return (
    <Field>
      <div>
        <Select
          defaultValue={props.defaultValue}
          onChange={props.handleOnChange}
        >
          {Object.entries(validClasses).map(([className, readableName]) => {
            if(Object.keys(props.readableResults).includes(className) && props.defaultValue !== className) return (<></>);
            else return (
              <option key={className} value={className}>{readableName}</option>
            );
          })}
        </Select>
      </div>
    </Field>
  )
}