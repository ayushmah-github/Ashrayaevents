import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ResourceManager from "@/components/admin/ResourceManager";
import { RESOURCES, isValidTable } from "@/lib/admin/resources";

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ table: string }>;
}) {
  const { table } = await params;
  if (!isValidTable(table)) notFound();
  return (
    <AdminShell active={table}>
      <ResourceManager resource={RESOURCES[table]} />
    </AdminShell>
  );
}
