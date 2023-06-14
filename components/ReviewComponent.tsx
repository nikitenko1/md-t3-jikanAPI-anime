import React, { useState } from "react";
import Image from "next/legacy/image";
import moment from "moment";
import truncate from "helper/truncate";
import { Review } from "interface";

const ReviewComponent = ({ review }: { review: Review }) => {
  const [readMore, setReadMore] = useState<boolean>(false);

  return (
    <div className="w-full  border-b-2 border-[#a8a8a8] p-2">
      <div className="space-between flex gap-x-1 text-sm md:text-base">
        <div className="flex items-start gap-x-2 py-4">
          <Image
            // "image_url": "string"
            src={review.user.images.jpg.image_url}
            width={50}
            height={70}
            // "username": "string"
            alt={review.user.username}
            className="rounded-lg"
          />
          <div className="space-y-1">
            <p className="font-thin text-blue-500">{review.user.username}</p>
            <p className="text-gray-400">
              {/* "overall": 0 */}
              <span className="font-bold">{review.reactions.overall}</span>{" "}
              people find this review helpful
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-x-1  text-sm text-gray-500">
                <span>🤔</span>
                {/* "confusing": 0 */}
                <p>{review.reactions.confusing}</p>
              </div>
              <div className="flex items-center gap-x-1 text-sm text-gray-500">
                <span>😎</span>
                {/* "creative": 0 */}
                <p>{review.reactions.creative}</p>
              </div>
              <div className="flex items-center gap-x-1 text-sm text-gray-500">
                <span>😂</span>
                {/* "funny": 0 */}
                <p>{review.reactions.funny}</p>
              </div>
              <div className="flex items-center gap-x-1 text-sm text-gray-500">
                <span>💡</span>
                {/* "informative": 0 */}
                <p>{review.reactions.informative}</p>
              </div>
              <div className="flex items-center gap-x-1 text-sm text-gray-500">
                <span>❤</span>
                {/* "love_it": 0 */}
                <p>{review.reactions.love_it}</p>
              </div>
              <div className="flex items-center gap-x-1 text-sm text-gray-500">
                <span>👍</span>
                {/* "nice": 0 */}
                <p>{review.reactions.nice}</p>
              </div>
              <div className="flex items-center gap-x-1 text-sm text-gray-500">
                <span>✔️</span>
                {/* "well_written": 0 */}
                <p>{review.reactions.well_written}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-auto space-y-2 text-[10px] md:text-sm">
          {/* "date": "string" */}
          <p className="">{moment(review.date).format("LL")}</p>
          {/* "score": 0 */}
          <p>Overall rating: {review?.score}</p>
        </div>
      </div>
      <div className="borderOverlay h-[1px] w-full"></div>{" "}
      <div>
        <p className="py-4 text-xs md:text-sm">
          {/* "review": "string" */}
          {readMore ? review.review : truncate(review.review, 1000)}

          {review.review.length > 1000 && (
            <>
              <button
                onClick={() => setReadMore(!readMore)}
                className=" ml-1  cursor-pointer font-semibold text-primary"
              >
                {readMore ? "Show less" : "Read more"}
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default ReviewComponent;
