import DeleteItemModal from "./deleteItemModal";
import DeleteMessageModal from "./deleteMessageModal";
import EditItemsModal from "./editItemModal";

export default function MessagesTable({ messages }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Items Table</h1>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full border-collapse border border-gray-300">
          <thead className="bg-pink-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Phone
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Message
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <tr
                  key={message.id}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}
                >
                  <td className="px-4 py-2 text-sm border border-gray-300">
                    {message.name}
                  </td>
                  <td className="px-4 py-2 text-sm border border-gray-300">
                    {message.email}
                  </td>
                  <td className="px-4 py-2 text-sm border border-gray-300">
                    {message.phone}
                  </td>
                  <td className="px-4 py-2 text-sm border border-gray-300">
                    {message.message}
                  </td>
                  <td className="px-4 py-2 text-sm border border-gray-300">
                    <div className="flex space-x-2">
                      <DeleteMessageModal message={message} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" button="Delete" />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-2 text-sm text-center border border-gray-300">
                  No Messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
