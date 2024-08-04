import { useForm, SubmitHandler } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { useAppContext } from "@/context/AppContext";
import { useMutation } from "react-query";
import * as apiClient from "../api/api-client";
import { CreateProductReviewFormData } from "@/types";
import Loading from "./Loading";
import { Link } from "react-router-dom";

type ProductReviewFormProps = {
  productId: string;
};

const ProductReviewForm = ({ productId }: ProductReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isLoggedin, showToast, addReview, user, addPreview } =
    useAppContext();

  const createReviewId = () => {
    const reviewId = Math.random().toString(36).substring(2, 11);
    return reviewId;
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateProductReviewFormData>();

  const { mutate: createReview, isLoading } = useMutation(
    apiClient.createReview,
    {
      onSuccess: async () => {
        showToast({
          message: "Review submitted successfully",
          type: "success",
        });
        reset({ comment: "" });
        setRating(0);
        setHover(0);
        setIsDialogOpen(false); // Close the dialog after successful submission
      },
      onError: (error: Error) => {
        showToast({ message: error.message, type: "error" });
      },
    }
  );

  const onSubmit: SubmitHandler<CreateProductReviewFormData> = (data) => {
    const reviewData = {
      comment: data.comment,
      productId,
      starRating: rating,
      reviewId: createReviewId(), // Include reviewId here
      previewAded: addPreview(),
    };

    const reviewDataForState = {
      ...reviewData,
      createdAt: new Date().toISOString(),
      firstName: user?.firstName,
      lastName: user?.lastName,
      productId: productId,
      role: user?.role,
      userId: user?._id,
    };
    addReview(reviewDataForState);
    createReview(reviewData);
  };

  const textValue = watch("comment"); // watch input value by passing the name of it

  return (
    <>
      {isLoggedin ? (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button className="font-bold bg-green-100" variant={"outline"}>
              Write a review
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Write a review</AlertDialogTitle>
              <AlertDialogDescription>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <FaStar
                        key={index}
                        size={24}
                        style={{ cursor: "pointer", marginRight: 10 }}
                        color={
                          starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                        }
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                      />
                    );
                  })}
                </div>
              </AlertDialogDescription>
              <AlertDialogDescription>
                <Textarea
                  placeholder="Enter your review here"
                  {...register("comment", { required: true })}
                />
                {errors.comment && (
                  <span className="text-red-500">This field is required</span>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={
                  isLoading || !textValue || textValue.length <= 10 || !rating
                }
                onClick={handleSubmit(onSubmit)}
              >
                {isLoading ? <Loading /> : "Submit"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Button className="font-bold bg-green-100" variant={"outline"}>
          <Link to="/sign-in">Login to write a review</Link>
        </Button>
      )}
    </>
  );
};

export default ProductReviewForm;
