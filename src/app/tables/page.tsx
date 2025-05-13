"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDownIcon, ChevronUpIcon, EditIcon, Trash2Icon, PlusCircleIcon, FileDownIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { v4 as uuidv4 } from 'uuid';

// Import xlsx and file-saver
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


interface User {
  id: string; // Using string for uuid
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  role: string;
  lastLogin: string;
}

interface SortConfig {
  key: keyof User | null;
  direction: "asc" | "desc";
}

const initialUsers: User[] = [
  {
    id: uuidv4(), // Use uuid
    name: "John Smith",
    email: "john.smith@example.com",
    status: "active",
    role: "Admin",
    lastLogin: "2023-03-15"
  },
  {
    id: uuidv4(),
    name: "Sarah Johnson",
    email: "sarah@example.com",
    status: "active",
    role: "Editor",
    lastLogin: "2023-03-12"
  },
  {
    id: uuidv4(),
    name: "Michael Brown",
    email: "mbrown@example.com",
    status: "inactive",
    role: "Viewer",
    lastLogin: "2023-02-28"
  },
  {
    id: uuidv4(),
    name: "Jessica Williams",
    email: "jwilliams@example.com",
    status: "pending",
    role: "Editor",
    lastLogin: "2023-03-14"
  },
  {
    id: uuidv4(),
    name: "David Miller",
    email: "david@example.com",
    status: "active",
    role: "Admin",
    lastLogin: "2023-03-10"
  },
  {
    id: uuidv4(),
    name: "Emma Davis",
    email: "emma@example.com",
    status: "inactive",
    role: "Viewer",
    lastLogin: "2023-02-15"
  },
  {
    id: uuidv4(),
    name: "Robert Wilson",
    email: "rwilson@example.com",
    status: "active",
    role: "Editor",
    lastLogin: "2023-03-08"
  },
  {
    id: uuidv4(),
    name: "Jennifer Taylor",
    email: "jtaylor@example.com",
    status: "pending",
    role: "Viewer",
    lastLogin: "2023-03-01"
  },
];

const defaultNewUserFormData: Omit<User, 'id' | 'lastLogin'> = {
  name: "",
  email: "",
  status: "active",
  role: "",
};

export default function TablesPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]); // Use string for uuid
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUserFormData, setNewUserFormData] = useState(defaultNewUserFormData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState<Omit<User, 'id' | 'lastLogin'> | null>(null); // Don't edit ID or lastLogin directly

  const handleSort = (key: keyof User) => {
    let direction: "asc" | "desc" = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  // Use useMemo to avoid re-sorting and filtering on every render
  const sortedAndFilteredUsers = useMemo(() => {
    const sortableUsers = [...users];

    // Sorting
    if (sortConfig.key) {
      sortableUsers.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        // Handle potential null or undefined values if keys could have them
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return sortConfig.direction === "asc" ? -1 : 1;
        if (bValue == null) return sortConfig.direction === "asc" ? 1 : -1;


        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    // Filtering
    return sortableUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.status.toLowerCase().includes(searchTerm.toLowerCase()) // Also allow filtering by status
    );
  }, [users, sortConfig, searchTerm]); // Dependencies for memoization

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.length === sortedAndFilteredUsers.length && sortedAndFilteredUsers.length > 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sortedAndFilteredUsers.map((user) => user.id));
    }
  };

  const handleDeleteSelected = () => {
    setUsers(users.filter(user => !selectedRows.includes(user.id)));
    setSelectedRows([]); // Clear selection after deletion
  };

  const handleNewInputChange = (e: React.ChangeEvent<HTMLInputElement> | string, field?: keyof Omit<User, 'id' | 'lastLogin'>) => {
    if (typeof e === 'string' && field) { // Handle Select component change
      setNewUserFormData({ ...newUserFormData, [field]: e as "active" | "inactive" | "pending" }); // Cast for status
    } else if (typeof e !== 'string' && e.target) { // Handle regular input change
       const { name, value } = e.target;
       setNewUserFormData({ ...newUserFormData, [name]: value });
    }
  };

  const handleAddUser = () => {
    if (!newUserFormData.name || !newUserFormData.email || !newUserFormData.role) {
        // Basic validation
        alert("Name, Email, and Role are required.");
        return;
    }
    const newUser: User = {
      id: uuidv4(),
      ...newUserFormData,
      lastLogin: new Date().toISOString().split('T')[0], // Set current date as last login
    };
    setUsers([...users, newUser]);
    setIsAddModalOpen(false);
    setNewUserFormData(defaultNewUserFormData); // Reset form
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    // Spread user data, but omit id and lastLogin for the editable form state
    const editableData: Omit<User, 'id' | 'lastLogin'> = {
      name: user.name,
      email: user.email,
      status: user.status,
      role: user.role,
    };
    setEditFormData(editableData);
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement> | string, field?: keyof Omit<User, 'id' | 'lastLogin'>) => {
      if (editFormData === null) return;

      if (typeof e === 'string' && field) { // Handle Select component change
         setEditFormData({ ...editFormData, [field]: e as "active" | "inactive" | "pending" }); // Cast e to the correct type
      } else if (typeof e !== 'string' && e.target) { // Handle regular input change
         const { name, value } = e.target;
         setEditFormData({ ...editFormData, [name]: value });
      }
    };


  const handleSaveEdit = () => {
    if (!editingUser || !editFormData) return;

      if (!editFormData.name || !editFormData.email || !editFormData.role) {
         // Basic validation
         alert("Name, Email, and Role are required.");
         return;
     }

    const updatedUsers = users.map(user =>
      user.id === editingUser.id ? { ...user, ...editFormData } : user
    );
    setUsers(updatedUsers);
    setIsEditModalOpen(false);
    setEditingUser(null);
    setEditFormData(null);
  };

  // New function to handle export
  const handleExportSelected = () => {
       if (selectedRows.length === 0) {
           alert("No rows selected for export.");
           return;
       }

       // Filter users to get only the selected ones
       const usersToExport = users.filter(user => selectedRows.includes(user.id));

       // Prepare data for the spreadsheet
       const dataForSheet = usersToExport.map(user => ({
           ID: user.id, // Include full ID in data
           Name: user.name,
           Email: user.email,
           Status: user.status,
           Role: user.role,
           'Last Login': user.lastLogin, // Use string key for headers with spaces
       }));

       // Create a worksheet from the JSON data
       const worksheet = XLSX.utils.json_to_sheet(dataForSheet);

       // Create a new workbook and append the worksheet
       const workbook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Users"); // Sheet name

       // Generate the XLSX file data
       const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

       // Create a Blob and save the file
       const data = new Blob([excelBuffer], {
           type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
       });
       saveAs(data, 'selected_users.xlsx'); // Filename
  };


  const SortableHeader = ({ column, label }: { column: keyof User; label: string }) => (
    <TableHead
      className="cursor-pointer hover:bg-zinc-100 transition-colors"
      onClick={() => handleSort(column)}
      data-testid={`sort-header-${column}`}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        {sortConfig.key === column ? (
          sortConfig.direction === "asc" ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )
        ) : (
          // Show a default or indication that it's sortable
           <ChevronUpIcon className="h-4 w-4 opacity-50" /> // Or another icon/no icon
        )}
      </div>
    </TableHead>
  );

  const statusStyles = {
    active: "bg-green-100 text-green-800 border-green-200",
    inactive: "bg-red-100 text-red-800 border-red-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };

  return (
    <div className="space-y-8" data-testid="tables-page">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" data-testid="page-title">Tables</h1>
        <p className="text-sm text-zinc-500" data-testid="page-description">
          Manage users with add, edit, and delete functionality.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            A sortable and filterable user table with add, edit, delete, and export actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center"> {/* Added items-center */}
              <Input
                placeholder="Search users..."
                className="max-w-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="user-search"
              />
              <div className="space-x-2 flex items-center"> {/* Added flex items-center */}
                <Button
                    size="sm"
                    onClick={() => setIsAddModalOpen(true)}
                    data-testid="add-user-button"
                >
                    <PlusCircleIcon className="mr-2 h-4 w-4" /> Add User
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDeleteSelected}
                  disabled={selectedRows.length === 0}
                  data-testid="delete-selected"
                >
                   <Trash2Icon className="mr-2 h-4 w-4" /> Delete Selected ({selectedRows.length})
                </Button>
                {/* Updated Export Selected button */}
                <Button
                  size="sm"
                  onClick={handleExportSelected} // Connect to the new function
                  disabled={selectedRows.length === 0}
                  data-testid="export-selected"
                >
                   <FileDownIcon className="mr-2 h-4 w-4" /> Export Selected
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table data-testid="users-table">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={
                              sortedAndFilteredUsers.length > 0 &&
                              selectedRows.length === sortedAndFilteredUsers.length
                          }
                          onChange={handleSelectAll}
                          className="h-4 w-4 rounded border-zinc-300"
                          data-testid="select-all"
                        />
                      </div>
                    </TableHead>
                    <SortableHeader column="id" label="ID" />
                    <SortableHeader column="name" label="Name" />
                    <SortableHeader column="email" label="Email" />
                    <SortableHeader column="status" label="Status" />
                    <SortableHeader column="role" label="Role" />
                    <SortableHeader column="lastLogin" label="Last Login" />
                    <TableHead className="w-20 text-center">Actions</TableHead> {/* Actions Column */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedAndFilteredUsers.length === 0 && searchTerm === "" && users.length > 0 ? (
                     <TableRow>
                       <TableCell
                         colSpan={8}
                         className="h-24 text-center text-zinc-500"
                         data-testid="empty-table"
                       >
                         No users added yet.
                       </TableCell>
                     </TableRow>
                   ) : sortedAndFilteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8} // Increased colspan for the new column
                        className="h-24 text-center"
                        data-testid="no-results"
                      >
                        No results found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedAndFilteredUsers.map((user) => (
                      <TableRow
                        key={user.id}
                        className={selectedRows.includes(user.id) ? "bg-zinc-50" : ""}
                        data-testid={`user-row-${user.id}`}
                      >
                        {/* Using native <td> for data cells */}
                        <TableCell> {/* Keep TableCell for checkbox if it has specific styling */}
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(user.id)}
                              onChange={() => handleSelectRow(user.id)}
                              className="h-4 w-4 rounded border-zinc-300"
                              data-testid={`select-user-${user.id}`}
                            />
                          </div>
                        </TableCell>
                        {/* Use native <td> elements for data */}
                        <td className="p-2 align-middle" data-testid={`user-id-${user.id}`}>{user.id.substring(0, 8)}...</td>
                        <td className="p-2 align-middle font-medium" data-testid={`user-name-${user.id}`}>
                          {user.name}
                        </td>
                        <td className="p-2 align-middle" data-testid={`user-email-${user.id}`}>{user.email}</td>
                        <td className="p-2 align-middle">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                              statusStyles[user.status]
                            }`}
                            data-testid={`user-status-${user.id}`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="p-2 align-middle" data-testid={`user-role-${user.id}`}>{user.role}</td>
                        <td className="p-2 align-middle" data-testid={`user-last-login-${user.id}`}>{user.lastLogin}</td>
                        <TableCell className="text-center"> {/* Keep TableCell for action button if it has specific styling */}
                           <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditClick(user)}
                              data-testid={`edit-user-${user.id}`}
                              aria-label={`Edit user ${user.name}`}
                           >
                              <EditIcon className="h-4 w-4" />
                           </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Enter the details for the new user. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={newUserFormData.name}
                onChange={handleNewInputChange}
                className="col-span-3"
                data-testid="add-user-name"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newUserFormData.email}
                onChange={handleNewInputChange}
                className="col-span-3"
                data-testid="add-user-email"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
               <Select
                 value={newUserFormData.status}
                 onValueChange={(value: "active" | "inactive" | "pending") => handleNewInputChange(value, 'status')}
               >
                 <SelectTrigger className="col-span-3" data-testid="add-user-status-trigger">
                    <SelectValue placeholder="Select status" />
                 </SelectTrigger>
                 <SelectContent data-testid="add-user-status-content">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                 </SelectContent>
               </Select>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Input
                id="role"
                name="role"
                value={newUserFormData.role}
                onChange={handleNewInputChange}
                className="col-span-3"
                data-testid="add-user-role"
                required
              />
            </div>
             {/* Last Login is auto-generated on add */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleAddUser} data-testid="add-user-save">Save User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Edit the details for the user. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            {editingUser && editFormData && ( // Only render form if user is selected for editing
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditInputChange}
                    className="col-span-3"
                    data-testid="edit-user-name"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    value={editFormData.email}
                    onChange={handleEditInputChange}
                    className="col-span-3"
                    data-testid="edit-user-email"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right">
                    Status
                  </Label>
                   <Select
                     value={editFormData.status}
                     onValueChange={(value: "active" | "inactive" | "pending") => handleEditInputChange(value, 'status')}
                   >
                     <SelectTrigger className="col-span-3" data-testid="edit-user-status-trigger">
                        <SelectValue placeholder="Select status" />
                     </SelectTrigger>
                     <SelectContent data-testid="edit-user-status-content">
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                     </SelectContent>
                   </Select>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-role" className="text-right">
                    Role
                  </Label>
                  <Input
                    id="edit-role"
                    name="role"
                    value={editFormData.role}
                    onChange={handleEditInputChange}
                    className="col-span-3"
                    data-testid="edit-user-role"
                    required
                  />
                </div>
                {/* Last Login is read-only */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-lastLogin" className="text-right">
                    Last Login
                  </Label>
                  <Input
                    id="edit-lastLogin"
                    value={editingUser.lastLogin}
                    className="col-span-3"
                    disabled // Make last login read-only
                    data-testid="edit-user-last-login"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
              <Button type="submit" onClick={handleSaveEdit} data-testid="edit-user-save">Save Changes</Button>
            </DialogFooter>
          </DialogContent>
       </Dialog>

    </div>
  );
}
