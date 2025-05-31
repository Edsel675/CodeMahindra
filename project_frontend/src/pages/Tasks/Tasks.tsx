"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import {
  RefreshCw,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  Clock,
  AlertCircle,
  X
} from "lucide-react";

import { Avatar } from "@/components/avatar";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/pages/Tasks/Tooltip";
import { Input } from "@/pages/Tasks/Input";

interface Task {
  id: number;
  title: string;
  status: string;
  priority?: string;
  tag?: string;
  estimatedTime?: number;
  createdAt?: string;
  description?: string;
  sprint?: string;
  labels?: string;
  reporter?: string;
  assignee?: {
    name: string;
    avatar?: string;
  };
  taskId?: string;
  assignee_name?: any;
  assignee_avatar?: any;
}

const columns = ["To Do", "In Progress", "Code Review", "Done"];

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [jiraModalOpen, setJiraModalOpen] = useState(true);
  const [jiraEmail, setJiraEmail] = useState("");
  const [jiraToken, setJiraToken] = useState("");

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get<Task[]>(`${import.meta.env.VITE_BACKEND_URL}/tasks/`);
      const enhancedData = res.data.map((task) => {
        const normalizedStatus =
          task.status?.toLowerCase() === "in progress"
            ? "In Progress"
            : task.status?.toLowerCase() === "code review"
            ? "Code Review"
            : task.status?.toLowerCase() === "done"
            ? "Done"
            : "To Do";

        return {
          ...task,
          status: normalizedStatus,
          taskId: `TIS-${task.id}`,
          assignee: task.assignee_name
            ? {
                name: task.assignee_name,
                avatar: task.assignee_avatar || "/placeholder.svg",
              }
            : undefined,
        };
      });
      setTasks(enhancedData);
    } catch (err) {
      console.error("❌ Error loading tasks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("jira_email");
    const savedToken = localStorage.getItem("jira_api_token");
    if (savedEmail && savedToken) {
      setJiraEmail(savedEmail);
      setJiraToken(savedToken);
      setJiraModalOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!jiraModalOpen) fetchTasks();
  }, [jiraModalOpen]);

  const groupByStatus = (status: string) =>
    tasks.filter((task) => task.status.toLowerCase() === status.toLowerCase());

  const getTagColor = (tag?: string) => {
    if (!tag) return "bg-gray-200 text-gray-800";
    return "bg-gray-100 text-gray-700";
  };

  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case "Alta":
        return <ArrowUp className="text-red-600 w-4 h-4" />;
      case "Media":
        return <ArrowUp className="text-yellow-600 w-4 h-4" />;
      case "Baja":
        return <ArrowDown className="text-green-600 w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Done":
        return <CheckCircle className="text-green-500 w-4 h-4" />;
      case "In Progress":
        return <Clock className="text-blue-500 w-4 h-4" />;
      case "Code Review":
        return <AlertCircle className="text-purple-500 w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleSubmitJira = async () => {
    if (!jiraEmail || !jiraToken) {
      alert("Please enter both Jira email and token");
      return;
    }
    try {
      await axios.put("http://127.0.0.1:8000/employees/jira-auth", {
        jira_email: jiraEmail,
        jira_api_token: jiraToken,
      });
      localStorage.setItem("jira_email", jiraEmail);
      localStorage.setItem("jira_api_token", jiraToken);
      setJiraModalOpen(false);
    } catch (err) {
      alert("Error setting Jira credentials.");
    }
  };

  const handleCloseModal = () => {
    setJiraModalOpen(false);
  };

  return (
    <div className="bg-[#363B41] min-h-screen">
      <Dialog open={jiraModalOpen} onClose={() => {}} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl relative">
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <Dialog.Title className="text-lg font-bold mb-4">Connect to Jira</Dialog.Title>
            <div className="space-y-4">
              <Input
                placeholder="Jira Email"
                value={jiraEmail}
                onChange={(e) => setJiraEmail(e.target.value)}
              />
              <Input
                placeholder="Jira API Token"
                type="password"
                value={jiraToken}
                onChange={(e) => setJiraToken(e.target.value)}
              />
              <Button onClick={handleSubmitJira} className="w-full">Continue</Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Resto del dashboard */}
      <div className="max-w-[1600px] mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-100">Task Management</h1>
          <Button
            variant="outline"
            onClick={fetchTasks}
            className="flex items-center gap-2"
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((status) => {
            const tasksInColumn = groupByStatus(status);
            return (
              <div
                key={status}
                className="bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col"
              >
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                  <h2 className="font-semibold text-slate-700 flex items-center gap-2">
                    {getStatusIcon(status)}
                    {status}{" "}
                    <span className="ml-1 text-slate-500 text-sm">
                      {tasksInColumn.length}
                    </span>
                  </h2>
                </div>
                <div className="p-3 flex-1 overflow-auto max-h-[calc(100vh-240px)] space-y-3">
                  {isLoading ? (
                    <div className="text-center text-slate-400 text-sm">Loading...</div>
                  ) : tasksInColumn.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-sm">No tasks</div>
                  ) : (
                    tasksInColumn.map((task) => (
                      <div
                        key={task.id}
                        className="p-3 bg-white border border-slate-200 rounded-md hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => {
                          setSelectedTask(task);
                          setIsOpen(true);
                        }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-xs font-medium text-slate-500">{task.taskId}</div>
                          {task.priority && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div>{getPriorityIcon(task.priority)}</div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Priority: {task.priority}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                        <h3 className="font-medium text-slate-800 mb-2">{task.title}</h3>
                        {task.tag && (
                          <Badge
                            variant="outline"
                            className={`${getTagColor(task.tag)} text-xs font-normal mb-2`}
                          >
                            {task.tag}
                          </Badge>
                        )}
                        {task.assignee && (
                          <div className="flex items-center gap-2 mt-2">
                            <Avatar className="w-6 h-6 border border-white">
                              <img
                                src={task.assignee.avatar || "/placeholder.svg"}
                                alt={task.assignee.name}
                              />
                            </Avatar>
                            <div className="text-xs text-slate-600">{task.assignee.name}</div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal de Detalle */}
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-md w-full p-0 max-h-[90vh] overflow-hidden">
              {selectedTask && (
                <>
                  <div className="border-b border-slate-200 p-4">
                    <div className="flex justify-between items-start">
                      <Dialog.Title className="text-lg font-semibold text-slate-800">
                        {selectedTask.title}
                      </Dialog.Title>
                      <Badge
                        variant="outline"
                        className={`${getTagColor(selectedTask.tag)}`}
                      >
                        {selectedTask.tag}
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-500 mt-1">{selectedTask.taskId}</div>
                  </div>

                  <div className="p-4 overflow-y-auto max-h-[calc(90vh-180px)]">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <InfoBlock
                        label="Status"
                        value={selectedTask.status}
                        icon={getStatusIcon(selectedTask.status)}
                      />
                      <InfoBlock
                        label="Priority"
                        value={selectedTask.priority}
                        icon={getPriorityIcon(selectedTask.priority)}
                      />
                      <InfoBlock label="Sprint" value={selectedTask.sprint} />
                      <InfoBlock label="Reporter" value={selectedTask.reporter} />
                      <InfoBlock label="Labels" value={selectedTask.labels} />
                      <InfoBlock
                        label="Estimated"
                        value={
                          selectedTask.estimatedTime
                            ? `${selectedTask.estimatedTime}h`
                            : "Not set"
                        }
                      />
                    </div>

                    {selectedTask.description && (
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Description</h3>
                        <div className="text-slate-700 text-sm bg-slate-50 p-3 rounded-md">
                          {selectedTask.description}
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-2">Activity</h3>
                      <div className="text-sm text-slate-500">
                        {selectedTask.createdAt ? (
                          <div className="flex items-center gap-2">
                            <span>
                              Created on {new Date(selectedTask.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        ) : (
                          <div>No activity recorded</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 p-4 flex justify-between">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                      Close
                    </Button>
                    <Button>Update Status</Button>
                  </div>
                </>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

const InfoBlock = ({ label, value, icon }: { label: string; value?: string; icon?: JSX.Element }) => (
  <div>
    <h3 className="text-sm font-medium text-slate-500 mb-1">{label}</h3>
    <div className="flex items-center gap-1.5 font-medium text-slate-800">
      {icon}
      {value || "N/A"}
    </div>
  </div>
);