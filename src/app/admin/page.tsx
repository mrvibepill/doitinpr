"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

// ─── Types ─────────────────────────────────────────────────────────────────────

type TripStatus = "pending" | "fee_paid" | "confirmed";

interface Itinerary {
  id: string;
  customer_name: string;
  customer_email: string;
  arrival_date: string | null;
  departure_date: string | null;
  status: TripStatus;
  created_at: string;
}

interface SelectedItem {
  id: string;
  itinerary_id: string;
  activity_title: string;
  confirmed_by_provider: boolean;
  provider_notes: string | null;
}

interface DbItineraryRow {
  id: string;
  customer_name: string | null;
  customer_email: string | null;
  arrival_date: string | null;
  departure_date: string | null;
  status: string | null;
  created_at: string;
}

interface DbItemRow {
  id: string;
  itinerary_id: string;
  activity_title: string | null;
  confirmed_by_provider: boolean | null;
  provider_notes: string | null;
}

// ─── Status configuration ──────────────────────────────────────────────────────

interface StatusMeta {
  label: string;
  color: string;
  bg: string;
  border: string;
  next: TripStatus | null;
  nextLabel: string | null;
}

const STATUS_META: Record<TripStatus, StatusMeta> = {
  pending: {
    label: "🚨 Pending Payment",
    color: "#FF7040",
    bg: "rgba(255,112,64,0.08)",
    border: "rgba(255,112,64,0.25)",
    next: "fee_paid",
    nextLabel: "Advance → Fee Paid",
  },
  fee_paid: {
    label: "💰 Fee Paid · Processing",
    color: "#D4AF37",
    bg: "rgba(212,175,55,0.08)",
    border: "rgba(212,175,55,0.30)",
    next: "confirmed",
    nextLabel: "Mark ✨ Fully Confirmed",
  },
  confirmed: {
    label: "✨ Fully Confirmed",
    color: "#5eead4",
    bg: "rgba(94,234,212,0.08)",
    border: "rgba(94,234,212,0.25)",
    next: null,
    nextLabel: null,
  },
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

function normStatus(raw: string | null): TripStatus {
  if (raw === "fee_paid" || raw === "confirmed") return raw;
  return "pending";
}

function fmtDate(date: string | null): string {
  if (!date) return "—";
  // Append time to avoid UTC-shift off-by-one
  return new Date(date + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function fmtTimestamp(ts: string): string {
  return new Date(ts).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function mapItinerary(row: DbItineraryRow): Itinerary {
  return {
    id: row.id,
    customer_name: row.customer_name ?? "Unknown Guest",
    customer_email: row.customer_email ?? "—",
    arrival_date: row.arrival_date,
    departure_date: row.departure_date,
    status: normStatus(row.status),
    created_at: row.created_at,
  };
}

function mapItem(row: DbItemRow): SelectedItem {
  return {
    id: row.id,
    itinerary_id: row.itinerary_id,
    activity_title: row.activity_title ?? "Unnamed Activity",
    confirmed_by_provider: row.confirmed_by_provider ?? false,
    provider_notes: row.provider_notes,
  };
}

// ─── StatusBadge ───────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: TripStatus }) {
  const m = STATUS_META[status];
  return (
    <span
      className="inline-flex items-center whitespace-nowrap px-3 py-1 text-[10px] font-[500] font-[family-name:var(--font-montserrat)] uppercase"
      style={{
        letterSpacing: "0.11em",
        color: m.color,
        background: m.bg,
        border: `1px solid ${m.border}`,
        borderRadius: 0,
      }}
    >
      {m.label}
    </span>
  );
}

// ─── StatCard ──────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 px-6 py-5 border border-[#D4AF37]/12 bg-[#0f0f0f]">
      <p
        className="font-[family-name:var(--font-montserrat)] font-[200] text-[9px] uppercase text-[#D4AF37]/45"
        style={{ letterSpacing: "0.2em" }}
      >
        {label}
      </p>
      <p
        className={`font-[family-name:var(--font-cormorant)] font-semibold text-5xl leading-none ${
          highlight ? "text-[#D4AF37]" : "text-[#F5F0EB]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

// ─── SkeletonRow ───────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <tr>
      {[55, 70, 48, 38, 42, 20].map((w, i) => (
        <td key={i} className="px-6 py-5">
          <div
            className="h-2.5 bg-[#1c1c1c] animate-pulse"
            style={{ width: `${w}%` }}
          />
        </td>
      ))}
    </tr>
  );
}

// ─── ActivityItem ──────────────────────────────────────────────────────────────

function ActivityItem({
  item,
  onToggle,
  busy,
}: {
  item: SelectedItem;
  onToggle: () => void;
  busy: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3.5 border border-[#D4AF37]/10 bg-[#0f0f0f]">
      {/* Status dot + title */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-1.5 h-1.5 flex-shrink-0"
          style={{
            background: item.confirmed_by_provider ? "#5eead4" : "#333",
          }}
        />
        <span
          className="font-[family-name:var(--font-montserrat)] font-[300] text-[#F5F0EB]/75 text-xs truncate"
          style={{ letterSpacing: "0.03em" }}
        >
          {item.activity_title}
        </span>
      </div>

      {/* Confirm toggle */}
      <button
        onClick={onToggle}
        disabled={busy}
        aria-label={
          item.confirmed_by_provider
            ? "Remove provider confirmation"
            : "Mark confirmed by provider"
        }
        className="flex-shrink-0 font-[family-name:var(--font-montserrat)] font-[500] text-[9px] uppercase px-3 py-1.5 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          letterSpacing: "0.13em",
          borderRadius: 0,
          color: item.confirmed_by_provider ? "#5eead4" : "#D4AF37",
          border: item.confirmed_by_provider
            ? "1px solid rgba(94,234,212,0.25)"
            : "1px solid rgba(212,175,55,0.20)",
          background: item.confirmed_by_provider
            ? "rgba(94,234,212,0.07)"
            : "transparent",
        }}
      >
        {busy ? "·" : item.confirmed_by_provider ? "✓ Confirmed" : "Confirm"}
      </button>
    </div>
  );
}

// ─── Detail Drawer ─────────────────────────────────────────────────────────────

interface DrawerProps {
  itinerary: Itinerary | null;
  onClose: () => void;
  onStatusChange: (id: string, next: TripStatus) => void;
}

function DetailDrawer({ itinerary, onClose, onStatusChange }: DrawerProps) {
  const [items, setItems] = useState<SelectedItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [advancingStatus, setAdvancingStatus] = useState(false);
  const [busyItemId, setBusyItemId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const isOpen = itinerary !== null;

  // Fetch linked activities whenever drawer opens for a new itinerary
  useEffect(() => {
    if (!itinerary) {
      setItems([]);
      return;
    }
    setLoadingItems(true);
    supabase
      .from("itinerary_selected_items")
      .select(
        "id, itinerary_id, activity_title, confirmed_by_provider, provider_notes"
      )
      .eq("itinerary_id", itinerary.id)
      .order("id", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) {
          setItems((data as DbItemRow[]).map(mapItem));
        }
        setLoadingItems(false);
      });
  }, [itinerary?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function fireToast(msg: string) {
    setToast(msg);
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }

  async function handleAdvance() {
    if (!itinerary) return;
    const meta = STATUS_META[itinerary.status];
    if (!meta.next) return;
    setAdvancingStatus(true);
    const { error } = await supabase
      .from("customer_itineraries")
      .update({ status: meta.next })
      .eq("id", itinerary.id);
    if (!error) {
      onStatusChange(itinerary.id, meta.next as TripStatus);
      fireToast("Trip status updated");
    } else {
      fireToast("Update failed — check RLS policies");
    }
    setAdvancingStatus(false);
  }

  async function handleToggleItem(item: SelectedItem) {
    setBusyItemId(item.id);
    const nextVal = !item.confirmed_by_provider;
    const { error } = await supabase
      .from("itinerary_selected_items")
      .update({ confirmed_by_provider: nextVal })
      .eq("id", item.id);
    if (!error) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, confirmed_by_provider: nextVal } : i
        )
      );
      fireToast(nextVal ? "Activity confirmed by provider" : "Confirmation removed");
    } else {
      fireToast("Update failed — check RLS policies");
    }
    setBusyItemId(null);
  }

  const meta = itinerary ? STATUS_META[itinerary.status] : null;
  const confirmedCount = items.filter((i) => i.confirmed_by_provider).length;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/55 z-40 transition-opacity duration-300"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      />

      {/* Drawer panel */}
      <aside
        aria-modal="true"
        aria-label="Itinerary detail"
        className="fixed inset-y-0 right-0 w-full max-w-[580px] bg-[#0D0D0D] border-l border-[#D4AF37]/12 z-50 overflow-y-auto flex flex-col"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 480ms cubic-bezier(0.32, 0, 0.15, 1)",
        }}
      >
        {itinerary && meta && (
          <>
            {/* ── Header ── */}
            <div className="flex items-start justify-between gap-4 px-8 pt-8 pb-6 border-b border-[#D4AF37]/10 flex-shrink-0">
              <div className="flex flex-col gap-1">
                <p
                  className="font-[family-name:var(--font-montserrat)] font-[200] text-[#D4AF37]/45 text-[9px] uppercase"
                  style={{ letterSpacing: "0.22em" }}
                >
                  Itinerary Detail
                </p>
                <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-[#F5F0EB] text-[26px] leading-tight mt-0.5">
                  {itinerary.customer_name}
                </h2>
                <p
                  className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/35 text-xs mt-0.5"
                  style={{ letterSpacing: "0.06em" }}
                >
                  {itinerary.customer_email}
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[#F5F0EB]/20 hover:text-[#D4AF37] transition-colors duration-200 mt-0.5"
                aria-label="Close drawer"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="square"
                >
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>

            {/* ── Dates strip ── */}
            <div className="flex gap-0 border-b border-[#D4AF37]/10 flex-shrink-0">
              {[
                { label: "Arrival", value: fmtDate(itinerary.arrival_date) },
                { label: "Departure", value: fmtDate(itinerary.departure_date) },
                { label: "Received", value: fmtTimestamp(itinerary.created_at) },
              ].map(({ label, value }, idx) => (
                <div
                  key={label}
                  className={`flex flex-col gap-1.5 px-8 py-5 flex-1 ${
                    idx < 2 ? "border-r border-[#D4AF37]/10" : ""
                  }`}
                >
                  <p
                    className="font-[family-name:var(--font-montserrat)] font-[200] text-[#D4AF37]/40 text-[9px] uppercase"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    {label}
                  </p>
                  <p
                    className="font-[family-name:var(--font-montserrat)] font-[300] text-[#F5F0EB]/75 text-xs"
                    style={{ letterSpacing: "0.04em" }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* ── Trip status block ── */}
            <div className="px-8 py-6 border-b border-[#D4AF37]/10 flex-shrink-0">
              <p
                className="font-[family-name:var(--font-montserrat)] font-[200] text-[#D4AF37]/40 text-[9px] uppercase mb-4"
                style={{ letterSpacing: "0.2em" }}
              >
                Trip Status
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <StatusBadge status={itinerary.status} />
                {meta.next && (
                  <button
                    onClick={handleAdvance}
                    disabled={advancingStatus}
                    className="font-[family-name:var(--font-montserrat)] font-[500] text-[10px] uppercase px-5 py-2.5 border border-[#D4AF37]/30 text-[#D4AF37]/70 hover:text-[#0D0D0D] hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ letterSpacing: "0.14em", borderRadius: 0 }}
                  >
                    {advancingStatus ? "Updating…" : meta.nextLabel}
                  </button>
                )}
                {itinerary.status === "confirmed" && (
                  <span
                    className="font-[family-name:var(--font-montserrat)] font-[200] text-[#5eead4]/40 text-[10px]"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    Final status reached
                  </span>
                )}
              </div>
            </div>

            {/* ── Selected activities ── */}
            <div className="px-8 py-6 flex-1">
              <div className="flex items-center justify-between mb-5">
                <p
                  className="font-[family-name:var(--font-montserrat)] font-[200] text-[#D4AF37]/40 text-[9px] uppercase"
                  style={{ letterSpacing: "0.2em" }}
                >
                  Selected Activities
                  {!loadingItems && items.length > 0 && (
                    <span className="ml-2 text-[#F5F0EB]/20">
                      ({confirmedCount}/{items.length} confirmed)
                    </span>
                  )}
                </p>
              </div>

              {loadingItems ? (
                <div className="flex flex-col gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-12 bg-[#0f0f0f] animate-pulse border border-[#D4AF37]/5"
                    />
                  ))}
                </div>
              ) : items.length === 0 ? (
                <div className="flex items-center justify-center py-12 border border-dashed border-[#D4AF37]/10">
                  <p
                    className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/15 text-xs"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    No linked activities found
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {items.map((item) => (
                    <ActivityItem
                      key={item.id}
                      item={item}
                      onToggle={() => handleToggleItem(item)}
                      busy={busyItemId === item.id}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ── Internal notes ── */}
            <div className="px-8 py-6 border-t border-[#D4AF37]/10 flex-shrink-0">
              <p
                className="font-[family-name:var(--font-montserrat)] font-[200] text-[#D4AF37]/40 text-[9px] uppercase mb-3"
                style={{ letterSpacing: "0.2em" }}
              >
                Logistics Notes
              </p>
              <textarea
                rows={3}
                placeholder="Add internal notes for the concierge team…"
                className="w-full bg-[#0f0f0f] border border-[#D4AF37]/12 focus:border-[#D4AF37]/35 outline-none px-4 py-3 font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/60 text-xs placeholder-[#F5F0EB]/12 resize-none transition-colors duration-200"
                style={{ letterSpacing: "0.04em", borderRadius: 0 }}
              />
              <p
                className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/15 text-[9px] mt-2"
                style={{ letterSpacing: "0.08em" }}
              >
                Notes are session-only — provider notes per activity saved automatically on toggle
              </p>
            </div>
          </>
        )}
      </aside>

      {/* ── Toast notification ── */}
      <div
        aria-live="polite"
        className="fixed bottom-6 left-1/2 z-[60] pointer-events-none"
        style={{
          transform: `translateX(-50%) translateY(${toast ? "0px" : "10px"})`,
          opacity: toast ? 1 : 0,
          transition: "opacity 220ms ease, transform 220ms ease",
        }}
      >
        <div className="bg-[#111] border border-[#D4AF37]/25 px-6 py-3">
          <p
            className="font-[family-name:var(--font-montserrat)] font-[300] text-[#D4AF37] text-xs whitespace-nowrap"
            style={{ letterSpacing: "0.12em" }}
          >
            {toast}
          </p>
        </div>
      </div>
    </>
  );
}

// ─── Admin Page ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeItinerary, setActiveItinerary] = useState<Itinerary | null>(null);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("customer_itineraries")
      .select(
        "id, customer_name, customer_email, arrival_date, departure_date, status, created_at"
      )
      .order("created_at", { ascending: false });

    if (!error && data) {
      setItineraries((data as DbItineraryRow[]).map(mapItinerary));
    }
    setLastSynced(new Date());
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // When status advances inside the drawer, sync it to the table row
  function handleStatusChange(id: string, next: TripStatus) {
    setItineraries((prev) =>
      prev.map((it) => (it.id === id ? { ...it, status: next } : it))
    );
    // Keep drawer's own itinerary reference current
    setActiveItinerary((prev) =>
      prev && prev.id === id ? { ...prev, status: next } : prev
    );
  }

  // ── Derived stats ──
  const total = itineraries.length;
  const pendingCount = itineraries.filter((i) => i.status === "pending").length;
  const feePaidCount = itineraries.filter((i) => i.status === "fee_paid").length;
  const confirmedCount = itineraries.filter((i) => i.status === "confirmed").length;

  return (
    <div className="min-h-screen bg-[#0D0D0D] font-[family-name:var(--font-montserrat)] text-[#F5F0EB]">
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 border-b border-[#D4AF37]/10 bg-[#0D0D0D]/95 backdrop-blur-sm">
        <div className="flex items-center gap-5">
          <div className="w-[3px] h-7 bg-[#D4AF37]" />
          <div>
            <p className="font-[family-name:var(--font-cormorant)] font-semibold text-[#F5F0EB] text-[22px] tracking-tight leading-none">
              DoItInPR
            </p>
            <p
              className="font-[200] text-[#D4AF37]/45 text-[9px] uppercase mt-1"
              style={{ letterSpacing: "0.22em" }}
            >
              Concierge Operations Dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          {lastSynced && (
            <p
              className="hidden sm:block font-[200] text-[#F5F0EB]/18 text-[10px]"
              style={{ letterSpacing: "0.07em" }}
            >
              Synced{" "}
              {lastSynced.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          )}
          <button
            onClick={fetchAll}
            disabled={loading}
            className="font-[500] text-[9px] uppercase px-4 py-2.5 border border-[#D4AF37]/20 text-[#D4AF37]/55 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
            style={{ letterSpacing: "0.16em", borderRadius: 0 }}
          >
            ↺ Refresh
          </button>
        </div>
      </header>

      <main className="px-6 py-8 lg:px-10 max-w-screen-xl mx-auto">
        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          <StatCard label="Total Requests" value={total} />
          <StatCard label="Pending Payment" value={pendingCount} highlight />
          <StatCard label="Fee Paid · Processing" value={feePaidCount} highlight />
          <StatCard label="Fully Confirmed" value={confirmedCount} />
        </div>

        {/* ── Pipeline panel ── */}
        <div className="border border-[#D4AF37]/12">
          {/* Panel header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/10 bg-[#0a0a0a]">
            <p
              className="font-[200] text-[#D4AF37]/45 text-[9px] uppercase"
              style={{ letterSpacing: "0.22em" }}
            >
              Guest Pipeline
            </p>
            {!loading && total > 0 && (
              <p
                className="font-[200] text-[#F5F0EB]/20 text-[10px]"
                style={{ letterSpacing: "0.06em" }}
              >
                {total} {total === 1 ? "request" : "requests"}
              </p>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#D4AF37]/8">
                  {[
                    "Guest",
                    "Contact",
                    "Travel Dates",
                    "Status",
                    "Received",
                    "",
                  ].map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-6 py-3 text-left font-[200] text-[#D4AF37]/30 text-[9px] uppercase"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <>
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                  </>
                ) : itineraries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <p
                        className="font-[200] text-[#F5F0EB]/18 text-sm"
                        style={{ letterSpacing: "0.12em" }}
                      >
                        No itinerary requests yet.
                      </p>
                      <p
                        className="font-[200] text-[#F5F0EB]/10 text-xs mt-2"
                        style={{ letterSpacing: "0.08em" }}
                      >
                        Submissions from the Explore page will appear here in real time.
                      </p>
                    </td>
                  </tr>
                ) : (
                  itineraries.map((it) => (
                    <tr
                      key={it.id}
                      onClick={() => setActiveItinerary(it)}
                      className="border-b border-[#D4AF37]/5 hover:bg-[#D4AF37]/[0.025] transition-colors duration-150 cursor-pointer group"
                    >
                      {/* Guest name */}
                      <td className="px-6 py-4">
                        <span
                          className="font-[300] text-[#F5F0EB]/88 text-sm"
                          style={{ letterSpacing: "0.02em" }}
                        >
                          {it.customer_name}
                        </span>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4">
                        <span
                          className="font-[200] text-[#F5F0EB]/35 text-xs"
                          style={{ letterSpacing: "0.04em" }}
                        >
                          {it.customer_email}
                        </span>
                      </td>

                      {/* Dates */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="font-[200] text-[#F5F0EB]/45 text-xs"
                          style={{ letterSpacing: "0.04em" }}
                        >
                          {fmtDate(it.arrival_date)}
                          <span className="text-[#D4AF37]/25 mx-1.5">→</span>
                          {fmtDate(it.departure_date)}
                        </span>
                      </td>

                      {/* Status badge */}
                      <td className="px-6 py-4">
                        <StatusBadge status={it.status} />
                      </td>

                      {/* Timestamp */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="font-[200] text-[#F5F0EB]/25 text-xs"
                          style={{ letterSpacing: "0.04em" }}
                        >
                          {fmtTimestamp(it.created_at)}
                        </span>
                      </td>

                      {/* Open caret */}
                      <td className="px-6 py-4 text-right">
                        <span
                          className="font-[200] text-[#D4AF37]/20 text-[10px] uppercase group-hover:text-[#D4AF37]/60 transition-colors duration-200"
                          style={{ letterSpacing: "0.14em" }}
                        >
                          Open →
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="mt-10 flex items-center justify-between">
          <div className="w-8 h-px bg-[#D4AF37]/15" />
          <p
            className="font-[200] text-[#F5F0EB]/10 text-[9px] uppercase"
            style={{ letterSpacing: "0.2em" }}
          >
            DoItInPR · Concierge Operations · Internal Use Only
          </p>
          <div className="w-8 h-px bg-[#D4AF37]/15" />
        </div>
      </main>

      {/* Detail drawer */}
      <DetailDrawer
        itinerary={activeItinerary}
        onClose={() => setActiveItinerary(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
