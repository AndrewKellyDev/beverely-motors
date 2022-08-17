import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
export const Dropzone = ({selectedFileLength, onFileUploaded }) => {

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles;
      onFileUploaded(file);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="bg-gray-200 p-4 cursor-pointer rounded-xl"
    >
      <input {...getInputProps()} />
        <div className="border border-black flex flex-col items-center justify-center rounded-xl border-dashed  w-80 h-80">
          <FaCloudUploadAlt size="60" color="#3F51B5" />
          <div className="mb-6 text-primary text-center px-2 mt-1">
            File types supported: JPG, JPEG, GIF, PNG.<br />
            You can upload multiple images.<br />
            {selectedFileLength !==0 && `You selected ${selectedFileLength} images`}
          </div>
        </div>
      
    </div>
  );
};