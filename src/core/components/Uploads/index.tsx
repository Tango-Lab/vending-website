'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { uploadFiles } from '@/service/file';

export interface UploadTypesProps {
  name: string;
  label?: string;
  folderName?: string;
  accepts?: string[]; // Optional prop as an array of strings
  isMultiple?: boolean;
}

const UploadComponent = (props: UploadTypesProps) => {
  const { name, folderName, label, accepts = ['image/*'], isMultiple = false } = props;
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  register(name);
  const defaultValue = getValues(name);

  // Component State
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [files, setFile] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);

  const onDroppedFiled = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const isValidFileType = droppedFiles.map((file) => isFileTypeValid(file)).every(Boolean);

    if (isValidFileType) {
      const files = isMultiple ? droppedFiles : [droppedFiles[0]];
      setFile(files);
    }
  };

  const onSelectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files?.length) {
      setFile(files);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(false);
  };

  const isFileTypeValid = (file: File): Boolean => {
    return accepts.some((type) => {
      const mimeType = type.includes('/') ? type : `${type}/*`;
      return file.type === type || file.type.startsWith(mimeType.split('/')[0]);
    });
  };

  const error = name.split('.').reduce((acc, part) => (acc as any)?.[part], errors);

  useEffect(() => {
    if (files.length) {
      const file = files[0];

      const formData = new FormData();
      formData.append('file', file);

      if (folderName) {
        formData.append('folderName', folderName);
      }

      formData.append('name', file.name);
      uploadFiles(formData)
        .then(({ url }) => {
          if (!isMultiple) {
            setFileUrls((oldFiles) => [...oldFiles, url]);
            setValue(name, url);
          }
        })
        .catch((err) => {
          alert(err?.message);
        });
    }
  }, [files]);

  useEffect(() => {
    if (defaultValue) {
      setFileUrls([defaultValue]);
    }
  }, [defaultValue]);

  return (
    <div>
      {label && <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</div>}
      <div
        onDrop={onDroppedFiled}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className="flex items-center justify-center w-full"
      >
        <label
          htmlFor={name}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {fileUrls.length > 0 && (
            <div className="flex flex-col items-center justify-center w-full">
              {fileUrls.map((url, idx) => {
                return (
                  <div key={idx}>
                    <Image src={url} alt={url} width={176} height={176} />
                  </div>
                );
              })}
            </div>
          )}
          {fileUrls.length < 1 && (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Image
                src="/assets/icons/upload.svg"
                alt="/assets/icons/upload.svg"
                className="mb-3"
                width={24}
                height={24}
              />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
          )}
        </label>
      </div>
      {error && <p className="text-red-500 text-xs mt-2">{(error as any).message?.toString()}</p>}

      <input
        id={name}
        onChange={onSelectInput}
        type="file"
        multiple={isMultiple}
        accept={accepts.join(',')}
        className="hidden"
      />
    </div>
  );
};

export default UploadComponent;
