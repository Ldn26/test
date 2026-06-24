import { useGetAllContacts, useUpdateContactStatus, useDeleteContact } from "@/api/contact";
import { Mail, MailOpen, Trash2, Phone, Calendar } from "lucide-react";

export default function Notifications() {
  const { data, isLoading, isSuccess } = useGetAllContacts();
  const { mutateAsync: markAsRead } = useUpdateContactStatus();
  const { mutateAsync: deleteContact } = useDeleteContact();

  const contacts = data?.contacts ?? [];
  const unread = contacts.filter((c) => !c.isRead).length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Notifications</h1>
        {unread > 0 && (
          <span className="bg-orange-400 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
            {unread}
          </span>
        )}
      </div>

      {!isLoading && contacts.length === 0 && (
        <div className="text-center py-20">
          <Mail className="w-20 h-20 mx-auto mb-6 text-orange-200" />
          <p className="text-xl text-gray-400">Aucune notification pour le moment</p>
        </div>
      )}

      <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
              contact.isRead
                ? "bg-white border-gray-200"
                : "bg-orange-50 border-orange-200"
            }`}
          >
            <div
              className={`mt-0.5 p-2 rounded-xl flex-shrink-0 ${
                contact.isRead ? "bg-gray-100" : "bg-orange-100"
              }`}
            >
              {contact.isRead ? (
                <MailOpen className="w-5 h-5 text-gray-400" />
              ) : (
                <Mail className="w-5 h-5 text-orange-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-gray-800">
                  {contact.civilite} {contact.prenom} {contact.nom}
                </span>
                <span className="text-sm text-gray-400">{contact.email}</span>
                {!contact.isRead && (
                  <span className="text-[10px] font-bold bg-orange-400 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">
                    Nouveau
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 mt-1.5 text-sm text-gray-500 flex-wrap">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {contact.telephone}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(contact.createdAt).toLocaleDateString("fr-FR")}
                </span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full font-medium">
                  {contact.motif}
                </span>
              </div>

              {contact.message && (
                <p className="mt-2 text-sm text-gray-600 truncate">{contact.message}</p>
              )}

              {contact.disponibilites && contact.disponibilites.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {contact.disponibilites.map((d, i) => (
                    <span
                      key={i}
                      className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2.5 py-0.5 rounded-full"
                    >
                      {d.jour} à {d.heure}h{d.minute === "0" ? "" : d.minute}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {!contact.isRead && (
                <button
                  onClick={() => markAsRead({ id: contact.id, isRead: true })}
                  className="text-xs px-3 py-1.5 rounded-xl bg-orange-400 text-white hover:bg-orange-500 transition-all font-medium"
                >
                  Marquer lu
                </button>
              )}
              <button
                onClick={() => deleteContact(contact.id)}
                className="p-1.5 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}