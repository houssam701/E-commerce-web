import { getSectionsAction } from "@/actions/admin-Items";
import AddItemComponent from "@/components/addItem";

export default async function AddItemPage() {
  const sections = await getSectionsAction();
  return <AddItemComponent sections={sections}/>;
}