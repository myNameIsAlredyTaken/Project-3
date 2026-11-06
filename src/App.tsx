import { FormEvent, ReactNode, useEffect, useState } from "react";

type StudentPage = "home" | "tasks" | "reports";
type Status = "Received" | "In progress" | "Resolved";
type Role = "student" | "management" | null;

type Task = {
  id: number;
  title: string;
  detail: string;
  due: string;
  category: "Cleaning" | "Garbage";
  completed: boolean;
};

type Report = {
  id: number;
  title: string;
  description: string;
  house: string;
  room: string;
  submitted: string;
  status: Status;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Clean the kitchen",
    detail: "Wipe surfaces, clean the sink and sweep the floor.",
    due: "Today",
    category: "Cleaning",
    completed: false,
  },
  {
    id: 2,
    title: "Take out the garbage",
    detail: "Empty the kitchen bins and take recycling outside.",
    due: "Tomorrow",
    category: "Garbage",
    completed: false,
  },
  {
    id: 3,
    title: "Vacuum the living room",
    detail: "Vacuum the rug and the space around the sofa.",
    due: "Completed Monday",
    category: "Cleaning",
    completed: true,
  },
];

const initialReports: Report[] = [
  {
    id: 101,
    title: "Leaking kitchen tap",
    description: "The kitchen tap keeps dripping even when it is fully closed.",
    house: "Maple House",
    room: "Kitchen",
    submitted: "Today, 09:42",
    status: "In progress",
  },
  {
    id: 102,
    title: "Hallway light not working",
    description: "The light by the front door has stopped working.",
    house: "Oak House",
    room: "Ground floor hallway",
    submitted: "Yesterday, 16:15",
    status: "Received",
  },
  {
    id: 103,
    title: "Bedroom radiator is cold",
    description: "The radiator does not warm up when the heating is on.",
    house: "Maple House",
    room: "Room 3B",
    submitted: "12 Feb, 11:20",
    status: "Resolved",
  },
];

function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const paths: Record<string, ReactNode> = {
    home: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
    clipboard: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4.5V3h6v1.5M9 9h6M9 13h6M9 17h4" />
      </>
    ),
    wrench: (
      <>
        <path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5l-8.6 8.6a2.1 2.1 0 0 0 3 3l8.6-8.6a4 4 0 0 0 5-5L18 6l-2.4 2.4-2-2Z" />
      </>
    ),
    building: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5M15 12H3" />
        <path d="M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    arrow: <path d="m9 18 6-6-6-6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 8v6M22 11h-6" />
      </>
    ),
    chevron: <path d="m6 9 6 6 6-6" />,
    close: <path d="M18 6 6 18M6 6l12 12" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    spark: (
      <>
        <path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" />
        <path d="m18.5 14 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name]}
    </svg>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-10 shrink-0 place-items-center rounded-[13px] bg-teal-700 text-white shadow-sm">
        <Icon name="home" size={21} />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className="font-semibold tracking-[-0.02em] text-slate-900">Smart Student</p>
          <p className="text-sm text-slate-500">Housing</p>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const styles = {
    Received: "bg-amber-50 text-amber-800 ring-amber-200",
    "In progress": "bg-blue-50 text-blue-800 ring-blue-200",
    Resolved: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl md:bottom-7">
      <span className="grid size-6 place-items-center rounded-full bg-emerald-400 text-slate-900">
        <Icon name="check" size={15} />
      </span>
      <span className="whitespace-nowrap">{message}</span>
    </div>
  );
}

function Login({ onEnter }: { onEnter: (role: Exclude<Role, null>) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    onEnter("student");
  };

  return (
    <main className="min-h-screen bg-[#f5f8f7] lg:grid lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden min-h-screen overflow-hidden bg-teal-900 p-12 text-white lg:flex lg:flex-col">
        <div className="absolute inset-0 opacity-[0.13] login-pattern" />
        <div className="relative z-10">
          <Logo />
        </div>
        <div className="relative z-10 my-auto max-w-xl pb-16">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-sm text-teal-50">
            <Icon name="spark" size={17} />
            Shared living, made simpler
          </div>
          <h1 className="max-w-lg text-5xl font-semibold leading-[1.08] tracking-[-0.045em]">
            A better way to look after your shared home.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-teal-100/80">
            Stay on top of shared tasks, report issues quickly and keep everyone in the loop.
          </p>
          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            {[
              ["clipboard", "Shared tasks"],
              ["wrench", "Quick reports"],
              ["users", "Better teamwork"],
            ].map(([icon, text]) => (
              <div
                key={text}
                className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 text-sm text-teal-50"
              >
                <Icon name={icon} size={21} className="mb-3 text-teal-300" />
                {text}
              </div>
            ))}
          </div>
        </div>
        <p className="relative z-10 text-xs text-teal-200/50">
          Student housing, thoughtfully managed.
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden">
            <Logo />
          </div>
          <p className="mb-2 text-sm font-semibold text-teal-700">WELCOME BACK</p>
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-slate-900">
            Sign in to your home
          </h2>
          <p className="mt-3 text-slate-500">Use your housing account to continue.</p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Email address</span>
              <span className="relative block">
                <Icon
                  name="mail"
                  size={19}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  className="field pl-11"
                  type="email"
                  value={email}
                  placeholder="you@student.edu"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </span>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
              <span className="relative block">
                <Icon
                  name="lock"
                  size={19}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  className="field px-11"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <button
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-700"
                  type="button"
                  aria-label="Show password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon name="eye" size={19} />
                </button>
              </span>
            </label>
            <button className="primary-button w-full" type="submit">
              Sign in
            </button>
          </form>

          <div className="my-7 flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-slate-400">
            <span className="h-px flex-1 bg-slate-200" /> Explore the prototype{" "}
            <span className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button className="demo-button" onClick={() => onEnter("student")}>
              <span className="demo-icon bg-teal-50 text-teal-700">
                <Icon name="home" size={19} />
              </span>
              <span className="text-left">
                <strong>Student view</strong>
                <small>Tasks & reports</small>
              </span>
              <Icon name="arrow" size={17} className="ml-auto text-slate-400" />
            </button>
            <button className="demo-button" onClick={() => onEnter("management")}>
              <span className="demo-icon bg-indigo-50 text-indigo-700">
                <Icon name="building" size={19} />
              </span>
              <span className="text-left">
                <strong>Management</strong>
                <small>Manage reports</small>
              </span>
              <Icon name="arrow" size={17} className="ml-auto text-slate-400" />
            </button>
          </div>
          <p className="mt-6 text-center text-xs leading-5 text-slate-400">
            Demo only — no account or personal data is required.
          </p>
        </div>
      </section>
    </main>
  );
}

function StudentShell({
  page,
  setPage,
  logout,
  children,
}: {
  page: StudentPage;
  setPage: (page: StudentPage) => void;
  logout: () => void;
  children: ReactNode;
}) {
  const items: { key: StudentPage; label: string; icon: string }[] = [
    { key: "home", label: "Home", icon: "home" },
    { key: "tasks", label: "My tasks", icon: "clipboard" },
    { key: "reports", label: "Maintenance", icon: "wrench" },
  ];
  return (
    <div className="min-h-screen bg-[#f6f8f7] md:flex">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[252px] flex-col border-r border-slate-200 bg-white px-5 py-6 md:flex">
        <div className="px-2">
          <Logo />
        </div>
        <nav className="mt-10 space-y-1.5">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[.12em] text-slate-400">
            Student portal
          </p>
          {items.map((item) => (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              className={`nav-item ${page === item.key ? "nav-item-active" : ""}`}
            >
              <Icon name={item.icon} size={20} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto">
          <div className="mb-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
            <div className="grid size-9 place-items-center rounded-full bg-[#d9eee9] text-sm font-semibold text-teal-800">
              AM
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">Alex Morgan</p>
              <p className="truncate text-xs text-slate-500">Maple House · 3B</p>
            </div>
          </div>
          <button onClick={logout} className="nav-item text-slate-500">
            <Icon name="logout" size={20} /> Sign out
          </button>
        </div>
      </aside>
      <div className="min-w-0 flex-1 md:ml-[252px]">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 backdrop-blur md:hidden">
          <Logo compact />
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-700">Alex</span>
            <button
              onClick={logout}
              className="grid size-9 place-items-center rounded-full bg-slate-100 text-slate-600"
              aria-label="Sign out"
            >
              <Icon name="logout" size={18} />
            </button>
          </div>
        </header>
        {children}
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-slate-200 bg-white px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 md:hidden">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => setPage(item.key)}
            className={`mobile-nav ${page === item.key ? "text-teal-700" : "text-slate-400"}`}
          >
            <Icon name={item.icon} size={21} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[.12em] text-teal-700">
            {eyebrow}
          </p>
        )}
        <h1 className="text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-slate-900">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  );
}

function StudentHome({
  tasks,
  reports,
  goTo,
}: {
  tasks: Task[];
  reports: Report[];
  goTo: (page: StudentPage) => void;
}) {
  const remaining = tasks.filter((task) => !task.completed);
  return (
    <main className="page-wrap">
      <PageHeader
        eyebrow="Tuesday, 18 February"
        title="Good morning, Alex"
        description="Here’s what’s happening at Maple House today."
      />
      <section className="mb-7 overflow-hidden rounded-3xl bg-teal-800 px-6 py-7 text-white shadow-sm sm:px-8">
        <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-teal-100">Your week at a glance</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em]">
              {remaining.length} tasks still to complete
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-teal-100/80">
              A little teamwork keeps your shared home feeling great.
            </p>
          </div>
          <button
            className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
            onClick={() => goTo("tasks")}
          >
            View my tasks
          </button>
        </div>
      </section>
      <div className="grid gap-6 xl:grid-cols-[1.08fr_.92fr]">
        <section className="card">
          <div className="card-heading">
            <div>
              <p className="section-kicker">TO DO</p>
              <h2>Assigned tasks</h2>
            </div>
            <button className="text-link" onClick={() => goTo("tasks")}>
              View all <Icon name="arrow" size={16} />
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {tasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center gap-4 py-4 first:pt-2 last:pb-1">
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-xl ${task.completed ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                >
                  <Icon
                    name={
                      task.completed ? "check" : task.category === "Garbage" ? "logout" : "spark"
                    }
                    size={19}
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`font-medium ${task.completed ? "text-slate-400 line-through" : "text-slate-800"}`}
                  >
                    {task.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{task.due}</p>
                </div>
                {!task.completed && (
                  <span className="hidden rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 sm:inline">
                    {task.category}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
        <section className="card">
          <div className="card-heading">
            <div>
              <p className="section-kicker">UPDATES</p>
              <h2>Maintenance reports</h2>
            </div>
            <button className="text-link" onClick={() => goTo("reports")}>
              View all <Icon name="arrow" size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {reports.slice(0, 3).map((report) => (
              <button
                key={report.id}
                onClick={() => goTo("reports")}
                className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:border-teal-200 hover:bg-teal-50/40"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500">
                  <Icon name="wrench" size={17} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">{report.title}</p>
                  <p className="mt-1 text-xs text-slate-400">{report.submitted}</p>
                </div>
                <StatusBadge status={report.status} />
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function StudentTasks({
  tasks,
  completeTask,
}: {
  tasks: Task[];
  completeTask: (id: number) => void;
}) {
  const completed = tasks.filter((task) => task.completed).length;
  return (
    <main className="page-wrap">
      <PageHeader
        title="My tasks"
        description="Your shared cleaning and household jobs for this week."
      />
      <div className="mb-6 rounded-2xl border border-teal-100 bg-teal-50/70 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-teal-900">Weekly progress</p>
            <p className="mt-1 text-sm text-teal-700">
              {completed} of {tasks.length} tasks completed
            </p>
          </div>
          <span className="text-2xl font-semibold tracking-tight text-teal-800">
            {Math.round((completed / tasks.length) * 100)}%
          </span>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-teal-100">
          <div
            className="h-full rounded-full bg-teal-600 transition-all duration-500"
            style={{ width: `${(completed / tasks.length) * 100}%` }}
          />
        </div>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <article
            key={task.id}
            className={`card flex flex-col gap-5 sm:flex-row sm:items-center ${task.completed ? "bg-slate-50/80" : ""}`}
          >
            <div
              className={`grid size-12 shrink-0 place-items-center rounded-2xl ${task.completed ? "bg-emerald-100 text-emerald-700" : task.category === "Garbage" ? "bg-indigo-50 text-indigo-700" : "bg-amber-50 text-amber-700"}`}
            >
              <Icon
                name={task.completed ? "check" : task.category === "Garbage" ? "logout" : "spark"}
                size={22}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2
                  className={`text-lg font-semibold ${task.completed ? "text-slate-500 line-through" : "text-slate-900"}`}
                >
                  {task.title}
                </h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {task.category}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-6 text-slate-500">{task.detail}</p>
              <p
                className={`mt-2 flex items-center gap-1.5 text-xs font-medium ${task.completed ? "text-emerald-700" : "text-amber-700"}`}
              >
                <Icon name={task.completed ? "check" : "clock"} size={15} />
                {task.due}
              </p>
            </div>
            <button
              disabled={task.completed}
              onClick={() => completeTask(task.id)}
              className={task.completed ? "completed-button" : "secondary-button"}
            >
              <Icon name="check" size={17} /> {task.completed ? "Completed" : "Mark complete"}
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}

function StudentReports({
  reports,
  addReport,
}: {
  reports: Report[];
  addReport: (title: string, description: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) return;
    addReport(title.trim(), description.trim());
    setTitle("");
    setDescription("");
    setOpen(false);
  };
  return (
    <main className="page-wrap">
      <PageHeader
        title="Maintenance reports"
        description="Report a problem in your home and follow its progress."
        action={
          <button className="primary-button" onClick={() => setOpen(!open)}>
            <Icon name={open ? "close" : "plus"} size={18} />{" "}
            {open ? "Close form" : "Report a problem"}
          </button>
        }
      />
      {open && (
        <form onSubmit={submit} className="card mb-6 border-teal-100 bg-teal-50/30">
          <div className="mb-5">
            <p className="section-kicker">NEW REPORT</p>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              What needs attention?
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Give the housing team enough detail to understand the problem.
            </p>
          </div>
          <div className="grid gap-5">
            <label>
              <span className="form-label">Problem title</span>
              <input
                className="field"
                placeholder="e.g. Shower drain is blocked"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </label>
            <label>
              <span className="form-label">Description</span>
              <textarea
                className="field min-h-28 resize-y"
                placeholder="Describe what is happening and where..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </label>
            <div className="flex justify-end gap-3">
              <button type="button" className="ghost-button" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className="primary-button" type="submit">
                Submit report
              </button>
            </div>
          </div>
        </form>
      )}
      <section className="card">
        <div className="card-heading">
          <div>
            <p className="section-kicker">YOUR REPORTS</p>
            <h2>Recent requests</h2>
          </div>
          <span className="text-sm text-slate-400">{reports.length} total</span>
        </div>
        <div className="divide-y divide-slate-100">
          {reports.map((report) => (
            <article
              key={report.id}
              className="grid gap-3 py-5 first:pt-2 last:pb-1 sm:grid-cols-[1fr_auto] sm:items-start"
            >
              <div className="flex gap-4">
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500">
                  <Icon name="wrench" size={18} />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{report.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                    {report.description}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">Submitted {report.submitted}</p>
                </div>
              </div>
              <div className="ml-14 sm:ml-0">
                <StatusBadge status={report.status} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function Management({
  reports,
  updateStatus,
  logout,
}: {
  reports: Report[];
  updateStatus: (id: number, status: Status) => void;
  logout: () => void;
}) {
  const [selected, setSelected] = useState<Report | null>(null);
  const [filter, setFilter] = useState<"All" | Status>("All");
  const [mobileMenu, setMobileMenu] = useState(false);
  const filtered =
    filter === "All" ? reports : reports.filter((report) => report.status === filter);
  const counts = {
    Received: reports.filter((r) => r.status === "Received").length,
    "In progress": reports.filter((r) => r.status === "In progress").length,
    Resolved: reports.filter((r) => r.status === "Resolved").length,
  };
  const selectedCurrent = selected
    ? (reports.find((report) => report.id === selected.id) ?? selected)
    : null;
  return (
    <div className="min-h-screen bg-[#f5f7f7]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-18 max-w-[1400px] items-center justify-between px-5 sm:px-8">
          <Logo />
          <nav className="hidden items-center gap-2 md:flex">
            <span className="mr-3 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
              Management portal
            </span>
            <button onClick={logout} className="ghost-button">
              <Icon name="logout" size={18} /> Sign out
            </button>
          </nav>
          <button
            className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-600 md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <Icon name={mobileMenu ? "close" : "menu"} />
          </button>
        </div>
        {mobileMenu && (
          <div className="border-t border-slate-100 px-5 py-3 md:hidden">
            <button onClick={logout} className="nav-item">
              <Icon name="logout" size={18} /> Sign out
            </button>
          </div>
        )}
      </header>
      <main className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 sm:py-10">
        <PageHeader
          eyebrow="MANAGEMENT PORTAL"
          title="Maintenance overview"
          description="Review reports from residents and keep their status up to date."
        />
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {(["Received", "In progress", "Resolved"] as Status[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-2xl border bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md ${filter === status ? "border-teal-400 ring-2 ring-teal-100" : "border-slate-200"}`}
            >
              <div className="flex items-center justify-between">
                <StatusBadge status={status} />
                <span className="text-3xl font-semibold tracking-tight text-slate-900">
                  {counts[status]}
                </span>
              </div>
              <p className="mt-4 text-xs text-slate-400">Click to filter reports</p>
            </button>
          ))}
        </div>
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,.02)]">
          <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">All reports</h2>
              <p className="mt-1 text-sm text-slate-500">{filtered.length} maintenance requests</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["All", "Received", "In progress", "Resolved"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`filter-button ${filter === item ? "filter-active" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="hidden grid-cols-[1.4fr_.8fr_.75fr_32px] gap-5 border-b border-slate-100 bg-slate-50/70 px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 md:grid">
            <span>Problem</span>
            <span>Property</span>
            <span>Status</span>
            <span />
          </div>
          <div className="divide-y divide-slate-100">
            {filtered.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelected(report)}
                className="grid w-full gap-3 px-5 py-5 text-left transition hover:bg-slate-50 md:grid-cols-[1.4fr_.8fr_.75fr_32px] md:items-center md:gap-5 md:px-6"
              >
                <div>
                  <p className="font-semibold text-slate-900">{report.title}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    #{report.id} · {report.submitted}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Icon name="pin" size={16} className="text-slate-400" />
                  {report.house}
                </div>
                <div>
                  <StatusBadge status={report.status} />
                </div>
                <Icon name="arrow" size={18} className="hidden text-slate-400 md:block" />
              </button>
            ))}
          </div>
        </section>
      </main>
      {selectedCurrent && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/30 backdrop-blur-[2px]"
          onMouseDown={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <aside className="h-full w-full max-w-lg overflow-y-auto bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
                REPORT #{selectedCurrent.id}
              </span>
              <button
                className="grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
                onClick={() => setSelected(null)}
                aria-label="Close report"
              >
                <Icon name="close" size={20} />
              </button>
            </div>
            <div className="mt-8">
              <StatusBadge status={selectedCurrent.status} />
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
                {selectedCurrent.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">{selectedCurrent.description}</p>
            </div>
            <div className="my-8 grid grid-cols-2 gap-3">
              <div className="detail-box">
                <Icon name="building" size={19} />
                <span>
                  <small>Property</small>
                  <strong>{selectedCurrent.house}</strong>
                </span>
              </div>
              <div className="detail-box">
                <Icon name="pin" size={19} />
                <span>
                  <small>Location</small>
                  <strong>{selectedCurrent.room}</strong>
                </span>
              </div>
              <div className="detail-box col-span-2">
                <Icon name="clock" size={19} />
                <span>
                  <small>Submitted</small>
                  <strong>{selectedCurrent.submitted}</strong>
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="font-semibold text-slate-900">Update status</p>
              <p className="mt-1 text-sm text-slate-500">
                Residents will see this update in their portal.
              </p>
              <div className="mt-5 space-y-2">
                {(["Received", "In progress", "Resolved"] as Status[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(selectedCurrent.id, status)}
                    className={`flex w-full items-center justify-between rounded-xl border p-3.5 transition ${selectedCurrent.status === status ? "border-teal-500 bg-teal-50" : "border-slate-200 hover:border-slate-300"}`}
                  >
                    <StatusBadge status={status} />
                    {selectedCurrent.status === status && (
                      <span className="grid size-6 place-items-center rounded-full bg-teal-700 text-white">
                        <Icon name="check" size={14} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <button className="primary-button mt-6 w-full" onClick={() => setSelected(null)}>
              Done
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState<Role>(null);
  const [page, setPage] = useState<StudentPage>("home");
  const [tasks, setTasks] = useState(initialTasks);
  const [reports, setReports] = useState(initialReports);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const completeTask = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: true, due: "Completed just now" } : task,
      ),
    );
    setToast("Task marked as complete");
  };
  const addReport = (title: string, description: string) => {
    setReports((current) => [
      {
        id: Math.max(...current.map((report) => report.id)) + 1,
        title,
        description,
        house: "Maple House",
        room: "Shared area",
        submitted: "Just now",
        status: "Received",
      },
      ...current,
    ]);
    setToast("Report submitted successfully");
  };
  const updateStatus = (id: number, status: Status) => {
    setReports((current) =>
      current.map((report) => (report.id === id ? { ...report, status } : report)),
    );
    setToast(`Status updated to ${status}`);
  };
  const logout = () => {
    setRole(null);
    setPage("home");
  };

  if (!role) return <Login onEnter={setRole} />;
  if (role === "management")
    return (
      <>
        <Management reports={reports} updateStatus={updateStatus} logout={logout} />
        {toast && <Toast message={toast} />}
      </>
    );

  return (
    <StudentShell page={page} setPage={setPage} logout={logout}>
      {page === "home" && <StudentHome tasks={tasks} reports={reports} goTo={setPage} />}
      {page === "tasks" && <StudentTasks tasks={tasks} completeTask={completeTask} />}
      {page === "reports" && <StudentReports reports={reports} addReport={addReport} />}
      {toast && <Toast message={toast} />}
    </StudentShell>
  );
}
