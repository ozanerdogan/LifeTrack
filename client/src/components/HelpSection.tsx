import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronRight, Mail, Bug, Lightbulb, Youtube, Twitter, Github } from 'lucide-react';
import { FaDiscord, FaReddit } from 'react-icons/fa';

const HelpSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is gamification in LifeTrack?",
      answer: "LifeTrack uses gamification elements to make productivity fun and engaging. You earn XP (experience points) by completing tasks and maintaining habits, which helps you level up. You can unlock badges for achievements like maintaining streaks or completing milestones. The system includes visual progress tracking with streaks, levels, and rewards to keep you motivated on your productivity journey."
    },
    {
      question: "How do I earn XP and level up?",
      answer: "You earn XP by completing todos and maintaining habit streaks. Easy tasks give you small XP rewards, while harder tasks provide more XP. Positive habits give XP when completed, and maintaining streaks provides bonus XP. As you accumulate XP, you'll level up and unlock new achievements and badges."
    },
    {
      question: "What rewards can I unlock with progress?",
      answer: "As you progress, you can unlock various achievements and badges like 'First Week', 'Habit Master', 'Task Crusher', and 'Consistency King'. Higher levels unlock new customization options, advanced features, and special recognition for your dedication to personal growth."
    },
    {
      question: "How do I turn on notifications/reminders?",
      answer: "Go to Settings > Notifications to enable habit reminders and task notifications. You can choose to receive notifications for daily habits, task deadlines, streak reminders, and weekly progress summaries to stay on track with your goals."
    },
    {
      question: "Is my data secure or private?",
      answer: "Yes, your data privacy is important to us. All your personal information, tasks, and habits are stored securely. We don't share your personal data with third parties, and you have full control over your information through the Settings page where you can export or manage your data."
    },
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
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Help & Support</h1>
        <p className="text-gray-600 dark:text-gray-300">Find answers to common questions and get support</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 bg-white dark:bg-gray-800"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                  
                  {openFaq === index && (
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact & Social */}
        <div className="space-y-6">
          {/* Contact Us */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Email Support</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">support@lifetrack.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className="p-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
                  <Bug className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Report a Bug</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Submit a report</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className="p-2 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Suggest a Feature</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Tell us what you'd love</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                  <Twitter className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Twitter</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">@lifetrack</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className="p-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
                  <Youtube className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">YouTube</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Tutorials & updates</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                  <FaDiscord className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Discord</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Join our Discord</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className="p-2 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
                  <FaReddit className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Reddit</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">r/LifeTrack</p>
                </div>
              </div>

              <a
                href="https://github.com/ozanerdogan/LifeTrack"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="p-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">GitHub</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Contribute to LifeTrack!</p>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-700/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">💡 Quick Tips</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>🕹️ Treat your streak like a high score – don't break it!</li>
              <li>🎯 Set "easy wins" to build habit momentum.</li>
              <li>🧩 Mix tasks with fun – name tasks like game quests.</li>
              <li>🧘 Don't overload your day – 3–5 core tasks is enough.</li>
              <li>🏷️ Use tags to find tasks faster.</li>
              <li>📆 Review your goals every Sunday.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;