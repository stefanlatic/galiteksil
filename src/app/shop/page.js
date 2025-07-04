// u src/app/shop/page.js
'use client'
import { useSearchParams } from 'next/navigation';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // ... koristi `searchQuery` da filtriraš proizvode
}
