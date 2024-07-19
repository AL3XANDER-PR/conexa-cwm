// ImageUpload.tsx
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone, Accept } from "react-dropzone";
import { useField, useFormikContext } from "formik";
import UploadFileSvg from "../../assets/uploadFiles.svg";
import jsPDF from "jspdf";

interface ImageUploadProps {
  name: string;
}

const FileUpload: React.FC<ImageUploadProps> = ({ name }) => {
  const { setFieldValue, setFieldTouched, values } = useFormikContext<any>();
  const [field, meta] = useField(name);
  console.log("💻 - file: FileUpload.tsx:15 - field, meta:", field, meta);
  const [url, setUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const currentFiles = field.value || [];
      const filesToAdd = acceptedFiles.slice(0, 2 - currentFiles.length);

      const filesWithPreview = filesToAdd.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFieldValue(name, [...currentFiles, ...filesWithPreview]);
      setFieldTouched(name, true);
    },
    [field.value, name, setFieldTouched, setFieldValue]
  );

  useEffect(() => {
    if (field.value.length === 2) {
      if (Object.keys(values.pdf).length === 0) {
        generarPDF(field.value);
      }
    }
  }, [field.value]);

  const handleRemoveFile = (file: File) => {
    const newFiles = field.value.filter((f: File) => f !== file);
    setFieldValue(name, newFiles);
    setUrl("");
  };

  const accept: Accept = {
    "image/*": [],
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    multiple: true,
    maxFiles: 2,
  });

  const generarPDF = async (files: File[]) => {
    const pdf = new jsPDF();

    for (let i = 0; i < files.length; i++) {
      const imgData = await getBase64(files[i]);
      pdf.addImage(imgData, "JPEG", 65, 30 + i * 130, 80, 50);
      // if (files.length == -1) {
      //   pdf.save("document");
      // } else {
      //   pdf.addPage();
      // }
    }

    const pdfBlob = pdf.output("blob");
    const pdfFile = new File([pdfBlob], "uploadpdf.pdf", {
      type: "application/pdf",
    });

    const url = URL.createObjectURL(pdfBlob);
    setUrl(url);

    setFieldValue("pdf", pdfFile);
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <>
      <div className="mb-4 col-span-12 grid gap-3 grid-cols-12">
        <div className="col-span-12 md:col-span-5">
          <div
            {...getRootProps()}
            className="flex items-center justify-center "
          >
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-blue-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <img src={UploadFileSvg} alt="" width={100} className="mb-2" />

                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Seleccione</span> o arrastre
                  sus archivos aqui.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Solo se permite subir dos archivos.
                </p>
              </div>
              <input {...getInputProps()} />
            </label>
          </div>
          <ul className="">
            {field.value &&
              field.value.map((file: File, index: number) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-2 border p-2 rounded"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                  </span>
                  <span>{file.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(file)}
                    className="ml-4 p-2 hover:bg-red-100 text-red-500 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </li>
              ))}
          </ul>
        </div>
        {url && (
          <iframe
            src={url}
            className="w-full col-span-12 md:col-span-7 "
            height={500}
          ></iframe>
        )}
      </div>
      {meta.touched && meta.error ? (
        <p className="text-red-500 col-span-12">{meta.error}</p>
      ) : null}
    </>
  );
};

export default FileUpload;
