"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PetForm from "./pet-form";
import { useState } from "react";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
};

export default function PetButton({
  actionType,
  children,
  onClick,
  disabled,
}: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (actionType === "checkout") {
    return (
      <Button variant="secondary" disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    );
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button size="icon">
            <PlusIcon className="h-6 w-6" />
          </Button>
        ) : (
          <Button variant="secondary">{children}</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{actionType === "add" ? "Add a new pet" : "Edit a pet"}</DialogTitle>
        </DialogHeader>
        <PetForm actionType={actionType} onFormSubmission={() => setIsFormOpen(false)}/>
      </DialogContent>
    </Dialog>
  );
}
