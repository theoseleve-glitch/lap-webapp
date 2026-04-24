import { ActivePrescriptionsList, type ActivePrescriptionItem } from "./ActivePrescriptionsList";
import { ArchetypeBadge } from "./ArchetypeBadge";
import { DriverScoreCard, type DriverScoreCardProps } from "./DriverScoreCard";
import { OpenWeaknessesList, type OpenWeaknessItem } from "./OpenWeaknessesList";
import { ReadinessGauge, type ReadinessGaugeProps } from "./ReadinessGauge";
import { SkillRadarChart, type SkillDimension } from "./SkillRadarChart";

export interface ProfileLayoutProps {
  score: DriverScoreCardProps;
  skillDimensions: readonly SkillDimension[];
  weaknesses: readonly OpenWeaknessItem[];
  prescriptions: readonly ActivePrescriptionItem[];
  readiness: ReadinessGaugeProps;
  archetype?: string | null;
  archetypeCohortSize?: number;
}

export function ProfileLayout({
  score,
  skillDimensions,
  weaknesses,
  prescriptions,
  readiness,
  archetype,
  archetypeCohortSize,
}: ProfileLayoutProps) {
  return (
    <div data-layout="profile" className="flex flex-col gap-6 print:bg-white print:text-black">
      <header
        data-layout="profile-hero"
        className="grid gap-4 md:grid-cols-[2fr_1fr] md:items-start print:break-inside-avoid"
      >
        <DriverScoreCard {...score} />
        {archetype !== undefined && (
          <div className="flex items-start">
            <ArchetypeBadge archetype={archetype} cohortSize={archetypeCohortSize} />
          </div>
        )}
      </header>

      <SkillRadarChart dimensions={skillDimensions} />

      <div
        data-layout="profile-columns"
        className="grid gap-4 md:grid-cols-3 print:grid-cols-3 print:break-inside-avoid"
      >
        <OpenWeaknessesList weaknesses={weaknesses} />
        <ActivePrescriptionsList prescriptions={prescriptions} />
        <ReadinessGauge {...readiness} />
      </div>
    </div>
  );
}
