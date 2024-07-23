import { timeAgo } from "@/helper/helper";
import { Reviews } from "../types/index";
import { useEffect, useRef, useState } from "react";
type ProductReviewsProps = {
  reviews: Reviews[];
};

const ProductReviews = ({ reviews }: ProductReviewsProps) => {
  const reviewRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lastReviewIndex, setLastReviewIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  useEffect(() => {
    if (reviews.length > 0) {
      setLastReviewIndex(0);
      setIsAnimating(true);
      const reviewElement = reviewRefs.current[0];
      if (reviewElement) {
        reviewElement.scrollIntoView({ behavior: "smooth" });
      }
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [reviews]);

  useEffect(() => {
    if (reviews.length > 0) {
      setLastReviewIndex(0);
      const reviewElement = reviewRefs.current[0];
      if (reviewElement) {
        reviewElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [reviews]);
  return (
    <div className="flex flex-col items-center justify-center ">
      <span className="flex items-center justify-between w-full">
        {reviews.length > 0 ? (
          <h1 className="text-3xl font-bold ">Reviews</h1>
        ) : (
          <h1 className="text-3xl font-bold ">No reviews yet</h1>
        )}
        <p>
          total reviews: <span className="font-bold">{reviews.length}</span>
        </p>
      </span>

      {reviews.map((review, index) => (
        <div
          className={`p-4  w-full ${index === lastReviewIndex && isAnimating ? "animate-pulse" : ""}`}
          key={index}
          ref={(el) => (reviewRefs.current[index] = el)}
        >
          <div
            className={` w-full flex flex-col justify-between p-8 mx-auto mt-24 border rounded-md shadow-sm bg-customBlue border-neutral-800 ${index === lastReviewIndex && isAnimating ? "animate-pulse border-green-500 bg-green-100" : ""}`}
          >
            <span className="flex justify-end w-full">
              {timeAgo(review.createdAt!)}
            </span>
            <div className="flex gap-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-yellow-500"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill={i < review.starRating! ? "currentColor" : "none"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
                </svg>
              ))}
            </div>

            <div className="flex items-center gap-6 mt-6 ">
              <div className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-full shadow-sm outline-neutral-800 bg-cyan-50">
                <div className="relative inline-block overflow-hidden rounded-lg border-neutral-800">
                  {review.firstName![0].toUpperCase() +
                    review.lastName![0].toUpperCase()}
                </div>
              </div>
              <div>
                <p className="leading-relaxed tracking-wide text-black-200">
                  {review.firstName} {review.lastName}
                </p>
                <p className="text-xs leading-relaxed tracking-wide text-gray-400">
                  {review.role}
                </p>
              </div>
            </div>
            <p className="my-4 mb-0 text-base font-normal leading-relaxed tracking-wide text-gray-400">
              {review.comment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;
