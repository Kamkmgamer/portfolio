import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    // Define an image and video uploader
    imageUploader: f({
        image: { maxFileSize: "16MB", maxFileCount: 1 },
        video: { maxFileSize: "256MB", maxFileCount: 1 },
    })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("file url", file.ufsUrl);
            return { url: file.ufsUrl };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
