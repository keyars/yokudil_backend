export const mockUsers = [
  {
    id: 1,
    email: "admin@yokudil.com",
    password: "admin123",
    role: "super_admin",
    name: "Admin User",
    permissions: ["all"]
  },
  {
    id: 2,
    email: "teacher@yokudil.com", 
    password: "teacher123",
    role: "teacher",
    name: "Teacher User",
    permissions: ["view_members", "manage_attendance", "view_classes", "add_progress_notes", "view_reports"]
  },
  {
    id: 3,
    email: "volunteer@yokudil.com",
    password: "volunteer123", 
    role: "volunteer",
    name: "Volunteer User",
    permissions: ["view_members", "manage_attendance", "view_classes", "add_progress_notes"]
  }
];