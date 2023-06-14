import Image from "next/legacy/image";
import { v4 } from "uuid";
import LineOverlay from "./LineOverlay";
import { Staff } from "interface";

const StaffComponent = ({ item }: { item: Staff }) => {
  return (
    <>
      <div className="flex gap-x-2 p-2">
        <div className="relative h-16 w-16">
          <Image
            // "image_url": "string"
            src={item.person.images.jpg.image_url}
            // "name": "string"
            alt={item.person.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg "
          />
        </div>
        <div className="w-1/2 space-y-3 truncate">
          <p className={`text-sm font-semibold text-primary md:text-base`}>
            {item.person.name}
          </p>
          {item.positions.map((position, i: any) => (
            <span key={v4()} className="text-xs font-normal">{`${
              i ? "," : ""
            } ${position}`}</span>
          ))}
        </div>
      </div>
      <LineOverlay />
    </>
  );
};

export default StaffComponent;
