import Link from "next/link";

export default function StatCard({ title, value, subtitle, color, href }) {
  return (
    <Link href={href}>
      <div className={`p-6 rounded-xl text-white ${color} cursor-pointer`}>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm opacity-90">{subtitle}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
    </Link>
  );
}
