"use client";

import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { pokemonClassNames } from "@/utils/pokemonClasses";

export interface PokeTypeLabelProps {
  type: string;
  variant?: "solid" | "outline";
  disabledHover?: boolean;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  onClick?: (type: string) => void;
}

export const PokeTypeLabel = ({
  type,
  variant = "solid",
  disabledHover = false,
  className,
  onClick,
}: PokeTypeLabelProps) => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTypeClass =
    pokemonClassNames[type.toLowerCase()] || pokemonClassNames.default;

  return (
    <button
      onClick={(event) => {
        if (onClick) {
          event.preventDefault();
          onClick(type);
        } else {
          router.push(
            `/pokemons${searchParams.get("type") !== type ? `?type=${type}` : ""}`,
          );
        }
      }}
      className={`type-label flex h-8 cursor-pointer items-center justify-center border-white transition-colors hover:shadow-lg ${variant === "solid" ? `text-white ring-white ${disabledHover ? "outline-1" : "outline-offset-2 hover:ring-1 hover:outline-1"} ${currentTypeClass.backgroundColor} ${currentTypeClass.outlineColor}` : `bg-transparent outline-1 ${currentTypeClass.textColor}`} ${className || ""}`}
    >
      {t(type.toLowerCase())}
    </button>
  );
};
