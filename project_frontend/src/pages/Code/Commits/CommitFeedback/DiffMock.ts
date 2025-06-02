export type DiffLine = {
  type: "added" | "removed" | "unchanged";
  oldNumber: number | null;
  newNumber: number | null;
  content: string;
};

export type FileDiff = {
  filename: string;
  path: string;
  additions: number;
  deletions: number;
  lines: DiffLine[];
};

export const navbarDiff: FileDiff = {
  filename: "Navbar.tsx",
  path: "project_frontend/src/components",
  additions: 75,
  deletions: 71,
  lines: [
    { type: "removed", oldNumber: 1, newNumber: null, content: "import { Link, useLocation, } from 'react-router-dom';" },
    { type: "removed", oldNumber: 2, newNumber: null, content: "import { Home, Code2, BookOpen, Trophy, ShoppingCart, ListTodo, Settings } from 'lucide-react';" },
    { type: "added", oldNumber: null, newNumber: 1, content: "import { Link, useLocation } from 'react-router-dom';" },
    { type: "added", oldNumber: null, newNumber: 2, content: "import { Home, Code2, BookOpen, Trophy, ShoppingCart, ListTodo, Settings, Menu } from 'lucide-react';" },
    { type: "removed", oldNumber: 10, newNumber: null, content: "const location = useLocation(); // Get the current location" },
    { type: "added", oldNumber: null, newNumber: 11, content: "const menuOpen, setMenuOpen = useState(false);" },
    { type: "unchanged", oldNumber: 12, newNumber: 12, content: "const navItems = [" },
  ]
};
