import { getOrdersAction } from "@/actions/userItems-action";
import OrdersTable from "@/components/viewOrdersTable";

export default async function ViewOrdersPage(){
    const orders = await getOrdersAction();
    return <div>
         <h1 className="text-3xl font-bold w-full bg-slate-300 p-4 rounded-sm">
          View Clients Orders
        </h1>
        <OrdersTable data={orders.data}/>
    </div>
}