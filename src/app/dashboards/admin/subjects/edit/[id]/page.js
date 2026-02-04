"use client";
import SubjectForm from "@/components/dashboard/Subjects/SubjectForm";

export default function EditSubjectPage({ params }) {
  return <SubjectForm mode="edit" subjectId={params.id} />;
}
