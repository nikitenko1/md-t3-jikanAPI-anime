import React from "react";
import Link from "next/link";
import { v4 } from "uuid";

interface ItemProps {
  text: string;
  link: string;
}

interface DropdownProps {
  title: string;
  items: ItemProps[];
}

const Dropdown = ({ title, items }: DropdownProps) => {
  return (
    <div className="dropdown-left dropdown z-10">
      <label tabIndex={0} className="btn m-1 border-none text-sm">
        {title}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 text-primary shadow"
      >
        {items?.map((item) => (
          <li className="text-sm" key={v4()}>
            <Link href={item.link}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
