import React, { useState } from 'react';
import { Plus, Search, Filter, FileText, Calendar, Tag, Edit, Trash2 } from 'lucide-react';

const NotesSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);

  const categories = ['all', 'work', 'personal', 'ideas', 'projects'];
  
  const notes = [
    {
      id: 1,
      title: 'Project Kickoff Meeting Notes',
      content: 'Discussed project timeline, deliverables, and team responsibilities...',
      category: 'work',
      date: '2024-01-15',
      tags: ['meeting', 'project', 'planning']
    },
    {
      id: 2,
      title: 'Book Recommendations',
      content: 'List of books recommended by colleagues and friends...',
      category: 'personal',
      date: '2024-01-14',
      tags: ['books', 'reading', 'personal-development']
    },
    {
      id: 3,
      title: 'App Feature Ideas',
      content: 'Brainstorming session for new app features and improvements...',
      category: 'ideas',
      date: '2024-01-13',
      tags: ['brainstorming', 'features', 'innovation']
    },
    {
      id: 4,
      title: 'Weekend Trip Planning',
      content: 'Planning details for the upcoming weekend getaway...',
      category: 'personal',
      date: '2024-01-12',
      tags: ['travel', 'planning', 'weekend']
    }
  ];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notes</h1>
          <p className="text-gray-600 mt-1">Organize your thoughts and ideas</p>
        </div>
        
        <button
          onClick={() => setShowNewNoteForm(true)}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          <span>New Note</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Edit className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {note.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {note.content}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{note.date}</span>
              </div>
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                {note.category}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {note.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
                >
                  <Tag className="w-3 h-3" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Create your first note to get started'
            }
          </p>
          <button
            onClick={() => setShowNewNoteForm(true)}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Create Note</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default NotesSection;