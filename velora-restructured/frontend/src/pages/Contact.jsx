import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Send, Trash2, User, MessageSquare, Clock, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ConfirmDeleteModal from '../components/ui/ConfirmDeleteModal';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import contactService from '../services/contactService';
import { useToast } from '../context/ToastContext';

export function Contact() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingMsg, setDeletingMsg] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const { showSuccess, showError } = useToast();

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await contactService.getMessages();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load support messages.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const validateEmail = (str) => {
    return /\S+@\S+\.\S+/.test(str);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      showError('Please enter your full name.');
      return;
    }

    if (!email.trim() || !validateEmail(email)) {
      showError('Please enter a valid email address.');
      return;
    }

    if (!message.trim()) {
      showError('Please enter your message.');
      return;
    }

    setSubmitting(true);
    try {
      await contactService.sendMessage({
        full_name: fullName.trim(),
        email: email.trim(),
        subject: subject.trim() || 'General Inquiry',
        message: message.trim()
      });

      showSuccess('Your message has been received! Our support team will get back to you.');
      setFullName('');
      setEmail('');
      setSubject('');
      setMessage('');
      await fetchMessages();
    } catch (err) {
      showError(err.message || 'Failed to send message.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenDelete = (msg) => {
    setDeletingMsg(msg);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingMsg) return;
    setDeleting(true);
    try {
      await contactService.deleteMessage(deletingMsg.id);
      showSuccess('Message deleted successfully!');
      await fetchMessages();
    } catch (err) {
      showError(err.message || 'Failed to delete message.');
    } finally {
      setDeleting(false);
      setDeleteModalOpen(false);
      setDeletingMsg(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Contact Velora Support"
        subtitle="Submit inquiry tickets or manage system messages from warehouse directors and logistics managers."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-6">
          <Card padding="p-6 sm:p-8" className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="p-3 rounded-2xl bg-[#238cff]/15 text-[#46d5ff] border border-[#238cff]/30">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Contact Velora</h3>
                <p className="text-xs text-[#b9c7dd]">Direct messaging gateway to system admins</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#b9c7dd] mb-1.5 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input-velora"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#b9c7dd] mb-1.5 uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. marcus.vance@logistics-plus.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-velora"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#b9c7dd] mb-1.5 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Automated AGV Fleet Integration"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="input-velora"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#b9c7dd] mb-1.5 uppercase tracking-wider">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type your inquiry or message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input-velora resize-none"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center"
                  icon={Send}
                  disabled={submitting}
                >
                  {submitting ? 'Sending Message...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Right Column: Received Messages List */}
        <div className="lg:col-span-6 space-y-6">
          <Card padding="p-6 sm:p-8" className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Received Messages</h3>
                  <p className="text-xs text-[#b9c7dd]">Inbound messages stored in MySQL contact table</p>
                </div>
              </div>
              <Button onClick={fetchMessages} variant="ghost" size="sm" icon={RefreshCw} title="Refresh Messages">
                Refresh
              </Button>
            </div>

            {loading ? (
              <LoadingState message="Fetching support messages from backend database..." />
            ) : error ? (
              <ErrorState message={error} onRetry={fetchMessages} />
            ) : messages.length === 0 ? (
              <EmptyState
                title="No Messages"
                description="There are currently no support messages in the queue."
              />
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-5 rounded-2xl bg-[#0b1525] border border-white/10 hover:border-[#238cff]/30 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-[#46d5ff]" />
                          {msg.full_name}
                        </h4>
                        <p className="text-xs text-[#b9c7dd] font-mono mt-0.5">{msg.email}</p>
                      </div>

                      <button
                        onClick={() => handleOpenDelete(msg)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-white/10 transition-colors"
                        title="Delete Message"
                        aria-label={`Delete message from ${msg.full_name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="pt-2 border-t border-white/5 space-y-1">
                      <p className="text-xs font-semibold text-[#46d5ff] uppercase tracking-wider">
                        {msg.subject || 'General Inquiry'}
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed bg-[#07111f] p-3 rounded-xl border border-white/5">
                        {msg.message}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {msg.created_at || 'Just now'}
                      </span>
                      <span>Ticket #{msg.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Support Message"
        itemName={deletingMsg ? `Message from ${deletingMsg.full_name}` : ''}
        loading={deleting}
      />
    </div>
  );
}

export default Contact;
