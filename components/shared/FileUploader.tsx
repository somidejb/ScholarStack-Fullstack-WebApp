import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from '../ui/button';
import { convertFileToUrl } from '@/lib/utils';

type FileUploadProps = {
    imageURLs: string[],
    onFieldChange: (values: string[]) => void,
    setFiles: Dispatch<SetStateAction<File[]>>
}

const FileUploader = ({ imageURLs, onFieldChange, setFiles }: FileUploadProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
        const urls = acceptedFiles.map(file => convertFileToUrl(file));
        onFieldChange(urls);
    }, [setFiles, onFieldChange]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: generateClientDropzoneAccept(['image/*']),
        multiple: true,
    });

    return (
        <div {...getRootProps()}
            className="flex h-[250px] justify-center items-center cursor-pointer overflow-hidden bg-[#DEDCFF] rounded-[10px]"
            aria-label="File uploader"
        >
            <input {...getInputProps()} className="cursor-pointer" />

            {imageURLs.length > 0 ? (
                <div className="flex h-full w-full flex-wrap gap-2">
                    {imageURLs.map((url, index) => (
                        <div key={index} className="flex-1 h-full max-w-full">
                            <img
                                src={url}
                                alt={`Uploaded content ${index + 1}`}
                                className="w-full h-full object-contain object-center"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex-center flex-col py-5">
                    <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" />
                    <h3 className="mb-2 mt-2">Drag photo here</h3>
                    <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
                    <Button type="button" className="rounded-full bg-[#31457B] text-white">
                        Select from computer
                    </Button>
                </div>
            )}
        </div>
    );
}

export default FileUploader;
