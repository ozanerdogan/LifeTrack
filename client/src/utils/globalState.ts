// Global state management for the application
export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  difficulty: "easy" | "medium" | "hard" | "extreme";
  tags: string[];
  dueDate?: string;
  checklist: { id: string; text: string; completed: boolean }[];
  createdAt: string;
  completedAt?: string;
}

export interface Habit {
  id: string;
  title: string;
  description: string;
  type: "positive" | "negative";
  difficulty: "easy" | "medium" | "hard" | "extreme";
  tags: string[];
  streak: number;
  lastCompleted?: string;
  createdAt: string;
}

export interface User {
  name: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  location: string;
  birthday: string;
  joinDate: string;
  avatar: string;
  avatarBgColor: string;
  health: number;
  maxHealth: number;
  exp: number;
  level: number;
  language: string;
  timezone: string;
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  darkMode: boolean;
  notifications: {
    streakRecords: boolean;
    habitReminders: boolean;
    taskDeadlines: boolean;
    weeklyProgress: boolean;
  };
}

export interface Notification {
  id: string;
  type: "streak_record" | "habit_reminder" | "task_deadline" | "weekly_progress";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface AppState {
  user: User;
  todos: Todo[];
  habits: Habit[];
  tags: string[];
  history: HistoryEntry[];
  notifications: Notification[];
}

export interface HistoryEntry {
  id: string;
  type: "todo" | "habit";
  action: "completed" | "uncompleted" | "added" | "edited" | "deleted";
  title: string;
  tags: string[];
  difficulty: "easy" | "medium" | "hard" | "extreme";
  timestamp: string;
  expGained?: number;
  healthChange?: number;
}

// Difficulty values
export const DIFFICULTY_VALUES = {
  easy: { exp: 1, health: 1 },
  medium: { exp: 2, health: 2 },
  hard: { exp: 3, health: 3 },
  extreme: { exp: 4, health: 4 },
};

// Initial state
const initialState: AppState = {
  user: {
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    password: "password123",
    bio: "Productivity enthusiast focused on building better habits and achieving goals.",
    location: "New York, NY",
    birthday: "1990-05-15",
    joinDate: "2024-01-01",
    avatar: "JD",
    avatarBgColor: "#3B82F6",
    health: 33,
    maxHealth: 50,
    exp: 12,
    level: 1,
    language: "English",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    darkMode: false,
    notifications: {
      streakRecords: true,
      habitReminders: true,
      taskDeadlines: true,
      weeklyProgress: true,
    },
  },
  todos: [
    {
      id: "1",
      title: "Review project proposal",
      description: "Go through the Q4 project proposal and provide feedback",
      completed: false,
      difficulty: "medium",
      tags: ["work", "important"],
      dueDate: "2024-01-20",
      checklist: [],
      createdAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      title: "Update portfolio website",
      description: "Add recent projects and update skills section",
      completed: true,
      difficulty: "hard",
      tags: ["personal", "coding"],
      checklist: [
        { id: "1", text: "Update projects section", completed: true },
        { id: "2", text: "Refresh skills list", completed: true },
      ],
      createdAt: "2024-01-10T09:00:00Z",
      completedAt: "2024-01-14T15:30:00Z",
    },
  ],
  habits: [
    {
      id: "1",
      title: "Morning Exercise",
      description: "30 minutes of cardio or strength training",
      type: "positive",
      difficulty: "medium",
      tags: ["health", "fitness"],
      streak: 5,
      lastCompleted: "2024-01-15",
      createdAt: "2024-01-01T06:00:00Z",
    },
    {
      id: "2",
      title: "Social Media Scrolling",
      description: "Limit mindless social media browsing",
      type: "negative",
      difficulty: "easy",
      tags: ["digital-wellness", "productivity"],
      streak: 4,
      createdAt: "2024-01-05T12:00:00Z",
    },
  ],
  tags: [
    "work",
    "important",
    "personal",
    "coding",
    "health",
    "fitness",
    "digital-wellness",
    "productivity",
  ],
  history: [
    {
      id: "1",
      type: "todo",
      action: "completed",
      title: "Update portfolio website",
      tags: ["personal", "coding"],
      difficulty: "hard",
      timestamp: "2024-01-14T15:30:00Z",
      expGained: 3,
      healthChange: 0,
    },
    {
      id: "2",
      type: "habit",
      action: "completed",
      title: "Morning Exercise",
      tags: ["health", "fitness"],
      difficulty: "medium",
      timestamp: "2024-01-15T07:00:00Z",
      expGained: 2,
      healthChange: 2,
    },
  ],
  notifications: [
    {
      id: "welcome",
      type: "weekly_progress",
      title: "Welcome to LifeTrack!",
      message: "Start building better habits and achieving your goals with our gamified productivity system.",
      timestamp: new Date().toISOString(),
      read: false,
    },
    {
      id: "quick-tip",
      type: "weekly_progress", 
      title: "💡 Quick Tip",
      message: "Treat your streak like a high score – don't break it! Find more tips on the help page.",
      timestamp: new Date().toISOString(),
      read: false,
    },
  ],
};

// State management
let currentState: AppState = { ...initialState };
const listeners: ((state: AppState) => void)[] = [];

export const getState = (): AppState => currentState;

export const setState = (updater: (state: AppState) => AppState) => {
  currentState = updater(currentState);
  listeners.forEach((listener) => listener(currentState));
};

export const subscribe = (listener: (state: AppState) => void) => {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

// Helper functions
export const generateId = () => Math.random().toString(36).substr(2, 9);

export const addTodo = (todo: Omit<Todo, "id" | "createdAt">) => {
  setState((state) => ({
    ...state,
    todos: [
      {
        ...todo,
        id: generateId(),
        createdAt: new Date().toISOString(),
      },
      ...state.todos,
    ],
    tags: Array.from(new Set([...state.tags, ...todo.tags])),
    history: [
      {
        id: generateId(),
        type: "todo",
        action: "added",
        title: todo.title,
        tags: todo.tags,
        difficulty: todo.difficulty,
        timestamp: new Date().toISOString(),
      },
      ...state.history,
    ],
  }));
};

export const updateTodo = (id: string, updates: Partial<Todo>) => {
  setState((state) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, ...updates } : todo,
    ),
    tags: Array.from(new Set([...state.tags, ...(updates.tags || [])])),
    history: [
      {
        id: generateId(),
        type: "todo",
        action: "edited",
        title: state.todos.find((t) => t.id === id)?.title || "Unknown",
        tags: updates.tags || state.todos.find((t) => t.id === id)?.tags || [],
        difficulty:
          updates.difficulty ||
          state.todos.find((t) => t.id === id)?.difficulty ||
          "easy",
        timestamp: new Date().toISOString(),
      },
      ...state.history,
    ],
  }));
};

// Avatar unlock levels
export const AVATAR_OPTIONS = [
  { emoji: '🐱', level: 1 },
  { emoji: '🐶', level: 1 },
  { emoji: '🐻', level: 2 },
  { emoji: '🦊', level: 3 },
  { emoji: '🐰', level: 2 },
  { emoji: '🐼', level: 4 },
  { emoji: '👨', level: 1 },
  { emoji: '👩', level: 1 },
  { emoji: '👦', level: 2 },
  { emoji: '👧', level: 2 },
  { emoji: '🧑', level: 3 },
  { emoji: '👴', level: 5 },
  { emoji: '🤖', level: 6 },
  { emoji: '👽', level: 7 },
  { emoji: '🎭', level: 4 },
  { emoji: '🎨', level: 5 },
  { emoji: '⭐', level: 8 },
  { emoji: '🌟', level: 10 }
];

const checkForUnlockedAvatars = (oldLevel: number, newLevel: number) => {
  const newlyUnlocked = AVATAR_OPTIONS.filter(
    avatar => avatar.level > oldLevel && avatar.level <= newLevel
  );
  
  newlyUnlocked.forEach(avatar => {
    addNotification({
      type: "streak_record",
      title: "Level Up!",
      message: `You've unlocked ${avatar.emoji} at level ${avatar.level}!`
    });
  });
};

export const completeTodo = (id: string) => {
  setState((state) => {
    const todo = state.todos.find((t) => t.id === id);
    if (!todo || todo.completed) return state;

    const difficultyValue = DIFFICULTY_VALUES[todo.difficulty];
    const newExp = state.user.exp + difficultyValue.exp;
    const newLevel = Math.floor(newExp / 10) + 1;
    const oldLevel = state.user.level;

    // Check for unlocked avatars when leveling up
    if (newLevel > oldLevel) {
      setTimeout(() => checkForUnlockedAvatars(oldLevel, newLevel), 100);
    }

    return {
      ...state,
      todos: state.todos.map((t) =>
        t.id === id
          ? { ...t, completed: true, completedAt: new Date().toISOString() }
          : t,
      ),
      user: {
        ...state.user,
        exp: newExp,
        level: newLevel,
      },
      history: [
        {
          id: generateId(),
          type: "todo",
          action: "completed",
          title: todo.title,
          tags: todo.tags,
          difficulty: todo.difficulty,
          timestamp: new Date().toISOString(),
          expGained: difficultyValue.exp,
        },
        ...state.history,
      ],
    };
  });
};

export const uncompleteTodo = (id: string) => {
  setState((state) => {
    const todo = state.todos.find((t) => t.id === id);
    if (!todo || !todo.completed) return state;

    const difficultyValue = DIFFICULTY_VALUES[todo.difficulty];
    const newExp = Math.max(0, state.user.exp - difficultyValue.exp);
    const newLevel = Math.floor(newExp / 10) + 1;

    return {
      ...state,
      todos: state.todos.map((t) =>
        t.id === id
          ? { ...t, completed: false, completedAt: undefined }
          : t,
      ),
      user: {
        ...state.user,
        exp: newExp,
        level: newLevel,
      },
      history: [
        {
          id: generateId(),
          type: "todo",
          action: "uncompleted",
          title: todo.title,
          tags: todo.tags,
          difficulty: todo.difficulty,
          timestamp: new Date().toISOString(),
          expGained: -difficultyValue.exp,
        },
        ...state.history,
      ],
    };
  });
};

export const addHabit = (habit: Omit<Habit, "id" | "createdAt" | "streak">) => {
  setState((state) => ({
    ...state,
    habits: [
      {
        ...habit,
        id: generateId(),
        streak: 0,
        createdAt: new Date().toISOString(),
      },
      ...state.habits,
    ],
    tags: Array.from(new Set([...state.tags, ...habit.tags])),
    history: [
      {
        id: generateId(),
        type: "habit",
        action: "added",
        title: habit.title,
        tags: habit.tags,
        difficulty: habit.difficulty,
        timestamp: new Date().toISOString(),
      },
      ...state.history,
    ],
  }));
};

export const updateHabit = (id: string, updates: Partial<Habit>) => {
  setState((state) => ({
    ...state,
    habits: state.habits.map((habit) =>
      habit.id === id ? { ...habit, ...updates } : habit,
    ),
    tags: Array.from(new Set([...state.tags, ...(updates.tags || [])])),
    history: [
      {
        id: generateId(),
        type: "habit",
        action: "edited",
        title: state.habits.find((h) => h.id === id)?.title || "Unknown",
        tags: updates.tags || state.habits.find((h) => h.id === id)?.tags || [],
        difficulty:
          updates.difficulty ||
          state.habits.find((h) => h.id === id)?.difficulty ||
          "easy",
        timestamp: new Date().toISOString(),
      },
      ...state.history,
    ],
  }));
};

export const completeHabit = (id: string) => {
  setState((state) => {
    const habit = state.habits.find((h) => h.id === id);
    if (!habit) return state;

    const difficultyValue = DIFFICULTY_VALUES[habit.difficulty];
    const isPositive = habit.type === "positive";
    const expChange = isPositive ? difficultyValue.exp : -difficultyValue.exp;
    const healthChange = isPositive
      ? difficultyValue.health
      : -difficultyValue.health;

    const newExp = Math.max(0, state.user.exp + expChange);
    const newHealth = Math.max(
      0,
      Math.min(state.user.maxHealth, state.user.health + healthChange),
    );
    const newLevel = Math.floor(newExp / 10) + 1;
    const oldLevel = state.user.level;

    // Check for unlocked avatars when leveling up
    if (newLevel > oldLevel) {
      setTimeout(() => checkForUnlockedAvatars(oldLevel, newLevel), 100);
    }

    const newStreak = isPositive ? habit.streak + 1 : 0;
    const isNewRecord = isPositive && newStreak > habit.streak && newStreak > 1;

    const newState = {
      ...state,
      habits: state.habits.map((h) =>
        h.id === id
          ? {
              ...h,
              streak: newStreak,
              lastCompleted: new Date().toISOString().split("T")[0],
            }
          : h,
      ),
      user: {
        ...state.user,
        exp: newExp,
        health: newHealth,
        level: newLevel,
      },
      history: [
        {
          id: generateId(),
          type: "habit" as const,
          action: "completed" as const,
          title: habit.title,
          tags: habit.tags,
          difficulty: habit.difficulty,
          timestamp: new Date().toISOString(),
          expGained: expChange,
          healthChange: healthChange,
        },
        ...state.history,
      ],
    };

    // Add streak record notification after state update
    if (isNewRecord && state.user.notifications.streakRecords) {
      newState.notifications = [
        {
          id: generateId(),
          type: "streak_record" as const,
          title: "🔥 New Streak Record!",
          message: `You've reached a ${newStreak}-day streak for "${habit.title}"!`,
          timestamp: new Date().toISOString(),
          read: false,
        },
        ...newState.notifications,
      ];
    }

    return newState;
  });
};

export const uncompleteHabit = (id: string) => {
  setState((state) => {
    const habit = state.habits.find((h) => h.id === id);
    if (!habit || habit.streak === 0) return state;

    const difficultyValue = DIFFICULTY_VALUES[habit.difficulty];
    const isPositive = habit.type === "positive";
    const expChange = isPositive ? -difficultyValue.exp : difficultyValue.exp;
    const healthChange = isPositive
      ? -difficultyValue.health
      : difficultyValue.health;

    const newExp = Math.max(0, state.user.exp + expChange);
    const newHealth = Math.max(
      0,
      Math.min(state.user.maxHealth, state.user.health + healthChange),
    );
    const newLevel = Math.floor(newExp / 10) + 1;

    return {
      ...state,
      habits: state.habits.map((h) =>
        h.id === id
          ? {
              ...h,
              streak: Math.max(0, h.streak - 1),
              lastCompleted: h.streak <= 1 ? undefined : h.lastCompleted,
            }
          : h,
      ),
      user: {
        ...state.user,
        exp: newExp,
        health: newHealth,
        level: newLevel,
      },
      history: [
        {
          id: generateId(),
          type: "habit",
          action: "uncompleted",
          title: habit.title,
          tags: habit.tags,
          difficulty: habit.difficulty,
          timestamp: new Date().toISOString(),
          expGained: expChange,
          healthChange: healthChange,
        },
        ...state.history,
      ],
    };
  });
};

export const deleteTodo = (id: string) => {
  setState((state) => {
    const todo = state.todos.find((t) => t.id === id);
    return {
      ...state,
      todos: state.todos.filter((t) => t.id !== id),
      history: todo
        ? [
            {
              id: generateId(),
              type: "todo",
              action: "deleted",
              title: todo.title,
              tags: todo.tags,
              difficulty: todo.difficulty,
              timestamp: new Date().toISOString(),
            },
            ...state.history,
          ]
        : state.history,
    };
  });
};

export const deleteHabit = (id: string) => {
  setState((state) => {
    const habit = state.habits.find((h) => h.id === id);
    return {
      ...state,
      habits: state.habits.filter((h) => h.id !== id),
      history: habit
        ? [
            {
              id: generateId(),
              type: "habit",
              action: "deleted",
              title: habit.title,
              tags: habit.tags,
              difficulty: habit.difficulty,
              timestamp: new Date().toISOString(),
            },
            ...state.history,
          ]
        : state.history,
    };
  });
};

export const updateUser = (updates: Partial<User>) => {
  setState((state) => ({
    ...state,
    user: { ...state.user, ...updates },
  }));
};

export const addTag = (tag: string) => {
  setState((state) => ({
    ...state,
    tags: Array.from(new Set([...state.tags, tag])),
  }));
};

// Date formatting utility
export const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
  setState((state) => ({
    ...state,
    notifications: [
      {
        ...notification,
        id: generateId(),
        timestamp: new Date().toISOString(),
        read: false,
      },
      ...state.notifications,
    ],
  }));
};

export const markNotificationAsRead = (id: string) => {
  setState((state) => ({
    ...state,
    notifications: state.notifications.map((notif) =>
      notif.id === id ? { ...notif, read: true } : notif
    ),
  }));
};

export const removeNotification = (id: string) => {
  setState((state) => ({
    ...state,
    notifications: state.notifications.filter((notif) => notif.id !== id),
  }));
};

export const formatDate = (dateString: string, format?: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD') => {
  const date = new Date(dateString);
  const userFormat = format || getState().user.dateFormat;
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  switch (userFormat) {
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'MM/DD/YYYY':
    default:
      return `${month}/${day}/${year}`;
  }
};
