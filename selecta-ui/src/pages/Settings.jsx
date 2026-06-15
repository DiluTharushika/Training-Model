import { useEffect, useMemo, useState } from "react";

const BRAND = "#792CA2";

function Section({ title, description, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur shadow-sm">
      <div className="p-4 md:p-6 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        {description ? (
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        ) : null}
      </div>
      <div className="p-4 md:p-6">{children}</div>
    </div>
  );
}

function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="text-sm font-semibold text-slate-900">{label}</div>
        {description ? (
          <div className="text-sm text-slate-500 mt-1">{description}</div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={[
          "relative inline-flex h-7 w-12 items-center rounded-full border transition",
          checked ? "bg-brand border-brand" : "bg-slate-200 border-slate-200",
        ].join(" ")}
        aria-pressed={checked}
      >
        <span
          className={[
            "inline-block h-6 w-6 transform rounded-full bg-white shadow transition",
            checked ? "translate-x-5" : "translate-x-0.5",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

export default function Settings() {
  const defaults = useMemo(
    () => ({
      profile: {
        fullName: "Selecta User",
        email: "user@selecta.lk",
        role: "Staff",
      },
      assistant: {
        tone: "Professional",
        includeSources: true,
        autoScroll: true,
      },
      notifications: {
        emailAlerts: true,
        desktopAlerts: false,
      },
      privacy: {
        saveChatHistory: true,
      },
      appearance: {
        compactMode: false,
      },
    }),
    []
  );

  const [state, setState] = useState(defaults);
  const [savedMsg, setSavedMsg] = useState("");

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("selecta_settings");
      if (raw) setState(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  function update(path, value) {
    setState((prev) => {
      const next = structuredClone(prev);
      next[path[0]][path[1]] = value;
      return next;
    });
  }

  function save() {
    localStorage.setItem("selecta_settings", JSON.stringify(state));
    setSavedMsg("Saved!");
    setTimeout(() => setSavedMsg(""), 1200);
  }

  function reset() {
    setState(defaults);
    localStorage.removeItem("selecta_settings");
    setSavedMsg("Reset!");
    setTimeout(() => setSavedMsg(""), 1200);
  }

  return (
    <div className="max-w-5xl w-full space-y-5">
      {/* Page header */}
      <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur shadow-sm p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Settings</h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your profile, assistant behavior, notifications, and privacy.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={reset}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold"
            >
              Reset
            </button>
            <button
              onClick={save}
              className="px-4 py-2 rounded-xl bg-brand hover:bg-brand-dark text-white text-sm font-semibold"
            >
              Save Changes
            </button>
          </div>
        </div>

        {savedMsg ? (
          <div
            className="mt-3 text-sm font-semibold"
            style={{ color: BRAND }}
          >
            {savedMsg}
          </div>
        ) : null}
      </div>

      {/* Profile */}
      <Section
        title="Profile"
        description="Basic information used in the application."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="block">
            <div className="text-sm font-semibold text-slate-900">Full name</div>
            <input
              value={state.profile.fullName}
              onChange={(e) => update(["profile", "fullName"], e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:#792CA2]"
            />
          </label>

          <label className="block">
            <div className="text-sm font-semibold text-slate-900">Email</div>
            <input
              value={state.profile.email}
              onChange={(e) => update(["profile", "email"], e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:#792CA2]"
            />
          </label>

          <label className="block">
            <div className="text-sm font-semibold text-slate-900">Role</div>
            <input
              value={state.profile.role}
              onChange={(e) => update(["profile", "role"], e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:#792CA2]"
            />
          </label>
        </div>
      </Section>

      {/* Assistant */}
      <Section
        title="Assistant"
        description="Control how Selecta AI responds and behaves."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="block">
            <div className="text-sm font-semibold text-slate-900">Response tone</div>
            <select
              value={state.assistant.tone}
              onChange={(e) => update(["assistant", "tone"], e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:#792CA2]"
            >
              <option>Professional</option>
              <option>Friendly</option>
              <option>Short</option>
              <option>Detailed</option>
            </select>
          </label>

          <div className="space-y-4">
            <Toggle
              label="Include sources (when available)"
              description="Show references/links when the assistant uses documents."
              checked={state.assistant.includeSources}
              onChange={(v) => update(["assistant", "includeSources"], v)}
            />
            <Toggle
              label="Auto-scroll chat"
              description="Automatically scroll to the newest message."
              checked={state.assistant.autoScroll}
              onChange={(v) => update(["assistant", "autoScroll"], v)}
            />
          </div>
        </div>
      </Section>

      {/* Notifications */}
      <Section
        title="Notifications"
        description="Choose how you want to be notified."
      >
        <div className="space-y-4">
          <Toggle
            label="Email alerts"
            description="Receive updates to your email."
            checked={state.notifications.emailAlerts}
            onChange={(v) => update(["notifications", "emailAlerts"], v)}
          />
          <Toggle
            label="Desktop alerts"
            description="Show notifications in your browser (requires permission)."
            checked={state.notifications.desktopAlerts}
            onChange={(v) => update(["notifications", "desktopAlerts"], v)}
          />
        </div>
      </Section>

      {/* Privacy */}
      <Section
        title="Privacy"
        description="Control what is saved on this device."
      >
        <div className="space-y-4">
          <Toggle
            label="Save chat history on this device"
            description="Stores chat messages in memory only for now. (You can add database later.)"
            checked={state.privacy.saveChatHistory}
            onChange={(v) => update(["privacy", "saveChatHistory"], v)}
          />
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
          Note: This demo stores settings in <span className="font-semibold">localStorage</span>.
          If you add a backend later, we can save these settings per user account.
        </div>
      </Section>

      {/* Appearance */}
      <Section title="Appearance" description="UI preferences.">
        <Toggle
          label="Compact mode"
          description="Reduce spacing for dense screens."
          checked={state.appearance.compactMode}
          onChange={(v) => update(["appearance", "compactMode"], v)}
        />
      </Section>
    </div>
  );
}