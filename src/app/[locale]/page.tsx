import { redirect, RedirectType } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/pokemons`, RedirectType.replace);
}
