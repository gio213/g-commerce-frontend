import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateProductFormData } from "@/types";
import { useForm } from "react-hook-form";
import AdminDropDownForms from "./AdminDropDownForms";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as apiClient from "../api/api-client";
import ImagePreview from "@/components/ImagePreview";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
const AddProductForm = () => {
  const { user, showToast } = useAppContext();
  const [value, setValue] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const {
    register,

    handleSubmit,
    formState: { errors },
    setValue: setFormValue,

    reset,
  } = useForm<CreateProductFormData>();
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleDropdownChange = (value: string) => {
    setValue(value);
    setFormValue("category", value);
  };
  const { isLoading, mutate } = useMutation(apiClient.createProduct, {
    onSuccess: () => {
      reset();
    },
  });

  const data = new FormData();
  const onSubmit = handleSubmit((formData: CreateProductFormData) => {
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price.toString());
    data.append("countInStock", formData.countInStock.toString());
    data.append("category", formData.category);
    data.append("userId", user?._id as string);
    if (selectedFiles && selectedFiles.length > 0) {
      selectedFiles.forEach((file) => {
        data.append("imageFiles", file);
      });
    }

    mutate(data, {
      onSuccess: () => {
        selectedFiles && setSelectedFiles([]);
        showToast({ type: "success", message: "Product added successfully" });

        reset();
      },
      onError: (error) => {
        console.log(error);
        selectedFiles && setSelectedFiles([]);
        showToast({ type: "error", message: "Failed to add product" });

        reset();
      },
    });
  });

  useEffect(() => {
    if (selectedFiles) {
      const previews = Array.from(selectedFiles).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(previews as never[]);
      // Clean up object URLs to prevent memory leaks
      return () => previews.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [selectedFiles]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center w-full gap-5"
      >
        <AdminDropDownForms
          value={value}
          onChangeHandler={handleDropdownChange}
        />
        <Input
          type="text"
          placeholder="Product name"
          {...register("name", { required: "Name is required" })}
          {...(errors.name && {
            className: "input input-bordered input-error",
          })}
        />

        <Textarea
          placeholder="Product description"
          {...register("description", { required: "Description is required" })}
          {...(errors.description && {
            className: "input input-bordered input-error",
          })}
        />
        <Input
          type="number"
          placeholder="Product price"
          step={0.01}
          {...register("price", {
            required: "Price must be provided",
          })}
          {...(errors.price && {
            className: "input input-bordered input-error",
          })}
        />
        <Input
          type="number"
          placeholder="Product count in stock"
          {...register("countInStock", {
            required: "Count in stock must be provided",
          })}
          {...(errors.countInStock && {
            className: "input input-bordered input-error",
          })}
        />
        <Input
          multiple
          accept="image/*"
          type="file"
          placeholder="Product images"
          className="w-full font-normal text-gray-700"
          onChange={handleFileChange}
        />

        <div className="">
          <ImagePreview src={imagePreviews} />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              Adding product... <Loading />
            </>
          ) : (
            "Add Product"
          )}{" "}
        </Button>
      </form>
    </div>
  );
};

export default AddProductForm;
