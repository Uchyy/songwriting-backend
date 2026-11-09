
import type { Song } from "../models/Song";
import { apiRequest } from "./service";

// Get all songs, including drafts
export async function getAdminSongs(): Promise<Song[]> {
  return apiRequest<Song[]>("/api/songs/admin");
}

// Create a new song
export type NewSong = Omit<Song, "id" | "createdAt">;
export async function createSong(song: NewSong): Promise<Song> {
  return apiRequest<Song>("/api/songs", {
    method: "POST",
    body: JSON.stringify(song),
  });
}

// Update an existing song
export async function updateSong(id: string,song: NewSong): Promise<Song> {
  return apiRequest<Song>(`/api/songs/${id}`, {
    method: "PUT",
    body: JSON.stringify(song),
  });
}

// Delete a song
export async function deleteSong(id: string): Promise<void> {
  return apiRequest<void>(`/api/songs/${id}`, {
    method: "DELETE",
  });
}
