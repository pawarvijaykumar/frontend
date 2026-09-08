/*
Kyun Controller use hua, register nahi?

Yaad hai Input.jsx mein register("email") seedha use ho gaya tha? TinyMCE jaisa third-party editor normal HTML <input> nahi hai — iska apna complex structure hai. Isliye register seedha kaam nahi karta.

Controller ek "bridge" hai — ye manually connect karta hai ki jab editor mein type ho, form ki value bhi update ho.*/


import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image", "advlist", "autolink", "lists", "link",
                "charmap", "preview", "anchor", "searchreplace",
                "visualblocks", "code", "fullscreen",
                "insertdatetime", "media", "table", "help", "wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}