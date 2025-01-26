import { getMessageAction } from "@/actions/messages-actions"
import MessagesTable from "@/components/MessagesTable";

export default async function MessagePage(){
    const messages = await getMessageAction();
    return <div>
        <h1 className="text-3xl font-bold w-full bg-slate-300 p-4 rounded-sm">
        View Messages
        </h1>
         <div className="overflow-x-auto">
            <MessagesTable messages={messages.data}/>
        </div>
    </div>
}