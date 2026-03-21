"use client";
import { useState } from "react";
import { motion } from "framer-motion";

function LineChart({ datasets }: { datasets: { label: string; data: number[]; color: string }[] }) {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const allVals = datasets.flatMap(d => d.data);
  const max = Math.max(...allVals);
  const min = Math.min(...allVals);
  const W = 560, H = 160;
  return (
    <div className="overflow-x-auto">
      <svg width="100%" viewBox={`0 0 ${W} ${H + 30}`} style={{ minWidth: "320px" }}>
        {/* Grid lines */}
        {[0,1,2,3,4].map(i => {
          const y = (i / 4) * H;
          return <line key={i} x1="0" y1={y} x2={W} y2={y} stroke="rgba(200,146,15,0.06)" strokeWidth="1" />;
        })}
        {/* Lines */}
        {datasets.map((ds) => {
          const pts = ds.data.map((v, i) => {
            const x = (i / 11) * (W - 20) + 10;
            const y = H - ((v - min) / (max - min || 1)) * (H - 20) - 10;
            return `${x},${y}`;
          }).join(" ");
          return (
            <g key={ds.label}>
              <polyline points={pts} fill="none" stroke={ds.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              {ds.data.map((v, i) => {
                const x = (i / 11) * (W - 20) + 10;
                const y = H - ((v - min) / (max - min || 1)) * (H - 20) - 10;
                return <circle key={i} cx={x} cy={y} r="3" fill={ds.color} />;
              })}
            </g>
          );
        })}
        {/* X labels */}
        {months.map((m, i) => {
          const x = (i / 11) * (W - 20) + 10;
          return <text key={m} x={x} y={H + 20} textAnchor="middle" style={{ fontSize: "9px", fill: "rgba(240,240,242,0.35)" }}>{m}</text>;
        })}
      </svg>
    </div>
  );
}

function GeoBar({ data }: { data: { country: string; value: number; pct: number }[] }) {
  return (
    <div className="space-y-3">
      {data.map(({ country, value, pct }) => (
        <div key={country}>
          <div className="flex justify-between text-xs mb-1.5">
            <span style={{ color: "var(--text-secondary)" }}>{country}</span>
            <span className="font-medium" style={{ color: "var(--gold-light)" }}>${(value/1000).toFixed(0)}K</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(200,146,15,0.1)" }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#c8920f,#e4b020)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("2025");

  const REVENUE_DATA = [820, 940, 1100, 980, 1250, 1380, 1240, 1580, 1420, 1190, 1050, 1350].map(v => v * 1000);
  const BOOKINGS_DATA = [42, 55, 68, 61, 79, 88, 76, 95, 84, 71, 62, 80];

  const TOP_DESTINATIONS = [
    { dest: "Maldives", bookings: 48, revenue: 278400, growth: 22 },
    { dest: "Santorini", bookings: 42, revenue: 188600, growth: 15 },
    { dest: "Kyoto", bookings: 38, revenue: 176200, growth: 31 },
    { dest: "Patagonia", bookings: 29, revenue: 243800, growth: 18 },
    { dest: "Amalfi Coast", bookings: 35, revenue: 154000, growth: 9 },
  ];

  const GEO_DATA = [
    { country: "United States", value: 4200000, pct: 100 },
    { country: "United Kingdom", value: 2800000, pct: 67 },
    { country: "France", value: 1900000, pct: 45 },
    { country: "Germany", value: 1400000, pct: 33 },
    { country: "Australia", value: 980000, pct: 23 },
    { country: "Japan", value: 760000, pct: 18 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>Analytics</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Performance insights and trends</p>
        </div>
        <div className="flex gap-2">
          {["2023","2024","2025"].map(y => (
            <button key={y} onClick={() => setPeriod(y)} className="px-4 py-2 rounded-lg text-xs font-medium transition-all"
              style={{ background: period === y ? "linear-gradient(135deg,#c8920f,#e4b020)" : "rgba(200,146,15,0.05)", color: period === y ? "#02020a" : "var(--text-muted)", border: "1px solid rgba(200,146,15,0.1)" }}>
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Revenue", value: "$14.3M", change: "+18.4%", positive: true },
          { label: "Total Bookings", value: "861", change: "+24.2%", positive: true },
          { label: "Avg. Booking Value", value: "$4,370", change: "+6.8%", positive: true },
          { label: "Cancellation Rate", value: "6.3%", change: "-1.2%", positive: true },
        ].map(({ label, value, change, positive }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="rounded-xl p-5" style={{ background: "var(--surface)", border: "1px solid rgba(200,146,15,0.08)" }}>
            <div className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>{label}</div>
            <div className="text-2xl font-light mb-1" style={{ fontFamily: "var(--font-cormorant)" }}>{value}</div>
            <span className="text-xs font-medium" style={{ color: positive ? "#10b981" : "#f09595" }}>{change} vs last year</span>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="rounded-2xl p-5 sm:p-6" style={{ background: "var(--surface)", border: "1px solid rgba(200,146,15,0.08)" }}>
          <h3 className="text-lg font-medium mb-1">Revenue & Bookings</h3>
          <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>Monthly trends for {period}</p>
          <LineChart datasets={[
            { label: "Revenue", data: REVENUE_DATA.map(v => v / 100000), color: "#c8920f" },
            { label: "Bookings", data: BOOKINGS_DATA, color: "#00d4ff" },
          ]} />
          <div className="flex gap-4 mt-4">
            {[{ label: "Revenue", color: "#c8920f" }, { label: "Bookings", color: "#00d4ff" }].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                <div className="w-3 h-0.5 rounded" style={{ background: color }} />{label}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-5 sm:p-6" style={{ background: "var(--surface)", border: "1px solid rgba(200,146,15,0.08)" }}>
          <h3 className="text-lg font-medium mb-1">Revenue by Country</h3>
          <p className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>Top 6 markets by booking value</p>
          <GeoBar data={GEO_DATA} />
        </div>
      </div>

      {/* Top Destinations */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid rgba(200,146,15,0.08)" }}>
        <div className="px-5 sm:px-6 py-5 border-b" style={{ borderColor: "rgba(200,146,15,0.06)" }}>
          <h3 className="text-lg font-medium">Top Destinations</h3>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Ranked by total revenue</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: "500px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(200,146,15,0.06)" }}>
                {["#","Destination","Bookings","Revenue","YoY Growth","Share"].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-medium tracking-wider uppercase" style={{ color: "var(--text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOP_DESTINATIONS.map((d, i) => {
                const totalRev = TOP_DESTINATIONS.reduce((s, x) => s + x.revenue, 0);
                const pct = (d.revenue / totalRev * 100).toFixed(1);
                return (
                  <motion.tr key={d.dest} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.07 }}
                    style={{ borderBottom: "1px solid rgba(200,146,15,0.04)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(200,146,15,0.02)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                    <td className="px-5 py-4 text-sm" style={{ color: "var(--text-muted)" }}>#{i+1}</td>
                    <td className="px-5 py-4 text-sm font-medium">{d.dest}</td>
                    <td className="px-5 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>{d.bookings}</td>
                    <td className="px-5 py-4 text-sm font-medium" style={{ color: "var(--gold-light)" }}>${d.revenue.toLocaleString()}</td>
                    <td className="px-5 py-4"><span className="text-xs font-medium" style={{ color: "#10b981" }}>↑ {d.growth}%</span></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(200,146,15,0.1)", maxWidth: "80px" }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#c8920f,#e4b020)" }} />
                        </div>
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{pct}%</span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
