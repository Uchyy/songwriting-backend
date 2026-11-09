
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { storage } from "../firebase";

export type UploadProgress = { progress: number; downloadURL?: string; };

export function uploadFile( file: File, path: string, onProgress?: (progress: number) => void ): Promise<string> {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);

    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
    });

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        onProgress?.(Math.round(progress));
      },
      error => reject(error),
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
}

export async function deleteUploadedFile(path: string): Promise<void> {
  await deleteObject(ref(storage, path));
}
