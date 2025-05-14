"use client";

import { useState, useMemo } from "react";
// Assuming these components are correctly imported from your UI library
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// Assuming these icons are correctly imported from lucide-react
import { ChevronDownIcon, ChevronUpIcon, EditIcon, Trash2Icon, PlusCircleIcon, FileDownIcon } from "lucide-react";
// Assuming these dialog components are correctly imported from your UI library
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
// Assuming these select components are correctly imported from your UI library
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

// Import xlsx and file-saver libraries for Excel export
// Make sure you have these installed: npm install xlsx file-saver @types/file-saver
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


// Define the interface for a User object
interface User {
  id: string; // Using string for uuid
  name: string;
  email: string;
  status: "active" | "inactive" | "pending"; // Union type for status
  role: string;
  lastLogin: string; // Storing date as a string
}

// Define the interface for sorting configuration
interface SortConfig {
  key: keyof User | null; // Key to sort by, or null if no sorting
  direction: "asc" | "desc"; // Sorting direction
}

// Initial dummy user data structure
const initialUserDataStructure = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
    status: "active",
    role: "Admin",
    lastLogin: "2023-03-15" // Example date string
  },
  {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    status: "active",
    role: "Editor",
    lastLogin: "2023-03-12"
  },
  {
    name: "Michael Brown",
    email: "mbrown@example.com",
    status: "inactive",
    role: "Viewer",
    lastLogin: "2023-02-28"
  },
  {
    name: "Jessica Williams",
    email: "jwilliams@example.com",
    status: "pending",
    role: "Editor",
    lastLogin: "2023-03-14"
  },
  {
    name: "David Miller",
    email: "david@example.com",
    status: "active",
    role: "Admin",
    lastLogin: "2023-03-10"
  },
  {
    name: "Emma Davis",
    email: "emma@example.com",
    status: "inactive",
    role: "Viewer",
    lastLogin: "2023-02-15"
  },
  {
    name: "Robert Wilson",
    email: "rwilson@example.com",
    status: "active",
    role: "Editor",
    lastLogin: "2023-03-08"
  },
  {
    name: "Jennifer Taylor",
    email: "jtaylor@example.com",
    status: "pending",
    role: "Viewer",
    lastLogin: "2023-03-01"
  },
];

// Generate the initial users array ONCE when the module is loaded.
// This ensures the same IDs and lastLogin dates are used on both server and client.
const initialUsers: User[] = initialUserDataStructure.map(user => ({
    ...user,
    id: uuidv4(), // Generate UUID here
    status: user.status as "active" | "inactive" | "pending", // Cast status to the expected union type
}));


// Default form data for adding a new user (excluding auto-generated fields)
const defaultNewUserFormData: Omit<User, 'id' | 'lastLogin'> = {
  name: "",
  email: "",
  status: "active", // Default status
  role: "",
};

// Main component for the Tables Page
export default function TablesPage() {
  // State for the list of users, initialized with the consistently generated data
  const [users, setUsers] = useState<User[]>(initialUsers);
  // State for sorting configuration
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
  // State for the search input term
  const [searchTerm, setSearchTerm] = useState("");
  // State for tracking selected row IDs
  const [selectedRows, setSelectedRows] = useState<string[]>([]); // Use string for uuid
  // State for controlling the Add User modal visibility
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // State for the form data in the Add User modal
  const [newUserFormData, setNewUserFormData] = useState(defaultNewUserFormData);
  // State for controlling the Edit User modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // State for the user currently being edited
  const [editingUser, setEditingUser] = useState<User | null>(null);
  // State for the form data in the Edit User modal (excluding ID and lastLogin)
  const [editFormData, setEditFormData] = useState<Omit<User, 'id' | 'lastLogin'> | null>(null); // Don't edit ID or lastLogin directly

  // Handler for sorting column headers
  const handleSort = (key: keyof User) => {
    let direction: "asc" | "desc" = "asc";

    // If currently sorting by the same key, toggle direction
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    // Update sort configuration state
    setSortConfig({ key, direction });
  };

  // Memoized list of users after sorting and filtering
  // This prevents unnecessary re-sorting/filtering on every render
  const sortedAndFilteredUsers = useMemo(() => {
    const sortableUsers = [...users]; // Create a mutable copy

    // Apply sorting if a sort key is set
    if (sortConfig.key) {
      sortableUsers.sort((a, b) => {
        const aValue = a[sortConfig.key!]; // Get value for sorting from user a
        const bValue = b[sortConfig.key!]; // Get value for sorting from user b

        // Handle potential null or undefined values if keys could have them
        // This ensures consistent sorting behavior
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return sortConfig.direction === "asc" ? -1 : 1; // Nulls first in asc, last in desc
        if (bValue == null) return sortConfig.direction === "asc" ? 1 : -1; // Nulls last in asc, first in desc


        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0; // Values are equal
      });
    }

    // Apply filtering based on the search term
    return sortableUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.status.toLowerCase().includes(searchTerm.toLowerCase()) // Also allow filtering by status
    );
  }, [users, sortConfig, searchTerm]); // Dependencies: re-run memoization if these states change

  // Handler for selecting/deselecting a single row
  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) => {
      if (prev.includes(id)) {
        // If already selected, remove it
        return prev.filter((rowId) => rowId !== id);
      } else {
        // If not selected, add it
        return [...prev, id];
      }
    });
  };

  // Handler for selecting/deselecting all visible rows
  const handleSelectAll = () => {
    // If all currently filtered/sorted users are selected, deselect all
    if (selectedRows.length === sortedAndFilteredUsers.length && sortedAndFilteredUsers.length > 0) {
      setSelectedRows([]);
    } else {
      // Otherwise, select all currently filtered/sorted users
      setSelectedRows(sortedAndFilteredUsers.map((user) => user.id));
    }
  };

  // Handler for deleting selected users
  const handleDeleteSelected = () => {
    // Filter out users whose IDs are in the selectedRows array
    setUsers(users.filter(user => !selectedRows.includes(user.id)));
    setSelectedRows([]); // Clear selection after deletion
  };

  // Handler for input changes in the Add User modal form
  // Handles both regular inputs and Select components
  const handleNewInputChange = (e: React.ChangeEvent<HTMLInputElement> | string, field?: keyof Omit<User, 'id' | 'lastLogin'>) => {
    if (typeof e === 'string' && field) { // Handle Select component change (value and field key passed)
      setNewUserFormData({ ...newUserFormData, [field]: e as "active" | "inactive" | "pending" }); // Cast value for status field
    } else if (typeof e !== 'string' && e.target) { // Handle regular input change (event object)
       const { name, value } = e.target;
       setNewUserFormData({ ...newUserFormData, [name]: value });
    }
  };

  // Handler for adding a new user
  const handleAddUser = () => {
    // Basic front-end validation for required fields
    if (!newUserFormData.name || !newUserFormData.email || !newUserFormData.role) {
        // Using alert for simple feedback, consider a more integrated UI message
        alert("Name, Email, and Role are required.");
        return;
    }
    // Create the new user object with a unique ID and current date for lastLogin
    const newUser: User = {
      id: uuidv4(),
      ...newUserFormData, // Spread form data
      lastLogin: new Date().toISOString().split('T')[0], // Set current date (YYYY-MM-DD)
    };
    // Add the new user to the users state
    setUsers([...users, newUser]);
    setIsAddModalOpen(false); // Close the modal
    setNewUserFormData(defaultNewUserFormData); // Reset the form data
  };

  // Handler for clicking the Edit button on a user row
  const handleEditClick = (user: User) => {
    setEditingUser(user); // Set the user being edited
    // Prepare form data for the edit modal, excluding ID and lastLogin
    const editableData: Omit<User, 'id' | 'lastLogin'> = {
      name: user.name,
      email: user.email,
      status: user.status,
      role: user.role,
    };
    setEditFormData(editableData); // Set the form data state
    setIsEditModalOpen(true); // Open the edit modal
  };

  // Handler for input changes in the Edit User modal form
  // Handles both regular inputs and Select components
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement> | string, field?: keyof Omit<User, 'id' | 'lastLogin'>) => {
      if (editFormData === null) return; // Prevent updates if editFormData is null

      if (typeof e === 'string' && field) { // Handle Select component change
           // Update the specific field in editFormData
          setEditFormData({ ...editFormData, [field]: e as "active" | "inactive" | "pending" }); // Cast value for status field
      } else if (typeof e !== 'string' && e.target) { // Handle regular input change
           const { name, value } = e.target;
           // Update the specific field in editFormData
           setEditFormData({ ...editFormData, [name]: value });
      }
    };

  // Handler for saving changes from the Edit User modal
  const handleSaveEdit = () => {
    // Ensure a user is being edited and form data exists
    if (!editingUser || !editFormData) return;

      // Basic front-end validation for required fields
      if (!editFormData.name || !editFormData.email || !editFormData.role) {
           // Using alert for simple feedback, consider a more integrated UI message
           alert("Name, Email, and Role are required.");
           return;
      }

    // Create a new array of users with the updated user data
    const updatedUsers = users.map(user =>
      user.id === editingUser.id ? { ...user, ...editFormData } : user // Merge existing user data with edited form data
    );
    setUsers(updatedUsers); // Update the users state
    setIsEditModalOpen(false); // Close the modal
    setEditingUser(null); // Clear the editing user state
    setEditFormData(null); // Clear the edit form data state
  };

  // Handler for exporting selected users to an Excel file
  const handleExportSelected = () => {
        // Check if any rows are selected
        if (selectedRows.length === 0) {
            // Using alert for simple feedback, consider a more integrated UI message
            alert("No rows selected for export.");
            return;
        }

        // Filter the original users list to get only the selected ones
        const usersToExport = users.filter(user => selectedRows.includes(user.id));

        // Prepare data in a format suitable for XLSX (array of objects)
        const dataForSheet = usersToExport.map(user => ({
            ID: user.id, // Include full ID
            Name: user.name,
            Email: user.email,
            Status: user.status,
            Role: user.role,
            'Last Login': user.lastLogin, // Use string key for headers with spaces
        }));

        // Create a new worksheet from the JSON data
        const worksheet = XLSX.utils.json_to_sheet(dataForSheet);

        // Create a new workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Users"); // Name the sheet

        // Generate the XLSX file data as an array buffer
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Create a Blob object from the array buffer
        const data = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' // MIME type for XLSX
        });
        // Use file-saver to save the Blob as a file
        saveAs(data, 'selected_users.xlsx'); // Specify the filename
  };


  // Helper component for sortable table headers
  const SortableHeader = ({ column, label }: { column: keyof User; label: string }) => (
    <TableHead
      className="cursor-pointer hover:bg-zinc-100 transition-colors"
      onClick={() => handleSort(column)} // Call handleSort on click
      data-testid={`sort-header-${column}`}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        {/* Display sort icon based on current sort configuration */}
        {sortConfig.key === column ? (
          sortConfig.direction === "asc" ? (
            <ChevronUpIcon className="h-4 w-4" /> // Up arrow for ascending
          ) : (
            <ChevronDownIcon className="h-4 w-4" /> // Down arrow for descending
          )
        ) : (
          // Show a default or indication that it's sortable when not actively sorted
           <ChevronUpIcon className="h-4 w-4 opacity-50" /> // Faded arrow, or could use a sort icon with up/down arrows
        )}
      </div>
    </TableHead>
  );

  // Styles for user status badges
  const statusStyles = {
    active: "bg-green-100 text-green-800 border-green-200",
    inactive: "bg-red-100 text-red-800 border-red-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };

  return (
    // Main container for the page with spacing
    <div className="space-y-8" data-testid="tables-page">
      {/* Page Title and Description */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight" data-testid="page-title">Tables</h1>
        <p className="text-sm text-zinc-500" data-testid="page-description">
          Manage users with add, edit, delete, and export functionality.
        </p>
      </div>

      {/* Card containing the user table and controls */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            A sortable and filterable user table with add, edit, delete, and export actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search input and action buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0"> {/* Added responsive flex and spacing */}
              {/* Search Input */}
              <Input
                placeholder="Search users..."
                className="max-w-sm w-full sm:w-auto" // Added responsive width
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="user-search"
              />
              {/* Action Buttons */}
              <div className="space-x-2 flex items-center w-full sm:w-auto justify-end"> {/* Added flex, items-center, and justify-end */}
                {/* Add User Button */}
                <Button
                    size="sm"
                    onClick={() => setIsAddModalOpen(true)}
                    data-testid="add-user-button"
                >
                    <PlusCircleIcon className="mr-2 h-4 w-4" /> Add User
                </Button>
                {/* Delete Selected Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDeleteSelected}
                  disabled={selectedRows.length === 0} // Disable if no rows are selected
                  data-testid="delete-selected"
                >
                   <Trash2Icon className="mr-2 h-4 w-4" /> Delete Selected ({selectedRows.length})
                </Button>
                {/* Export Selected Button */}
                <Button
                    size="sm"
                    onClick={handleExportSelected} // Connect to the export function
                    disabled={selectedRows.length === 0} // Disable if no rows are selected
                    data-testid="export-selected"
                >
                    <FileDownIcon className="mr-2 h-4 w-4" /> Export Selected
                </Button>
              </div>
            </div>

            {/* User Table */}
            <div className="rounded-md border overflow-x-auto"> {/* Added overflow-x-auto for responsiveness */}
              <Table data-testid="users-table">
                <TableHeader>
                  <TableRow>
                    {/* Checkbox column for row selection */}
                    <TableHead className="w-10">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          // Check if all visible rows are selected
                          checked={
                              sortedAndFilteredUsers.length > 0 &&
                              selectedRows.length === sortedAndFilteredUsers.length
                          }
                          onChange={handleSelectAll} // Handle select all/none
                          className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500" // Added styling
                          data-testid="select-all"
                        />
                      </div>
                    </TableHead>
                    {/* Sortable Headers - Removed whitespace between these */}
                    <SortableHeader column="id" label="ID" /><SortableHeader column="name" label="Name" /><SortableHeader column="email" label="Email" /><SortableHeader column="status" label="Status" /><SortableHeader column="role" label="Role" /><SortableHeader column="lastLogin" label="Last Login" />
                    {/* Actions Header */}
                    <TableHead className="w-20 text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Conditional rendering for empty states */}
                  {sortedAndFilteredUsers.length === 0 && searchTerm === "" && users.length > 0 ? (
                       // Message when no users are added yet
                      <TableRow>
                         <TableCell
                            colSpan={8} // Span across all columns
                            className="h-24 text-center text-zinc-500"
                            data-testid="empty-table"
                         >
                            No users added yet.
                         </TableCell>
                      </TableRow>
                    ) : sortedAndFilteredUsers.length === 0 ? (
                      // Message when no results match the search term
                      <TableRow>
                        <TableCell
                          colSpan={8} // Span across all columns
                          className="h-24 text-center text-zinc-500" // Added text color
                          data-testid="no-results"
                        >
                          No results found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      // Render rows for filtered and sorted users
                      sortedAndFilteredUsers.map((user) => (
                        <TableRow
                          key={user.id}
                          className={selectedRows.includes(user.id) ? "bg-zinc-50" : ""} // Highlight selected rows
                          data-testid={`user-row-${user.id}`}
                        >
                          {/* Checkbox cell */}
                          <TableCell>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(user.id)} // Check if row is selected
                                onChange={() => handleSelectRow(user.id)} // Handle single row selection
                                className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500" // Added styling
                                data-testid={`select-user-${user.id}`}
                              />
                            </div>
                          </TableCell>
                          {/* User data cells - Removed whitespace between these */}
                          <TableCell className="p-2 align-middle text-sm text-gray-700" data-testid={`user-id-${user.id}`}>{user.id.substring(0, 8)}...</TableCell><TableCell className="p-2 align-middle font-medium text-gray-900" data-testid={`user-name-${user.id}`}>
                            {user.name}
                          </TableCell><TableCell className="p-2 align-middle text-sm text-gray-700" data-testid={`user-email-${user.id}`}>{user.email}</TableCell><TableCell className="p-2 align-middle">
                            <span
                              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                                 statusStyles[user.status] // Apply status-specific styles
                              } border`} // Ensure border is applied
                              data-testid={`user-status-${user.id}`}
                            >
                              {user.status}
                            </span>
                          </TableCell><TableCell className="p-2 align-middle text-sm text-gray-700" data-testid={`user-role-${user.id}`}>{user.role}</TableCell><TableCell className="p-2 align-middle text-sm text-gray-700" data-testid={`user-last-login-${user.id}`}>{user.lastLogin}</TableCell>
                          {/* Actions cell (Edit button) */}
                          <TableCell className="text-center p-2 align-middle">
                               <Button
                                  variant="ghost" // Ghost variant for minimal styling
                                  size="sm" // Small size button
                                  onClick={() => handleEditClick(user)} // Open edit modal with user data
                                  data-testid={`edit-user-${user.id}`}
                                  aria-label={`Edit user ${user.name}`} // Accessible label
                               >
                                  <EditIcon className="h-4 w-4" /> {/* Edit icon */}
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

      {/* Add User Dialog Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px]"> {/* Set max width */}
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Enter the details for the new user. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4"> {/* Grid layout for form fields */}
            {/* Name Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={newUserFormData.name}
                onChange={handleNewInputChange} // Use the unified input change handler
                className="col-span-3"
                data-testid="add-user-name"
                required // HTML required attribute
              />
            </div>
            {/* Email Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email" // Specify email type
                value={newUserFormData.email}
                onChange={handleNewInputChange} // Use the unified input change handler
                className="col-span-3"
                data-testid="add-user-email"
                required
              />
            </div>
            {/* Status Select */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
               <Select
                 value={newUserFormData.status}
                 // onValueChange calls handleNewInputChange with value and field key
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
             {/* Role Input */}
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Input
                id="role"
                name="role"
                value={newUserFormData.role}
                onChange={handleNewInputChange} // Use the unified input change handler
                className="col-span-3"
                data-testid="add-user-role"
                required
              />
            </div>
             {/* Last Login is auto-generated on add, not in form */}
          </div>
          <DialogFooter>
            {/* Cancel Button */}
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            {/* Save User Button */}
            <Button type="submit" onClick={handleAddUser} data-testid="add-user-save">Save User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog Modal */}
       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
           <DialogContent className="sm:max-w-[425px]"> {/* Set max width */}
             <DialogHeader>
               <DialogTitle>Edit User</DialogTitle>
               <DialogDescription>
                 Edit the details for the user. Click save when you're done.
               </DialogDescription>
             </DialogHeader>
             {/* Render form only if a user is selected for editing and form data exists */}
             {editingUser && editFormData && (
               <div className="grid gap-4 py-4"> {/* Grid layout for form fields */}
                 {/* Name Input */}
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="edit-name" className="text-right">
                     Name
                   </Label>
                   <Input
                     id="edit-name"
                     name="name"
                     value={editFormData.name}
                     onChange={handleEditInputChange} // Use the unified edit input change handler
                     className="col-span-3"
                     data-testid="edit-user-name"
                     required
                   />
                 </div>
                 {/* Email Input */}
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="edit-email" className="text-right">
                     Email
                   </Label>
                   <Input
                     id="edit-email"
                     name="email"
                     type="email" // Specify email type
                     value={editFormData.email}
                     onChange={handleEditInputChange} // Use the unified edit input change handler
                     className="col-span-3"
                     data-testid="edit-user-email"
                     required
                   />
                 </div>
                 {/* Status Select */}
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="edit-status" className="text-right">
                     Status
                   </Label>
                    <Select
                      value={editFormData.status}
                      // onValueChange calls handleEditInputChange with value and field key
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
                  {/* Role Input */}
                  <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="edit-role" className="text-right">
                     Role
                   </Label>
                   <Input
                     id="edit-role"
                     name="role"
                     value={editFormData.role}
                     onChange={handleEditInputChange} // Use the unified edit input change handler
                     className="col-span-3"
                     data-testid="edit-user-role"
                     required
                   />
                 </div>
                  {/* Last Login (Read-only) */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-lastLogin" className="text-right">
                      Last Login
                    </Label>
                    <Input
                      id="edit-lastLogin"
                      value={editingUser.lastLogin} // Display last login from the original user object
                      className="col-span-3"
                      disabled // Make last login read-only
                      data-testid="edit-user-last-login"
                    />
                  </div>
                </div>
              )}
              <DialogFooter>
                {/* Cancel Button */}
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                {/* Save Changes Button */}
                <Button type="submit" onClick={handleSaveEdit} data-testid="edit-user-save">Save Changes</Button>
              </DialogFooter>
            </DialogContent>
       </Dialog>

    </div>
  );
}