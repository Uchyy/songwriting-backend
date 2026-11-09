
import { useEffect, useRef, useState, type FormEvent } from "react";

import type { Song, SongMedia, SongStatus } from "../models/Song";
import {
  createSong,
  updateSong,
} from "../api.ts/SongService";
import type { NewSong } from "../api.ts/SongService";
import { uploadFile } from "../api.ts/StorageService";
import AudioManager from "./AudioManager";

interface SongFormProps {
  song?: Song | null;
}

function SongForm({ song }: SongFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const isEditing = Boolean(song);

  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState<SongStatus>("DEMO");

  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [artworkProgress, setArtworkProgress] = useState(0);

  const [story, setStory] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [published, setPublished] = useState(false);

  const [media, setMedia] = useState<SongMedia[]>([]);
  const [songFolderId] = useState(() => crypto.randomUUID());

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Populate the form when a song is supplied for editing.
  useEffect(() => {
    if (song) {
      setTitle(song.title);
      setLabel(song.label);
      setDescription(song.description);
      setGenre(song.genre.join(", "));
      setStatus(song.status);

      setStory(song.story ?? "");
      setLyrics(song.lyrics ?? "");
      setExternalLink(song.externalLink ?? "");
      setPublished(song.published);

      setMedia(song.media ?? []);
      setArtworkFile(null);
    } else {
      setTitle("");
      setLabel("");
      setDescription("");
      setGenre("");
      setStatus("DEMO");

      setStory("");
      setLyrics("");
      setExternalLink("");
      setPublished(false);

      setMedia([]);
      setArtworkFile(null);
    }

    setError("");
    setSuccess("");
    setArtworkProgress(0);
  }, [song]);

  function safeFileName(fileName: string) {
    return fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!artworkFile && !song?.artwork) {
      setError("Please select song artwork.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");
    setArtworkProgress(0);

    try {
      const folder = published ? "public" : "private";

      // Use the existing song ID when editing.
      const folderId = song?.id ?? songFolderId;
      const songFolder = `${folder}/songs/${folderId}`;

      // Keep existing artwork unless a new file is selected.
      let artworkUrl = song?.artwork ?? "";

      if (artworkFile) {
        artworkUrl = await uploadFile(
          artworkFile,
          `${songFolder}/artwork/${crypto.randomUUID()}-${safeFileName(
            artworkFile.name
          )}`,
          setArtworkProgress
        );
      }

      const songData: NewSong = {
        title,
        label,
        description,
        genre: genre
          .split(",")
          .map(item => item.trim())
          .filter(Boolean),
        status,
        artwork: artworkUrl,
        story,
        lyrics,
        externalLink,
        published,
        media,
      };

      if (song) {
        await updateSong(song.id, songData);
        setSuccess("Song updated successfully!");
      } else {
        await createSong(songData);
        setSuccess("Song created successfully!");

        // Reset only after creating a new song.
        setTitle("");
        setLabel("");
        setDescription("");
        setGenre("");
        setStatus("DEMO");

        setArtworkFile(null);
        setArtworkProgress(0);

        setStory("");
        setLyrics("");
        setExternalLink("");
        setPublished(false);

        setMedia([]);
        formRef.current?.reset();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save song."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Song title */}
      <div>
        <label className="mb-2 block font-label text-sm">
          Song title
        </label>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="w-full rounded-lg border border-beige bg-white p-3"
        />
      </div>

      {/* Label / Slug */}
      <div>
        <label className="mb-2 block font-label text-sm">
          Label / Slug
        </label>

        <input
          value={label}
          onChange={e => setLabel(e.target.value)}
          placeholder="lady-in-red"
          required
          className="w-full rounded-lg border border-beige bg-white p-3"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block font-label text-sm">
          Description
        </label>

        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          rows={3}
          className="w-full rounded-lg border border-beige bg-white p-3"
        />
      </div>

      {/* Genres */}
      <div>
        <label className="mb-2 block font-label text-sm">
          Genres
        </label>

        <input
          value={genre}
          onChange={e => setGenre(e.target.value)}
          placeholder="Jazz, Blues, Pop"
          required
          className="w-full rounded-lg border border-beige bg-white p-3"
        />

        <p className="mt-1 text-xs text-espresso-light">
          Separate genres with commas.
        </p>
      </div>

      {/* Status */}
      <div>
        <label className="mb-2 block font-label text-sm">
          Status
        </label>

        <select
          value={status}
          onChange={e =>
            setStatus(e.target.value as SongStatus)
          }
          className="w-full rounded-lg border border-beige bg-white p-3"
        >
          <option value="DEMO">Demo</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* Artwork */}
      <section className="space-y-3 rounded-xl border border-beige p-4">
        <h3 className="font-label text-sm font-semibold">
          Song artwork
        </h3>

        {song?.artwork && !artworkFile && (
          <div className="space-y-2">
            <img
              src={song.artwork}
              alt={`${song.title} artwork`}
              className="h-32 w-32 rounded-lg object-cover"
            />

            <p className="text-xs text-espresso-light">
              Current artwork
            </p>
          </div>
        )}

        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          required={!song?.artwork}
          onChange={e =>
            setArtworkFile(e.target.files?.[0] ?? null)
          }
          className="w-full text-sm"
        />

        {artworkFile && (
          <div className="space-y-2">
            <p className="text-xs text-espresso-light">
              New artwork: {artworkFile.name}
            </p>

            {saving && (
              <>
                <progress
                  value={artworkProgress}
                  max={100}
                  className="w-full"
                />

                <p className="text-xs text-espresso-light">
                  Uploading artwork: {artworkProgress}%
                </p>
              </>
            )}
          </div>
        )}
      </section>

      {/* Audio manager */}
      <AudioManager
        media={media}
        onChange={setMedia}
        storageFolder={`${
          published ? "public" : "private"
        }/songs/${song?.id ?? songFolderId}`}
      />

      {/* Song story */}
      <div>
        <label className="mb-2 block font-label text-sm">
          Song story
        </label>

        <textarea
          value={story}
          onChange={e => setStory(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-beige bg-white p-3"
        />
      </div>

      {/* Lyrics */}
      <div>
        <label className="mb-2 block font-label text-sm">
          Lyrics
        </label>

        <textarea
          value={lyrics}
          onChange={e => setLyrics(e.target.value)}
          rows={6}
          className="w-full rounded-lg border border-beige bg-white p-3"
        />
      </div>

      {/* External link */}
      <div>
        <label className="mb-2 block font-label text-sm">
          External link
        </label>

        <input
          type="url"
          value={externalLink}
          onChange={e => setExternalLink(e.target.value)}
          className="w-full rounded-lg border border-beige bg-white p-3"
        />
      </div>

      {/* Publish */}
      <label className="flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={published}
          onChange={e => setPublished(e.target.checked)}
          className="accent-gold"
        />

        Publish this song
      </label>

      {/* Messages */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {success && (
        <p className="text-sm text-green-700">{success}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-full bg-gold px-6 py-3 font-body text-sm font-bold text-espresso transition hover:bg-gold-muted disabled:opacity-50"
      >
        {saving
          ? "Saving..."
          : isEditing
            ? "Save changes"
            : "Save song"}
      </button>
    </form>
  );
}

export default SongForm;
