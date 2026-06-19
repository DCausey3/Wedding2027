import type { Metadata } from "next";
import { getAllGuests } from "@/lib/data-client";
import { GuestTable } from "@/components/admin/GuestTable";

export const metadata: Metadata = { title: "Guests | Admin" };
export const revalidate = 30;

export default async function GuestsPage() {
  const guests = await getAllGuests();

  return (
    <div>
      <div className="mb-8">
        <p className="label-overline text-sand mb-1">Admin Portal</p>
        <h1 className="font-serif text-3xl font-light text-dark">Guest List</h1>
        <p className="text-sm text-dark/50 mt-1">{guests.length} guests total</p>
      </div>
      <GuestTable guests={guests as any} />
    </div>
  );
}
