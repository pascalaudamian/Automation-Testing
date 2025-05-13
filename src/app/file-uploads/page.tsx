"use client";

import React, { useRef, useState } from "react";

const allowedTypes = [
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "audio/mpeg",
  "image/jpeg",
  "image/png",
  "application/pdf",
];

type UploadedFile = {
  file: File;
  valid: boolean;
  status: "pending" | "uploading" | "uploaded" | "error";
  progress: number;
  serverFileName?: string;
};

type ServerFile = string; // Assuming the API returns an array of strings (filenames)

const UploadPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [serverFiles, setServerFiles] = useState<ServerFile[]>([]);
  const [isLoadingServerFiles, setIsLoadingServerFiles] = useState(false);
  const [showServerFiles, setShowServerFiles] = useState(false);
  // State to track which server file is being deleted (optional, for UI feedback)
  const [deletingServerFileName, setDeletingServerFileName] = useState<string | null>(null);


  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const validated = Array.from(files).map((file) => ({
      file,
      valid: allowedTypes.includes(file.type),
      status: "pending" as const,
      progress: 0,
    }));
    setUploadedFiles((prev) => [...prev, ...validated]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const uploadFile = (fileEntry: UploadedFile, index: number) => {
    if (!fileEntry.valid) return;

    const formData = new FormData();
    formData.append("file", fileEntry.file);

    updateFile(index, { status: "uploading", progress: 0 });

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        updateFile(index, { progress: percent });
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (response && response.filename) {
            updateFile(index, {
              status: "uploaded",
              progress: 100,
              serverFileName: response.filename,
            });
            // Optionally, refetch the server file list after a successful upload
            // fetchServerFiles(); // Might be noisy if uploading many files
          } else {
             updateFile(index, { status: "error" });
             console.error("Upload successful but response missing filename:", response);
          }
        } catch (e) {
            updateFile(index, { status: "error" });
            console.error("Failed to parse upload response:", e);
        }
      } else {
        updateFile(index, { status: "error" });
        console.error("Upload failed with status:", xhr.status, xhr.statusText);
      }
    };

    xhr.onerror = () => {
      updateFile(index, { status: "error" });
      console.error("Upload failed due to network error.");
    };

    xhr.send(formData);
  };

  const deleteFile = async (fileEntry: UploadedFile, index: number) => {
    if (!fileEntry.serverFileName) return;

    try {
      const confirmed = confirm(`Are you sure you want to delete "${fileEntry.file.name}"?`);
      if (!confirmed) return;

      const res = await fetch(`/api/upload?filename=${encodeURIComponent(fileEntry.serverFileName)}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Delete failed: ${res.status} ${res.statusText} - ${errorText}`);
      }

      setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
      // Optionally, refetch the server file list if deleted from the current list
      // fetchServerFiles(); // Can be useful if displaying server files concurrently
    } catch (err) {
      console.error(err);
      alert("Failed to delete file.");
    }
  };

    // New function to delete a file listed in the "Already Uploaded" section
  const deleteServerFile = async (fileName: string) => {
      const confirmed = confirm(`Are you sure you want to delete "${fileName}" from the server?`);
      if (!confirmed) return;

      setDeletingServerFileName(fileName); // Set state to indicate deletion is in progress for this file

      try {
          const res = await fetch(`/api/upload?filename=${encodeURIComponent(fileName)}`, {
              method: "DELETE",
          });

          if (!res.ok) {
              const errorText = await res.text();
              throw new Error(`Delete failed: ${res.status} ${res.statusText} - ${errorText}`);
          }

          // Remove the file from the serverFiles state
          setServerFiles(prev => prev.filter(name => name !== fileName));
          alert(`"${fileName}" deleted successfully.`);

      } catch (err) {
          console.error("Error deleting server file:", err);
          alert(`Failed to delete "${fileName}".`);
      } finally {
          setDeletingServerFileName(null); // Reset deletion state
      }
  };


  const fetchServerFiles = async () => {
      if (isLoadingServerFiles || showServerFiles) {
         // If already loading or shown, toggle off
         if (showServerFiles) hideServerFiles();
         return;
      }

      setIsLoadingServerFiles(true);
      setShowServerFiles(true); // Show the list container while loading

      try {
          const res = await fetch("/api/files");

          if (!res.ok) {
              const errorText = await res.text();
              throw new Error(`Failed to fetch files: ${res.status} ${res.statusText} - ${errorText}`);
          }

          const files: ServerFile[] = await res.json();
          setServerFiles(files);

      } catch (err) {
          console.error("Error fetching server files:", err);
          alert("Failed to load already uploaded files.");
          setShowServerFiles(false); // Hide the list on error
      } finally {
          setIsLoadingServerFiles(false);
      }
  };

  const updateFile = (index: number, updates: Partial<UploadedFile>) => {
    setUploadedFiles((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...updates } : item))
    );
  };

  const hideServerFiles = () => {
      setServerFiles([]);
      setShowServerFiles(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Upload Files</h2>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-400 p-8 rounded-lg text-center text-gray-500 hover:bg-blue-50 transition"
        >
          Drag & Drop files here
        </div>

        <p className="text-center my-4">or</p>

        <div className="flex justify-center mb-4 gap-4">
          <input
            type="file"
            ref={fileInputRef}
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Select Files
          </button>

          {/* Button to show/hide already uploaded files */}
          <button
            onClick={fetchServerFiles} // Now only calls fetch, it handles toggling
            className={`px-4 py-2 rounded-lg ${showServerFiles ? 'bg-gray-500 hover:bg-gray-600' : 'bg-green-600 hover:bg-green-700'} text-white`}
            disabled={isLoadingServerFiles}
          >
            {isLoadingServerFiles ? 'Loading...' : showServerFiles ? 'Hide Uploaded Files' : 'Show Uploaded Files'}
          </button>

        </div>

        {/* Section to display already uploaded files */}
        {showServerFiles && (
            <div className="mt-6 border-t pt-4">
                <h3 className="text-xl font-semibold mb-3">Already Uploaded Files</h3>
                {isLoadingServerFiles && <p className="text-center text-gray-500">Loading files...</p>}
                {!isLoadingServerFiles && serverFiles.length === 0 && (
                    <p className="text-center text-gray-500">No files found on the server.</p>
                )}
                {!isLoadingServerFiles && serverFiles.length > 0 && (
                    <ul className="space-y-2">
                        {serverFiles.map((fileName, index) => (
                            <li key={index} className="bg-gray-50 p-2 rounded border border-gray-300 text-sm flex justify-between items-center">
                                <span className="truncate mr-4">{fileName}</span> {/* truncate long names */}
                                <div className="flex gap-2 flex-shrink-0">
                                    {/* Download Button/Link */}
                                    <a
                                        href={`/uploads/${encodeURIComponent(fileName)}`}
                                        download={fileName} // Suggests the original filename for download
                                        className="text-blue-600 hover:underline"
                                        title={`Download ${fileName}`}
                                    >
                                        Download
                                    </a>
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => deleteServerFile(fileName)}
                                        className="text-red-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={deletingServerFileName === fileName} // Disable if currently deleting this file
                                        title={`Delete ${fileName}`}
                                    >
                                        {deletingServerFileName === fileName ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        )}


        {/* Separator if there are files in the upload list and also showing server files */}
        {uploadedFiles.length > 0 && showServerFiles && <div className="mt-6 border-t pt-4"></div>}


        {/* List for files added in the current session */}
        <ul className="space-y-3 mt-4"> {/* Added mt-4 for spacing if no separator */}
          {uploadedFiles.map((entry, index) => (
            <li key={index} className="bg-gray-50 p-3 rounded border border-gray-300">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium truncate mr-4">{entry.file.name}</div> {/* truncate long names */}
                <div className="text-xs text-gray-600 flex-shrink-0">
                  {entry.valid ? entry.status : "Invalid type"}
                </div>
              </div>

              {entry.valid && (
                <div className="mt-2">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        entry.status === "error"
                          ? "bg-red-500"
                          : entry.status === "uploaded"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                      style={{ width: `${entry.progress}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-end gap-3 mt-2 text-sm">
                    {entry.status === "pending" && (
                      <button
                        onClick={() => uploadFile(entry, index)}
                        className="text-blue-600 hover:underline"
                      >
                        Upload
                      </button>
                    )}
                    {entry.status === "uploaded" && (
                      <button
                        onClick={() => deleteFile(entry, index)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                     {/* Optional: Add a cancel button during upload */}
                     {/* {entry.status === "uploading" && (
                        <button
                            // Add logic to cancel the XHR request
                            className="text-gray-600 hover:underline"
                        >
                            Cancel
                        </button>
                     )} */}
                     {entry.status === "error" && (
                         <span className="text-red-600 text-xs">Upload Failed</span>
                     )}
                  </div>
                </div>
              )}
              {!entry.valid && (
                  <div className="mt-2 text-red-600 text-sm">
                      Invalid file type. Allowed types: {allowedTypes.join(', ')}
                  </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UploadPage;