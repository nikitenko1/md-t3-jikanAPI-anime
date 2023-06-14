import React, { useState } from "react";
import { v4 } from "uuid";
import MotionBtn from "./MotionBtn";
import StaffComponent from "./StaffComponent";
import { Staff } from "interface";

const StaffList = ({ staff }: { staff: Staff[] }) => {
  const [loadMoreStaff, setLoadMoreStaff] = useState(10);

  return (
    <>
      <h1 className="pb-2 text-2xl font-bold">Staff</h1>
      <div className="space-y-4 p-2">
        {staff?.slice(0, loadMoreStaff).map((item) => (
          <StaffComponent key={v4()} item={item} />
        ))}
        <div className="flex justify-center">
          <MotionBtn
            handleClick={() =>
              staff?.length >= loadMoreStaff
                ? setLoadMoreStaff((prev) => (prev += 5))
                : setLoadMoreStaff(10)
            }
            string={staff?.length >= loadMoreStaff ? "Load more" : "Show less"}
          />
        </div>
      </div>
    </>
  );
};

export default StaffList;
