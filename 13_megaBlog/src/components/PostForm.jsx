import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "./Button";
import Input from "./Input";
import RTE from "./RTE";
import { createPost, updatePost, uploadFile, deleteFile, getFilePreview } from "../appwrite/config.js";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      isdraft: post ? post.isdraft : true,   // 👈 naya post = default Draft (true)
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      // EDIT MODE
      const file = data.image[0] ? await uploadFile(data.image[0]) : null;

      if (file) {
        deleteFile(post.featureImage);
      }

      const dbPost = await updatePost(post.$id, {
        title: data.title,
        content: data.content,
        isdraft: data.isdraft,
        featureImage: file ? file.$id : post.featureImage,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // CREATE MODE
      const file = await uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        const dbPost = await createPost({
          title: data.title,
          content: data.content,
          isdraft: data.isdraft,
          featureImage: fileId,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full mb-4">
            <img
              src={getFilePreview(post.featureImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="isdraft"
            {...register("isdraft")}
          />
          <label htmlFor="isdraft">Save as Draft (uncheck to publish)</label>
        </div>

        <Button
          type="submit"
          bgColor={post ? "bg-green-600" : "bg-blue-600"}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}