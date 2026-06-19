import { UserPlus, Mail, Phone, MapPin, Edit2 } from 'lucide-react';
import { useState } from 'react';

interface AccountProfileFormProps {
  className?: string;
  userProfile: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    avatarUrl?: string;
  };
  onUpdate: (profileData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    avatarUrl?: string;
  }) => void;
}

export default function AccountProfileForm({
  className,
  userProfile,
  onUpdate
}: AccountProfileFormProps) {
  const [formData, setFormData] = useState({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    email: userProfile.email,
    phone: userProfile.phone || '',
    address: userProfile.address || '',
    avatarUrl: userProfile.avatarUrl || ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    setIsUpdating(true);
    onUpdate(formData);
    // In a real implementation, you'd wait for the update to succeed
    setIsUpdating(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full space-y-6 bg-background/50 rounded-lg p-6 border border-border/50 ${className}`}
    >
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <UserPlus className="h-5 w-5 flex-shrink-0 text-primary-500 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Profile Information
            </h3>
            <p className="text-sm text-foreground/50">
              Update your personal details to keep your account information current.
            </p>
          </div>
        </div>
      </div>

      {/* Avatar Upload */}
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="relative">
            {formData.avatarUrl ? (
              <img
                src={formData.avatarUrl}
                alt="Avatar"
                className="h-12 w-12 rounded-full object-cover border-2 border-primary-500"
              />
            ) : (
              <div className="h-12 w-12 flex items-center justify-center bg-primary-500/20 text-primary-500 rounded-full">
                <UserPlus className="h-6 w-6" />
              </div>
            )}
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center bg-primary-500 text-primary-foreground rounded-full text-xs font-medium hover:bg-primary-600 transition-colors ${
                showAvatarUpload ? 'bg-primary-600' : ''
              }`}
              onMouseEnter={() => setShowAvatarUpload(true)}
              onMouseLeave={() => setShowAvatarUpload(false)}
            >
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <Edit2 className="h-4 w-4" />
            </label>
          </div>
          <div className="ml-4">
            <p className="font-medium text-foreground">
              {`${formData.firstName} ${formData.lastName}`}
            </p>
            <p className="text-sm text-foreground/50">
              {formData.email}
            </p>
          </div>
        </div>
        {showAvatarUpload && (
          <p className="mt-2 text-xs text-foreground/50 text-center">
            Click to change your profile picture
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <label htmlFor="firstName" className="block text-sm font-medium text-foreground/70">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange('firstName')}
            className="w-full pl-3 pr-4 py-2 rounded-lg bg-background/80 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium text-foreground placeholder:text-foreground/40"
            placeholder="Enter your first name"
            required
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="lastName" className="block text-sm font-medium text-foreground/70">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange('lastName')}
            className="w-full pl-3 pr-4 py-2 rounded-lg bg-background/80 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium text-foreground placeholder:text-foreground/40"
            placeholder="Enter your last name"
            required
          />
        </div>
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

      <div className="space-y-3">
        <label htmlFor="phone" className="block text-sm font-medium text-foreground/70">
          Phone Number (Optional)
        </label>
        <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange('phone')}
            className="w-full pl-3 pr-4 py-2 rounded-lg bg-background/80 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium text-foreground placeholder:text-foreground/40"
            placeholder="Enter your phone number"
          />
      </div>

      <div className="space-y-3">
        <label htmlFor="address" className="block text-sm font-medium text-foreground/70">
          Address (Optional)
        </label>
        <textarea
            id="address"
            value={formData.address}
            onChange={handleChange('address')}
            rows={3}
            className="w-full pl-3 pr-4 py-2 rounded-lg bg-background/80 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium text-foreground resize-y placeholder:text-foreground/40"
            placeholder="Enter your address"
          />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={isUpdating}
          className={`w-full bg-primary-500 text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors ${
            isUpdating ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isUpdating ? (
            <>
              <svg className="h-4 w-4 animate-spin mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9h.582M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Updating...
            </>
          ) : (
            <>
              <Edit2 className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );
}