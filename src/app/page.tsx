import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Define a type for the module objects
interface Module {
  name: string;
  description: string;
}

export default function HomePage() {
  const coreModules: Module[] = [ // Added type annotation
    { name: "Form Elements", description: "Work with inputs, selects, checkboxes, radios, and text areas." },
    { name: "Tables", description: "Sortable, filterable, and editable data tables." },
    { name: "Dynamic Content", description: "Elements that appear/disappear based on interaction." },
    { name: "Dialogs & Popups", description: "Handle modal windows, alerts, and popups." },
    { name: "AJAX Requests", description: "Simulate async loading, delayed responses, and data submission." },
    { name: "Drag & Drop", description: "Draggable components and drop targets." },
    { name: "iFrames", description: "Automate interaction with embedded content." },
    { name: "Locator Strategies", description: "Target elements using a variety of locator types for robust testing." },
  ];

  const advancedModules: Module[] = [ // Added type annotation
    { name: "Authentication Flows", description: "Simulate login, sign-up, password reset, and MFA scenarios." },
    { name: "File Uploads", description: "Test uploading files and validating types/sizes." },
    { name: "Pagination", description: "Navigate and test paginated content, infinite scroll, and lazy loading." },
    { name: "Notifications", description: "Detect toasts, banners, and system messages." },
    { name: "Error Handling", description: "Validate client/server-side form errors." },
    { name: "Performance Feedback", description: "Work with loaders, spinners, and progress bars during data processing." },
    { name: "Responsive Layouts", description: "Test UI behavior on different device sizes and orientations." },
    { name: "Date & Time Pickers", description: "Select and validate input from calendars and time widgets." },
    { name: "Canvas & SVG Elements", description: "Interact with graphical charts or custom drawing elements." },
    { name: "Hover Events", description: "Trigger UI changes using mouse hover." },
    { name: "State Persistence", description: "Test session and local storage for data retention." },
  ];

  // Added type annotation for 'modules' parameter
  const renderModuleList = (modules: Module[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Added type annotation for 'mod' parameter */}
      {modules.map((mod: Module) => (
        <div
          key={mod.name}
          className="border p-4 rounded-2xl shadow hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold mb-2">{mod.name}</h3>
          <p className="text-sm text-gray-700">{mod.description}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Damian's Practice Platform for Automation Testing</h1>
      <p className="text-gray-700 mb-6">
        This site has been purpose-built to support testers, QA engineers, and developers in practicing and refining their web automation skills using industry-standard tools such as Playwright and more.
      </p>
        <p className="text-gray-700 mb-6">
        Each section of the platform simulates common UI patterns and interaction models found in real-world web applications.<br/>
        All components are fully accessible and come with consistent test IDs, ARIA attributes, and semantic HTML, ensuring seamless integration with automated testing frameworks.
      </p>

      {/* <nav className="flex flex-wrap gap-3 mb-10">
        {[...coreModules, ...advancedModules].map((mod) => (
          <a
            key={mod.name}
            href={`#${mod.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-blue-600 hover:underline text-sm"
          >
            {mod.name}
          </a>
        ))}
      </nav> */}

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Core Modules</h2>
        {renderModuleList(coreModules)}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Advanced Modules</h2>
        {renderModuleList(advancedModules)}
      </section>
    </div>
  );
}