import Image from "next/image";
import Link from "next/link";

export const AppButton = () => {
  return (
    <Link
      href="/pokemons"
      className="mx-auto flex items-center gap-2 rounded bg-white px-4 py-2 font-semibold shadow"
    >
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={24}
        height={24}
        className="h-[24px] w-[24px]"
      />
      <p>
        <span className="text-primary-500">Search</span> Pokémon
      </p>
    </Link>
  );
};
