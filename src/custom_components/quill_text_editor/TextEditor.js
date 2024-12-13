import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Image from "@editorjs/image";
import Table from "@editorjs/table";
import Quote from "@editorjs/quote";
import Warning from "@editorjs/warning";
import Marker from "@editorjs/marker";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import LinkTool from "@editorjs/link";
import Checklist from "@editorjs/checklist";
import Underline from "@editorjs/underline";
import InlineCode from "@editorjs/inline-code";
import Raw from "@editorjs/raw";
import SimpleImage from "@editorjs/simple-image";
import React, { useEffect, useRef } from "react";
import "./editor.css";

export default function TextEditor({ title }) {
  const editorRef = useRef(null); // Ref for the Editor.js container
  const editorInstance = useRef(null); // Ref for storing the Editor.js instance

  useEffect(() => {
    if (!editorRef.current) return;

    // Initialize Editor.js
    editorInstance.current = new EditorJS({
      holder: editorRef.current, // Use the ref as the holder
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: "Enter a heading",
            levels: [1, 2, 3, 4], // Allow multiple heading levels
            defaultLevel: 2,
          },
        },
        list: List,
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          config: {
            placeholder: "Start writing your content...",
          },
        },
        table: Table,
        quote: {
          class: Quote,
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote author",
          },
        },
        warning: Warning,
        marker: Marker,
        code: Code,
        delimiter: Delimiter,
        embed: Embed,
        linkTool: LinkTool,
        checklist: Checklist,
        underline: Underline,
        inlineCode: InlineCode,
        simpleImage: SimpleImage,
      },
      placeholder: "Compose your story...",
    });

    return () => {
      // Cleanup the Editor.js instance
      if (editorInstance.current) {
        editorInstance.current.isReady
          .then(() => {
            editorInstance.current.destroy();
            editorInstance.current = null;
          })
          .catch((e) => console.error("Error while destroying editor", e));
      }
    };
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">{title}</h1>
      <div
        ref={editorRef} // Assign the ref to the container div
        className="editor-container"
      ></div>
    </div>
  );
}
