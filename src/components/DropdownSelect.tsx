"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import List from "./List";
import { DropdownProps, TreeNode } from "@/types";
import { getServiceCategories } from "@/actions/serviceCategories";

const DropdownSelect: FC<DropdownProps> = ({ selected, setSelected }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<TreeNode[]>([]);

  // Use a single ref for the whole dropdown component
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Fetch categories once
  useEffect(() => {
    const fetchData = async () => {
      const data = await getServiceCategories();
      console.log("data", data);
      setData(data);
    };
    // fetchData();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="flex flex-col gap-2 w-full relative"
    >
      {/* Selected item */}
      <div
        className="flex items-center justify-between gap-1 bg-white p-2 w-full rounded-md cursor-pointer"
        onClick={() => setOpen((val) => !val)}
      >
        <div className="text-black-2">
          {selected ? (
            <span className="text-black-1">{selected}</span>
          ) : (
            "Select job category"
          )}
        </div>
        {open ? (
          <TriangleUpIcon className="text-primary-1 w-6 h-6" />
        ) : (
          <TriangleDownIcon className="text-primary-1 w-6 h-6" />
        )}
      </div>

      {/* Dropdown items */}
      {open && (
        <div className="p-2 bg-white rounded-md w-full h-fit absolute top-[115%] border-2 border-primary-1 z-10">
          <List
            setOpen={setOpen}
            setSelected={setSelected}
            items={data}
          />
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
