"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogFooter,
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { format, subMonths } from "date-fns";

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [uploadedMonth, setUploadedMonth] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get last month dynamically
  const lastMonth = subMonths(new Date(), 1);
  const formattedMonth = format(lastMonth, "MMMM");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setUploadedMonth(`${formattedMonth}`);

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      // Extract top 2, placeholder rows, and last 2
      const top2 = jsonData.slice(0, 2);
      const last2 = jsonData.slice(-2);
      setData([...top2, "placeholder", "placeholder", "placeholder", ...last2]);
    };
    reader.readAsBinaryString(uploadedFile);
  };

  const handleUploadConfirmation = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Fixed endpoint URL - adjust this to your actual endpoint
      const response = await fetch("https://ats-datapipeline.onrender.com/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert(`Upload failed. Status: ${response.status}. Please try again.`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading.");
    }

    setIsDialogOpen(false);
  };

  return (
    <div className="h-screen flex justify-center items-center relative bg-green-50">
      {/* Excel-style background with closer grid lines */}
      <div className="absolute inset-0 grid grid-cols-24 grid-rows-24 gap-0 opacity-40">
        {Array.from({ length: 576 }).map((_, index) => (
          <div key={index} className="border border-gray-300"></div>
        ))}
      </div>

      <Card className="z-10 bg-white p-6 rounded-lg shadow-lg w-2/3 text-center">
        <h2 className="text-2xl font-bold mb-4">Upload {formattedMonth} month&apos;s Attendance File</h2>

        <label className="inline-block px-4 py-2 bg-green-600 text-white font-semibold rounded cursor-pointer hover:bg-green-700 transition duration-200">
          Choose File
          <Input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} className="hidden" />
        </label>

        {uploadedMonth && <p className="text-lg text-gray-600 mt-3">Showing attendance for: <b>{uploadedMonth}</b></p>}

        {data.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Attendance Preview</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    {Object.keys(data[0] !== "placeholder" ? data[0] : {}).map((key) => (
                      <th key={key} className="border border-gray-400 px-2 py-1">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    row === "placeholder" ? (
                      <tr key={index} className="bg-gray-50">
                        {Object.keys(data[0]).map((_, i) => (
                          <td key={i} className="border border-gray-400 px-2 py-1 text-center">.. ... ..</td>
                        ))}
                      </tr>
                    ) : (
                      <tr key={index} className="even:bg-gray-100">
                        {Object.values(row).map((value, i) => (
                          <td key={i} className="border border-gray-400 px-2 py-1">
                            {value as string}
                          </td>
                        ))}
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>

            {/* Upload Button */}
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="mt-4 bg-green-600 text-white hover:bg-green-700 transition duration-200"
            >
              Upload File
            </Button>
          </div>
        )}
      </Card>

      {/* Fixed Confirmation Dialog with proper accessibility */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Upload</DialogTitle>
            <DialogDescription>
              Please confirm that you want to upload the attendance file for {uploadedMonth}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex justify-end">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUploadConfirmation} className="bg-green-600 text-white hover:bg-green-700 ml-2">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
