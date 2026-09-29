import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Trash2, RefreshCw, MessageSquare, CheckCircle } from 'lucide-react';
import { getContactMessages, deleteContactMessage } from '../../../services/dataService';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    setLoading(true);
    try {
      const data = await getContactMessages();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this client enquiry?")) return;
    try {
      await deleteContactMessage(id);
      setMessages(prev => prev.filter(msg => msg.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting message.");
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-3 border-[#8D9B7A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-[#241C18]/60 font-medium">Loading Client Enquiries...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-[#241C18]/10 shadow-sm">
        <div>
          <h2 className="text-xl font-serif text-[#241C18]">Client Enquiries & Messages Inbox</h2>
          <p className="text-xs text-[#241C18]/60">View and respond to shoot booking requests received through the website contact form</p>
        </div>
        <button
          onClick={loadMessages}
          className="p-2.5 rounded-xl border border-[#241C18]/15 hover:bg-[#F8F5EF] text-[#241C18] transition-colors cursor-pointer self-start sm:self-auto"
          title="Refresh Inbox"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages List */}
      {messages.length === 0 ? (
        <div className="py-16 text-center bg-white/50 rounded-2xl border border-dashed border-[#241C18]/20">
          <MessageSquare className="w-12 h-12 text-[#241C18]/20 mx-auto mb-3" />
          <h3 className="text-base font-serif text-[#241C18]">No Client Messages Yet</h3>
          <p className="text-xs text-[#241C18]/60 mt-1">When clients fill out the contact form on your website, their enquiries will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map(msg => (
            <div 
              key={msg.id}
              className="bg-white p-5 rounded-2xl border border-[#241C18]/10 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h4 className="font-serif text-base text-[#241C18]">{msg.name || 'Anonymous Client'}</h4>
                  {msg.eventCategory && (
                    <span className="px-2.5 py-0.5 bg-[#8D9B7A]/15 text-[#8D9B7A] text-[11px] font-semibold uppercase tracking-wider rounded-md">
                      {msg.eventCategory}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#241C18]/70">
                  {msg.email && (
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#8D9B7A]" />
                      <a href={`mailto:${msg.email}`} className="hover:underline">{msg.email}</a>
                    </span>
                  )}
                  {msg.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#8D9B7A]" />
                      <a href={`tel:${msg.phone}`} className="hover:underline font-mono">{msg.phone}</a>
                    </span>
                  )}
                  {msg.date && (
                    <span className="flex items-center gap-1.5 text-[#241C18]/50">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{msg.date}</span>
                    </span>
                  )}
                </div>

                {msg.message && (
                  <p className="text-xs text-[#241C18]/80 bg-[#F8F5EF] p-3 rounded-xl border border-[#241C18]/5 mt-2 italic">
                    "{msg.message}"
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                {msg.phone && (
                  <a
                    href={`https://wa.me/91${msg.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(msg.name || '')}%2C%20thank%20you%20for%20contacting%20Sachin%20Ghongade%20Photo%20Studio!`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <span>Reply via WhatsApp</span>
                  </a>
                )}
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
