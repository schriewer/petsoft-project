"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addPet(formData: FormData) {
    await sleep(2000);
    try {

        await prisma.pet.create({
            data: {
                name: formData.get("name") as string,
                ownerName: formData.get("ownerName") as string,
                imageUrl:
                    (formData.get("imageUrl") as string) ||
                    "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
                age: parseInt(formData.get("age") as string),
                notes: formData.get("notes") as string,
            }
        })
    } catch (error) {
        return {message: "Could not add a pet."}
    }

    revalidatePath("/app", "layout");
  };

  export async function editPet(petId: string, formData: FormData) {
     await sleep(2000);
    try {
        await prisma.pet.update({
            where: {
                id: petId,
            },
            data: {
                name: formData.get("name") as string,
                ownerName: formData.get("ownerName") as string,
                imageUrl:
                    (formData.get("imageUrl") as string) ||
                    "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
                age: parseInt(formData.get("age") as string),
                notes: formData.get("notes") as string,
            }
        })
    } catch (error) {
        return {message: "Could not edit the pet."}
    }

    revalidatePath("/app", "layout");
  }

  export async function deletePet(petId: string) {
     await sleep(2000);
    try {
        await prisma.pet.delete({
            where: {
                id: petId,
            }
        })
    } catch (error) {
        return {message: "Could not delete the pet."}
    }

    revalidatePath("/app", "layout");
  }