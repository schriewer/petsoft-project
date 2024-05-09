"use client";

import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { usePetContext } from "@/lib/hooks";
import { Pet } from "../lib/type";
import { addPet, editPet } from "@/actions/actions";
import { useForm } from "react-hook-form";
import PetFormBtn from "./pet-form-btn";
import { toast } from "sonner";
import { useFormState } from "react-dom";
import { Span } from "next/dist/trace";

type TPetForm = {
  name: string;
  ownerName: string;
  imageUrl: string;
  age: string;
  notes: string;
};

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};
export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  // const { handleAddPet, handleEditPet, selectedPet } = usePetContext();
  const { selectedPet } = usePetContext();

  /*  
    // previous version before video 305, where we use onSubmit attribute with the form
 
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const pet = {
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      imageUrl:
        (formData.get("imageUrl") as string) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      age: +(formData.get("age") as string),
      notes: formData.get("notes") as string,
    };

    if (actionType === "add") {
      handleAddPet(pet as Omit<Pet, "id">);
    } else {
      handleEditPet(selectedPet!.id, pet);
    }
    onFormSubmission();
  }; */

  // adding react-hook-form from video 321
  const {
    register,
    trigger,
    formState: { isSubmitting, errors },
  } = useForm<TPetForm>();

  return (
    <form
      action={async (FormData) => {
        const result = await trigger();
        if (!result) {
          return;
        }

        if (actionType === "add") {
          const error = await addPet(FormData);
          if (error) {
            toast.warning(error.message);
            return;
          }
        } else if (actionType === "edit") {
          const error = await editPet(selectedPet?.id, FormData);
          if (error) {
            toast.warning(error.message);
            return;
          }
        }
        onFormSubmission();
      }}
      className="flex flex-col"
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Name is too short" },
            })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="ownerName">Owner name</Label>
          <Input
            id="ownerName"
            {...register("ownerName", {
              required: "Owner name is required",
              maxLength: { value: 5, message: "Owner name is too long" },
            })}
          />
          {errors.ownerName && (
            <p className="text-red-500">{errors.ownerName.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input id="imageUrl" {...register("imageUrl")} />
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" {...register("age")} />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" {...register("notes")} />
          {errors.notes && (
            <p className="text-red-500">{errors.notes.message}</p>
          )}
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
}
