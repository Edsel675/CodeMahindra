"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import {
  Search,
  Filter,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

import { Avatar } from "@/components/avatar";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Input } from "@/components/Input";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/tooltip";

interface Task { 
  id: number
  title: string
  status: string
  priority?: string
  tag?: string
  estimatedTime?: number
  createdAt?: string
  description?: string
  assignee?: {
    name: string
    avatar?: string
  }
  taskId?: string
}

const columns = ["To Do", "In Progress", "Code Review", "Done"]

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [filterOpen, setFilterOpen] = useState(false)

  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get("http://127.0.0.1:8000/tasks/")
      console.log("📦 Datos crudos del backend:", res.data)

      const enhancedData = res.data.map((task: Task) => {
        const normalizedStatus =
          task.status?.toLowerCase() === "in progress"
            ? "In Progress"
            : task.status?.toLowerCase() === "code review"
            ? "Code Review"
            : task.status?.toLowerCase() === "done"
            ? "Done"
            : "To Do"

        return {
          ...task,
          status: normalizedStatus,
          taskId: `TIS-${Math.floor(Math.random() * 1000)}`,
          assignee: {
            name: ["Alex", "Maria", "John", "Sara"][Math.floor(Math.random() * 4)],
            avatar: `/placeholder.svg?height=40&width=40`,
          },
        }
      })

      setTasks(enhancedData)
    } catch (err) {
      console.error("❌ Error loading tasks:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tag?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.taskId?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const groupByStatus = (status: string) =>
    filteredTasks.filter((task) => task.status.toLowerCase() === status.toLowerCase())

  const getTagColor = (tag?: string) => {
    if (!tag) return "bg-gray-200 text-gray-800"
    switch (tag.toLowerCase()) {
      case "space travel partners":
        return "bg-amber-100 text-amber-800"
      case "local mars office":
        return "bg-orange-100 text-orange-800"
      case "seespaceez plus":
        return "bg-sky-100 text-sky-800"
      case "large team support":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case "Alta":
        return <ArrowUp className="text-red-600 w-4 h-4" />
      case "Media":
        return <ArrowUp className="text-yellow-600 w-4 h-4" />
      case "Baja":
        return <ArrowDown className="text-green-600 w-4 h-4" />
      default:
        return null
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Done":
        return <CheckCircle className="text-green-500 w-4 h-4" />
      case "In Progress":
        return <Clock className="text-blue-500 w-4 h-4" />
      case "Code Review":
        return <AlertCircle className="text-purple-500 w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Task Management</h1>
          <Button variant="outline" onClick={fetchTasks} className="flex items-center gap-2" disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((status) => {
            const tasksInColumn = groupByStatus(status)
            return (
              <div key={status} className="bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                  <h2 className="font-semibold text-slate-700 flex items-center gap-2">
                    {getStatusIcon(status)}
                    {status} <span className="ml-1 text-slate-500 text-sm">{tasksInColumn.length}</span>
                  </h2>
                </div>
                <div className="p-3 flex-1 overflow-auto max-h-[calc(100vh-240px)]">
                  {isLoading ? (
                    <div className="text-center text-slate-400 text-sm">Loading...</div>
                  ) : tasksInColumn.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-sm">No tasks</div>
                  ) : (
                    <div className="space-y-3">
                      {tasksInColumn.map((task) => (
                        <div
                          key={task.id}
                          className="p-3 bg-white border border-slate-200 rounded-md hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => {
                            setSelectedTask(task)
                            setIsOpen(true)
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
                            <Badge variant="outline" className={`${getTagColor(task.tag)} text-xs font-normal mb-2`}>
                              {task.tag}
                            </Badge>
                          )}
                          <div className="flex justify-between items-center mt-3">
                            {task.estimatedTime && (
                              <div className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {task.estimatedTime}h
                              </div>
                            )}
                            {task.assignee && (
                              <div className="flex justify-end">
                                <Avatar className="w-6 h-6 border border-white">
                                  <img src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                                </Avatar>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* MODAL de detalle */}
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-md w-full p-0 max-h-[90vh] overflow-hidden">
              {selectedTask && (
                <>
                  <div className="border-b border-slate-200 p-4">
                    <div className="flex justify-between items-start">
                      <Dialog.Title className="text-lg font-semibold text-slate-800">{selectedTask.title}</Dialog.Title>
                      <Badge variant="outline" className={`${getTagColor(selectedTask.tag)}`}>
                        {selectedTask.tag}
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-500 mt-1">{selectedTask.taskId}</div>
                  </div>

                  <div className="p-4 overflow-y-auto max-h-[calc(90vh-180px)]">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Status</h3>
                        <div className="flex items-center gap-1.5">
                          {getStatusIcon(selectedTask.status)}
                          <span className="font-medium text-slate-800">{selectedTask.status}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Priority</h3>
                        <div className="flex items-center gap-1.5">
                          {getPriorityIcon(selectedTask.priority)}
                          <span className="font-medium text-slate-800">{selectedTask.priority || "None"}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Estimated Time</h3>
                        <div className="font-medium text-slate-800">
                          {selectedTask.estimatedTime ? `${selectedTask.estimatedTime} hours` : "Not set"}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Assignee</h3>
                        <div className="flex items-center gap-2">
                          {selectedTask.assignee ? (
                            <>
                              <Avatar className="w-6 h-6">
                                <img
                                  src={selectedTask.assignee.avatar || "/placeholder.svg"}
                                  alt={selectedTask.assignee.name}
                                />
                              </Avatar>
                              <span className="font-medium text-slate-800">{selectedTask.assignee.name}</span>
                            </>
                          ) : (
                            <span className="text-slate-500">Unassigned</span>
                          )}
                        </div>
                      </div>
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
                            <span>Created on {new Date(selectedTask.createdAt).toLocaleDateString()}</span>
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
                    <div className="flex gap-2">
                      <Button variant="outline">Edit</Button>
                      <Button>Update Status</Button>
                    </div>
                  </div>
                </>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  )
}