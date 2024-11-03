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
import Attaches from "@editorjs/attaches";
import Personality from "@editorjs/personality";
import SimpleImage from "@editorjs/simple-image";
import React, { useEffect } from "react";

export default function TextEditor({ title }) {
  useEffect(() => {
    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: Header,
        list: List,
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        image: {
          class: Image,
          config: {
            endpoints: {
              byFile: "http://localhost:8008/uploadFile", // Replace with your file upload endpoint
              byUrl: "http://localhost:8008/fetchUrl", // Replace with your URL-fetch endpoint
            },
          },
        },
        table: Table,
        quote: Quote,
        warning: Warning,
        marker: Marker,
        code: Code,
        delimiter: Delimiter,
        embed: Embed,
        linkTool: LinkTool,
        checklist: Checklist,
        underline: Underline,
        inlineCode: InlineCode,
        raw: Raw,
        attaches: {
          class: Attaches,
          config: {
            endpoint: "http://localhost:8008/uploadFile", // Replace with your file upload endpoint
          },
        },
        simpleImage: SimpleImage,
      },
    });

    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
        })
        .catch((e) => console.error("Error while destroying editor", e));
    };
  }, []);

  return (
    <div className="p-4 border border-gray-300 rounded-lg" id="editorjs"></div>
  );
}
