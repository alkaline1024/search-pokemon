import { useTranslations } from "next-intl";
import { PokeTypeLabel } from "./PokeTypeLabel";

export const AttackTable = ({
  attacks,
  attackType,
}: {
  attacks: IPokemonAttack["fast"] | IPokemonAttack["special"];
  attackType: "fast" | "special";
}) => {
  const t = useTranslations();
  return (
    <table className="w-full table-auto text-start">
      <thead>
        <tr className="border-b border-gray-300 text-gray-800">
          <td className="w-2/3 py-2 font-semibold">
            {t("AttackTable.attack-type-with-count", {
              type: attackType,
              count: attacks.length,
            })}
          </td>
          <td>{t("AttackTable.type")}</td>
          <td>{t("AttackTable.damage")}</td>
        </tr>
      </thead>
      <tbody>
        {attacks.map((attack) => (
          <tr key={attack.name}>
            <td>{attack.name}</td>
            <td>
              <div className="flex">
                <PokeTypeLabel
                  className="mx-[2px] my-[2px]"
                  type={attack.type}
                />
              </div>
            </td>
            <td>{attack.damage}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};