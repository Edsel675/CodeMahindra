export type FileStatus = "added" | "modified" | "removed" | "unchanged";

export type FileNode = {
  name: string;
  type: "file" | "folder";
  status?: FileStatus;
  children?: FileNode[];
};

export const fileTree: FileNode[] = [
  {
    name: "project_frontend",
    type: "folder",
    children: [
      { name: "package-lock.json", type: "file", status: "modified" },
      { name: "package.json", type: "file", status: "unchanged" },
      {
        name: "public",
        type: "folder",
        children: [
          { name: "fondo.jpg", type: "file", status: "added" }
        ]
      },
      {
        name: "src",
        type: "folder",
        children: [
          { name: "App.tsx", type: "file", status: "unchanged" },
          {
            name: "components",
            type: "folder",
            children: [
              { name: "Navbar.tsx", type: "file", status: "modified" }
            ]
          },
          {
            name: "images",
            type: "folder",
            children: [
              { name: "CodeBox.png", type: "file", status: "unchanged" },
              { name: "Laptop.png", type: "file", status: "unchanged" },
              { name: "fondo.jpg", type: "file", status: "added" },
              { name: "benefits.png", type: "file", status: "added" }
            ]
          },
          { name: "index.css", type: "file", status: "modified" }
        ]
      }
    ]
  }
];
