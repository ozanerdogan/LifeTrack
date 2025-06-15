import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronRight, Mail, Bug, Lightbulb, Youtube, Twitter, Github } from 'lucide-react';
import { FaDiscord, FaReddit, FaInstagram, FaFacebook } from 'react-icons/fa';

const HelpSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How can I customize my profile?",
      answer: "Click the avatar icon at the top-right corner to access your profile. From there, you can update your name, visible username, bio, birthday, and location. You can also customize your avatar by changing its background and icon, and view your recent activity, stats, and unlocked achievements."
    },
    {
      question: "What’s the difference between a to-do and a habit?",
      answer: "To-dos are one-time tasks that you complete and check off, like 'Finish a report' or 'Buy groceries'. Habits, on the other hand, are recurring actions meant to be tracked over time, such as 'Drink water' or 'Avoid junk food'. Habits are ideal for long-term progress and building consistency."
    },
    {
      question: "How do I create a new to-do or habit?",
      answer: "On the homepage, click the plus (+) buttons in either the To-Dos or Habits sections. To create a to-do, only a title is required. For habits, you’ll also choose a type: positive (something you want to do) or negative (something you want to avoid)."
    },
    {
      question: "Can I edit to-dos and habits?",
      answer: "Yes, you can edit or delete any to-do or habit by clicking the three-dot menu next to it."
    },
    {
      question: "Can I set due dates or reminders for my to-do?",
      answer: "Yes, when adding or editing a to-do, you can set a due date and enable reminders so you won’t forget."
    },
    {
      question: "How do I mark a to-do as complete?",
      answer: "Click the checkmark icon to the left of the to-do. If the to-do includes a checklist, you can also mark individual checklist items as complete."
    },
    {
      question: "What are some sample to-dos?",
      answer: "Examples include: 'Study for exam', 'Pay electricity bill', 'Call mom', 'Read a book chapter', or 'Go for a run'. You can use sub checklists to use them as shopping lists or study planners."
    },
    {
      question: "What are some sample habits?",
      answer: "Positive habits: 'Drink 2L of water', 'Read 10 pages', 'Practice coding', 'Meditate for 10 minutes'.\nNegative habits: 'Skip breakfast', 'Smoke', 'Procrastinate work', 'Eat fast food'.\nNegative habits gain streaks for every day you avoid them, and the streak resets if you do them. Positive habits gain a streak for each day you complete them."
    },
    {
      question: "How are habit streaks calculated?",
      answer: "Habit streaks are calculated based on consecutive days of completion. If you complete a habit today and yesterday, your streak is 2 days. Missing a day will reset your streak to 0, but you can start building it again immediately."
    },
    {
      question: "What is difficulty used for?",
      answer: "In to-dos, difficulty determines how much experience (EXP) you earn upon completion. In habits, difficulty affects EXP gains and also impacts your health—positive habits increase health when maintained, while negative ones reduce it when broken."
    },
    {
      question: "How can I see my progress?",
      answer: "You can view your progress through detailed heatmaps on the Progress page, categorized by tags. The History page also provides a full searchable record of your to do and habit activity."
    },
    {
      question: "What do the colors in the progress heatmap mean?",
      answer: "The heatmap uses color intensity to show your daily completion rates. Lighter colors indicate fewer completions, while darker colors show higher completion rates. Gray squares represent days with no activity."
    },
    {
      question: "How can I see history?",
      answer: "Go to the History page to access detailed filters and search options that help you track past to-dos, habit streaks, and completions."
    },
    {
      question: "How do I earn EXP and level up?",
      answer: "You earn XP by completing todos and maintaining habit streaks. Easy tasks give you small EXP rewards, while harder tasks provide more EXP. Positive habits give EXP when completed, and doing negative habits decrease EXP. As you accumulate XP, you'll level up and unlock new achievements and profile icons."
    },
    {
      question: "Can I customize my avatar or badges?",
      answer: "Yes, you can customize your avatar appearance and view unlocked badges from your profile page."
    },
    {
      question: "What are achievements?",
      answer: "Achievements are special milestones earned by using the app effectively, such as reaching streak goals or completing a certain number of tasks. You can view them on your profile page."
    },
    {
      question: "How do I turn on notifications/reminders?",
      answer: "Go to Settings > Notifications to enable habit reminders and task notifications. You can choose to receive notifications for daily habits, task deadlines, streak reminders, and weekly progress summaries to stay on track with your goals."
    },
    {
      question: "Can I change the theme or appearance of the app?",
      answer: "Yes, we currently support Dark Mode. You can toggle it on or off under Settings > Site Settings."
    },
    {
      question: "Can I reorder or group my tasks? How do I create categories or tags?",
      answer: "You can assign a tag to each to-do and habit. Tags can be created or selected from the tag dropdown in the add/edit page of a task or habit, helping you group and filter tasks easily."
    },
    {
      question: "Is my data secure or private?",
      answer: "Yes, your data is safe. Currently we store no personal data, literally."
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

              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className="p-2 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-lg">
                  <FaInstagram className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Instagram</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">@lifetrack</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                  <FaFacebook className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Facebook</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">@LifeTrack</p>
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
              <li>🧩 Mix tasks with fun – name them like game quests.</li>
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