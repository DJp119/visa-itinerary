import { MessageSquare, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

interface ContactFormProps {
  className?: string;
  onSubmit: (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => void;
}

export default function ContactForm({
  className,
  onSubmit
}: ContactFormProps = {}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      alert('Please fill in all fields');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    onSubmit(formData);
    // Reset form after successful submission
    // In a real implementation, you'd wait for the submission to succeed
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full space-y-6 bg-background/50 rounded-lg p-6 border border-border/50 ${className}`}
    >
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <MessageSquare className="h-5 w-5 flex-shrink-0 text-primary-500 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Get In Touch
            </h3>
            <p className="text-sm text-foreground/50">
              Have questions? We're here to help. Fill out the form below and we'll get back to you shortly.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <label htmlPart="name" className="block text-sm font-medium text-foreground/70">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange('name')}
            className="w-full pl-3 pr-4 py-2 rounded-lg bg-background/80 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium text-foreground placeholder:text-foreground/40"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="email" className="block text-sm font-medium text-foreground/70">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            className="w-full pl-3 pr-4 py-2 rounded-lg bg-background/80 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium text-foreground placeholder:text-foreground/40"
            placeholder="Enter your email address"
            required
          />
        </div>
      </div>

      <div className="space-y-3">
        <label htmlFor="subject" className="block text-sm font-medium text-foreground/70">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange('subject')}
          className="w-full pl-3 pr-4 py-2 rounded-lg bg-background/80 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium text-foreground placeholder:text-foreground/40"
          placeholder="How can we help you?"
          required
        />
      </div>

      <div className="space-y-3">
        <label htmlFor="message" className="block text-sm font-medium text-foreground/70">
          Message
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={handleChange('message')}
          rows={5}
          className="w-full pl-3 pr-4 py-2 rounded-lg bg-background/80 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium text-foreground resize-y placeholder:text-foreground/40"
          placeholder="Please provide details about your inquiry..."
          required
        />
      </div>

      <div className="mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-primary-500 text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="h-4 w-4 animate-spin mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9h.582M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Sending...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </button>
      </div>

      {/* Contact Info */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Contact Information
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary-500" />
            <div>
              <p className="font-medium text-foreground">Visa Itinerary Headquarters</p>
              <p className="text-sm text-foreground/50">123 Travel Ave, Global City</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Phone className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary-500" />
            <div>
              <p className="font-medium text-foreground">+1 (555) 123-4567</p>
              <p className="text-sm text-foreground/50">Mon-Fri: 9AM - 6PM EST</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Mail className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary-500" />
            <div>
              <p className="font-medium text-foreground">support@visaitinerary.com</p>
              <p className="text-sm text-foreground/50">We aim to respond within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}