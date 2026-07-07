import { AdminPanel } from "@/components/admin/AdminPanel";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const content = await getContent();

  return <AdminPanel initialContent={content} />;
}
