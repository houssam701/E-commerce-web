import { getSectionsAction } from "@/actions/admin-Items";
import { getItemsAction } from "@/actions/admin-items-cloud";
import ItemsTable from "@/components/viewItemsTable";

export default async function ViewItemsPage() {
  const items = await getItemsAction();
  const sections = await getSectionsAction();
  return (
    <div>
      <h1 className="text-3xl font-bold w-full bg-slate-300 p-4 rounded-sm">
        View Items
      </h1>
      {/* Apply horizontal scrolling to the table wrapper */}
      <div className="overflow-x-auto">
        <ItemsTable items={items} sections={sections}/>
      </div>
    </div>
  );
}
