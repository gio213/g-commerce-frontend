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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as apiCLient from "../../api-client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { categoryType } from "@/types";

type AdminDropDownFormsProps = {
  value?: string;
  onChangeHandler: (value: string) => void;
};

const AdminDropDownForms = ({
  value,
  onChangeHandler,
}: AdminDropDownFormsProps) => {
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState<categoryType[]>([]);
  const queryClient = useQueryClient();

  useQuery("categories", apiCLient.getAllCategories, {
    onSuccess: (data) => {
      setCategories(data);
    },
  });

  const mutattion = useMutation(apiCLient.createCategory, {
    onSuccess: () => {
      setNewCategory("");
      setCategories([]);

      queryClient.invalidateQueries("categories");
    },
  });

  const handleAddCategory = async () => {
    try {
      const trimmedCategoryName = newCategory.trim();
      if (!trimmedCategoryName) {
        // Handle empty category name if needed
        return;
      }

      const category = await mutattion.mutateAsync({
        categoryName: trimmedCategoryName,
      });
      setCategories((prevState) => [...prevState, category]);
    } catch (error) {
      console.error("Error adding category:", error);
      // Handle the error appropriately, e.g., show a notification to the user
    }
  };

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              className="select-item p-regular-14"
              value={category.categoryName}
              key={category._id}
            >
              {category.categoryName}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger className="flex w-full py-3 pl-8 rounded-sm p-medium-14 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text "
                  placeholder="Category name"
                  className="mt-3 input-field "
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleAddCategory()}>
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default AdminDropDownForms;
