export interface Song {
  id: string;
  title: string;
  label: string; // Usually something like lady-in-red
  description: string;
  genre: string[];
  status: SongStatus;
  artwork: string;

  story?: string;
  diary?: string[];

  lyrics?: string;
  media: SongMedia[];

  externalLink?: string;
  createdAt: string;
  published: boolean;
}

export type SongStatus = "DEMO" | "IN_PROGRESS" | "COMPLETED";

export interface SongMedia {
  id: string;
  mediaType: "DEMO" | "INSTRUMENTAL" | "FULL";
  label: string;
  audioUrl: string;
  duration?: string;
}