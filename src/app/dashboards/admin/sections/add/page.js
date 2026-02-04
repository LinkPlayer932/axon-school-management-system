"use client";
import { useRouter } from "next/navigation";
import SectionsForm from "@/components/dashboard/Sections/SectionForm";

export default function AddSectionPage() {
  const router = useRouter();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-semibold mb-4">Add Section</h1>

      <SectionsForm
        onSuccess={() =>
          router.push("/dashboards/admin/sections")
        }
      />
    </div>
  );
}
