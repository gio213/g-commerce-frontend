import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

interface DeleteConfirmationDialogProps {
  onConfirm?: () => void;
  onClick?: () => void;
  buttonText?: string;
  tobBeDeleted?: string;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  onConfirm,
  buttonText,
  tobBeDeleted,
}) => (
  <AlertDialog>
    <AlertDialogTrigger>
      <Button
        type="submit"
        size={"sm"}
        className={
          buttonText === "Delete"
            ? "bg-red-500"
            : buttonText === "Update"
              ? "bg-green-500"
              : ""
        }
      >
        {buttonText}
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {buttonText === "Delete"
            ? "Delete Product"
            : buttonText === "Update"
              ? "Update Product"
              : ""}
        </AlertDialogTitle>
        <AlertDialogDescription>
          {buttonText === "Delete"
            ? `Are you sure you want to delete this ${tobBeDeleted}?`
            : buttonText === "Update"
              ? `Are you sure you want to update this ${tobBeDeleted}?`
              : ""}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default DeleteConfirmationDialog;
