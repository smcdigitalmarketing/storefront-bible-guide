import {
  BookmarkIcon,
  BookOpenIcon,
  ClockIcon,
  GiftIcon,
  LandmarkIcon,
  PenLineIcon,
  SparklesIcon,
  TypeIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";

import type { IconName } from "~/content/types";

/** The lucide icon behind each `IconName` in the brand copy (bullets, callouts). */
export const featureIcons: Record<IconName, LucideIcon> = {
  book: BookOpenIcon,
  // Who wrote it, when and why: the background behind each book.
  context: LandmarkIcon,
  clock: ClockIcon,
  pen: PenLineIcon,
  group: UsersIcon,
  gift: GiftIcon,
  ribbon: BookmarkIcon,
  type: TypeIcon,
  sparkle: SparklesIcon,
};
