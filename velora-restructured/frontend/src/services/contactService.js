import { api } from './api';

const INITIAL_MESSAGES = [
  {
    id: 1,
    full_name: 'Marcus Vance',
    email: 'marcus.vance@logistics-plus.com',
    subject: 'Inquiry regarding Automated AGV Integration',
    message: 'Hello Velora team, we are expanding our Midwest fulfillment center and would like to integrate AGV fleet monitoring with your WMS REST API.',
    created_at: '2026-08-08 14:30:00'
  },
  {
    id: 2,
    full_name: 'Sarah Chen',
    email: 'schen@supplychain.org',
    subject: 'Bulk Inventory Import Specification',
    message: 'Does Velora WMS support custom CSV batch imports for high-density pallet racking systems? Looking forward to your reply.',
    created_at: '2026-08-07 09:15:00'
  }
];

function getLocalMessages() {
  const stored = localStorage.getItem('velora_contact_messages');
  if (!stored) {
    localStorage.setItem('velora_contact_messages', JSON.stringify(INITIAL_MESSAGES));
    return INITIAL_MESSAGES;
  }
  return JSON.parse(stored);
}

function saveLocalMessages(data) {
  localStorage.setItem('velora_contact_messages', JSON.stringify(data));
}

export const contactService = {
  async getMessages() {
    try {
      const data = await api.get('/contact.php');
      return data;
    } catch (error) {
      console.warn('[ContactService] API unavailable, using local storage state');
      return getLocalMessages();
    }
  },

  async sendMessage(contactData) {
    try {
      return await api.post('/contact.php', contactData);
    } catch (error) {
      console.warn('[ContactService] API unavailable, saving message to local storage');
      const current = getLocalMessages();
      const newMessage = {
        id: Date.now(),
        full_name: contactData.full_name,
        email: contactData.email,
        subject: contactData.subject || 'General Inquiry',
        message: contactData.message,
        created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      const updated = [newMessage, ...current];
      saveLocalMessages(updated);
      return newMessage;
    }
  },

  async deleteMessage(id) {
    try {
      return await api.delete(`/contact.php?id=${id}`);
    } catch (error) {
      console.warn('[ContactService] API unavailable, deleting from local storage');
      const current = getLocalMessages();
      const updated = current.filter(m => m.id !== id && String(m.id) !== String(id));
      saveLocalMessages(updated);
      return { success: true, id };
    }
  }
};

export default contactService;
