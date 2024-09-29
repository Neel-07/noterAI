"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { fetchDocument } from "@/utils/editor_api";
import Editor from "@/components/editor/editor";
import { Document } from "@/types/editor";

export default function Home() {
  const [document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    const loadDocument = async () => {
      try {
        const doc: Document = await fetchDocument("example-document-id");
        setDocument(doc);
      } catch (error) {
        console.error("Error loading document:", error);
      }
    };

    loadDocument();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Demo</title>
        <meta
          name="description"
          content="An open-source NotionAI alternative"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-8">
        <h1 className="text-4xl font-bold mb-8">Demo</h1>
        {document ? (
          <Editor initialDocument={document} />
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </main>
    </div>
  );
}
