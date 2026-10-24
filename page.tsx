import { AlertBanner } from "@/Component/AlertBanner";
import { DateRangePicker } from "@/Component/DateRangePicker";
import { ExportButton } from "@/Component/ExportButton";
import { NetworkHealth } from "@/Component/NetworkHealth";
import { PageHeader } from "@/Component/PageHeader";
import { StatGrid } from "@/Component/StatCard";
import { TransactionTable } from "@/Component/TransactionTable";
import { VolumeChart } from "@/Component/VolumeChart";
import { kpis, networks, transactions, volumeSeries } from "@/lib/data";

export default function OverviewPage() {
  return (
    <>
      <PageHeader
        title="Overview"
        subtitle="Your payment operations, at a glance."
        actions={
          <>
            <DateRangePicker options={["Oct 1 – 17, 2026", "Last 7 days", "Last 30 days"]} />
            <ExportButton />
          </>
        }
      />

      <StatGrid items={kpis} />

      <section className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <VolumeChart data={volumeSeries} />
        <NetworkHealth networks={networks} />
      </section>

      <AlertBanner
        title="1 webhook needs attention"
        message="payment.confirmed delivery failed for PM-1047. Your payments are unaffected."
        actionLabel="Review delivery"
        actionToast="Webhook delivery details opened"
      />

      <TransactionTable rows={transactions} className="mt-6" />

      <footer className="mt-6 flex flex-wrap justify-between gap-2 text-[11px] uppercase tracking-wide text-mute">
        <span>Paymesh / Infrastructure for what&apos;s next</span>
        <span className="normal-case tracking-normal">Fictional product · Oct 17, 2026 snapshot.</span>
      </footer>
    </>
  );
}
