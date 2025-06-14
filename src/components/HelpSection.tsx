import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronRight, Mail, MessageCircle, Twitter, Github } from 'lucide-react';

const HelpSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I create a new habit?",
      answer: "To create a new habit, go to the Habits section and click the 'New Habit' button. Fill in the habit name, description, and set your target frequency. You can also choose a category and color for better organization."
    },
    {
      question: "Can I edit or delete completed tasks?",
      answer: "Yes, you can view all your completed tasks in the History section. While you cannot edit completed tasks, you can view their details and completion times. If you need to make changes, you can create a new task with the correct information."
    },
    {
      question: "How are habit streaks calculated?",
      answer: "Habit streaks are calculated based on consecutive days of completion. If you complete a habit today and yesterday, your streak is 2 days. Missing a day will reset your streak to 0, but you can start building it again immediately."
    },
    {
      question: "What do the colors in the progress heatmap mean?",
      answer: "The heatmap uses color intensity to show your daily completion rates. Lighter colors indicate fewer completions, while darker colors show higher completion rates. Gray squares represent days with no activity."
    },
    {
      question: "How can I backup my data?",
      answer: "You can export all your data from the Settings page under 'Data & Privacy'. This will download a JSON file containing all your tasks, habits, and progress data that you can save as a backup."
    },
    {
      question: "Can I set reminders for my habits?",
      answer: "Yes! Go to Settings > Notifications to enable habit reminders. You can choose to receive notifications for daily habits, task deadlines, and weekly progress summaries."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
        <p className="text-gray-600">Find answers to common questions and get support</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  
                  {openFaq === index && (
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact & Social */}
        <div className="space-y-6">
          {/* Contact Support */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h3>
            
            <div className="space-y-3">
              <a
                href="mailto:support@lifetrack.com"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email Support</p>
                  <p className="text-sm text-gray-600">support@lifetrack.com</p>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Live Chat</p>
                  <p className="text-sm text-gray-600">Available 9 AM - 5 PM EST</p>
                </div>
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
            
            <div className="space-y-3">
              <a
                href="https://twitter.com/lifetrack"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Twitter className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Twitter</p>
                  <p className="text-sm text-gray-600">@lifetrack</p>
                </div>
              </a>

              <a
                href="https://github.com/lifetrack"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="p-2 bg-gray-50 text-gray-600 rounded-lg">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">GitHub</p>
                  <p className="text-sm text-gray-600">Open source projects</p>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Quick Tips</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Use keyboard shortcuts: Ctrl+N for new task</li>
              <li>• Set realistic habit goals to maintain streaks</li>
              <li>• Check your progress weekly for motivation</li>
              <li>• Use categories to organize your tasks better</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;