"use server";

import { db } from "@/db";
import { postToImg, posts } from "@/drizzle/schema";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const formSchema = z.object({
  message: z.string().min(1, {
    message: "Message is required.",
  }),
});
export default async function createPost(formData: FormData) {
  const user = await currentUser();
  if (!user) {
    redirect("/auth/login");
  }

  // const message = formData.get('message') as string;
  const data = formSchema.parse({
    message: formData.get("message"),
  });
  
  let formDataa, urls, url;
  let hasImage = false;
  formData.forEach((value, key) => {
    if (key === "imageUrl") {
      hasImage = true;
      formDataa = new FormData();
      formDataa.append("file", value);

      formDataa.append("timestamp", Math.floor(Date.now() / 1000).toString());
      formDataa.append("upload_preset", "yycy7yc2");
    }
  });

  if (hasImage) {
    try {
      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dlndipher/image/upload",
        {
          method: "POST",
          body: formDataa,
        }
      );
      const cloudinaryData = await cloudinaryResponse.json();
      // console.log("Cloudinary data:", cloudinaryData);
      url = cloudinaryData.secure_url;
      urls = { secure_url: cloudinaryData.secure_url };
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return { error: "Error uploading to Cloudinary" };
    }
  }

  // Perform database insertion
  const postData = {
    authorId: user.id,
    content: data.message,
    imageUrls: JSON.stringify(urls),
    imgUrl: url,
    img: url,
  };
  // id: serial("id").primaryKey(),
  // authorId: text("author_id"),
  // content: text("content"),
  // createdAt: timestamp("createdAt", { mode: "date" }),
  try {
    const post = await db.insert(posts).values({
      authorId: user.id,
      content: data.message,
    }).returning();
    
    await db.insert(postToImg).values({
      imgUrl: url,
      postId: post[0].id
    });
    
    console.log("Database insertion successfully");
  } catch (error) {
    console.error("Error inserting into the database:", error);
    return { error: "Error inserting into the database!" };
  }
  console.log("done");
  revalidatePath("/");
}
