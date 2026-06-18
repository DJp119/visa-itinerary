import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

interface AskQuestionDialogProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (question: string) => void;
  title?: string;
  placeholder?: string;
  buttonText?: string;
}

export default function AskQuestionDialog({
  className,
  isOpen,
  onClose,
  onSubmit,
  title = 'Ask a Question',
  placeholder = 'Type your question here...',
  buttonText = 'Ask'
}: AskQuestionDialogProps) {
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsSubmitting(true);
    onSubmit(question);
    setQuestion('');
    // In a real implementation, you'd reset the form after submission succeeds
    setIsSubmitting(false);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={onClose}>
          {/* Dialog Content */}
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            <div className="w-full max-w-lg mx-auto bg-background/95 backdrop-blur-sm rounded-lg lg:w-[500px] max-h-[90vh] overflow-y-auto border border-border/50">
              {/* Dialog Header */}
              <div className="flex items-center justify-between px-5 pt-4 pb-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-background/100 transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="h-5 w-5 text-foreground/60 hover:text-foreground" />
                </button>
              </div>

              {/* Dialog Body */}
              <div className="px-5 pb-5">
                <p className="mb-4 text-sm text-foreground/50">
                  Have a question about visa requirements, travel documents, or immigration?
                  Our experts are here to help!
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="question-input" className="block text-sm font-medium text-foreground/70">
                      Your Question
                    </label>
                    <textarea
                      id="question-input"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder={placeholder}
                      rows={4}
                      className="w-full pl-3 pr-4 py-2 rounded-lg bg-background/80 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium text-foreground resize-y"
                    />
                  </div>

                  {/* Categories (optional) */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground/70 mb-2">
                      Category (optional)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="px-3 py-1 rounded-full text-xs bg-background/80 text-foreground/60 hover:bg-background/100 transition-colors"
                      >
                        Visa Requirements
                      </button>
                      <button
                        type="button"
                        className="px-3 py-1 rounded-full text-xs bg-background/80 text-foreground/60 hover:bg-background/100 transition-colors"
                      >
                        Document Processing
                      </button>
                      <button
                        type="button"
                        className="px-3 py-1 rounded-full text-xs bg-background/80 text-foreground/60 hover:bg-background/100 transition-colors"
                      >
                        Travel Advice
                      </button>
                      <button
                        type="button"
                        className="px-3 py-1 rounded-full text-xs bg-background/80 text-foreground/60 hover:bg-background/100 transition-colors"
                      >
                        Embassy Info
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
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
                          Submitting...
                        </>
                      ) : (
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {buttonText}
                      )}
                    </button>
                  </div>

                  {/* Help Text */}
                  <p className="mt-3 text-xs text-foreground/40 text-center">
                    We'll do our best to answer your question within 24 hours.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}