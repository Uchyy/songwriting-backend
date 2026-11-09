
import { useState } from "react";
import type { SongMedia } from "../models/Song";
import {
  uploadFile,
  deleteUploadedFile,
} from "../api.ts/StorageService";

type AudioManagerProps = {
  media: SongMedia[];
  onChange: (media: SongMedia[]) => void;
  storageFolder: string;
};

function AudioManager({
  media,
  onChange,
  storageFolder,
}: AudioManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [mediaType, setMediaType] = useState<SongMedia["mediaType"]>("DEMO");
  const [label, setLabel] = useState("");
  const [duration, setDuration] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function resetEntry() {
    setIsAdding(false);
    setMediaType("DEMO");
    setLabel("");
    setDuration("");
    setFile(null);
    setProgress(0);
    setError("");
  }

  async function saveAudio() {
    if (!file || !label.trim()) {
      setError("Please enter a label and select an audio file.");
      return;
    }

    setUploading(true);
    setError("");
    setProgress(0);

    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const path = `${storageFolder}/audio/${crypto.randomUUID()}-${safeName}`;

      const audioUrl = await uploadFile(file, path, setProgress);

      const newMedia: SongMedia = {
        id: crypto.randomUUID(),
        mediaType,
        label: label.trim(),
        audioUrl,
        duration: duration || undefined,
      };

      onChange([...media, newMedia]);
      resetEntry();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Audio upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  }

  async function removeAudio(item: SongMedia) {
    try {
      await deleteUploadedFile(item.audioUrl);
      onChange(media.filter(audio => audio.id !== item.id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to remove audio."
      );
    }
  }

  return (
    <section className="space-y-4 rounded-xl border border-beige p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-label text-sm font-semibold">
            Audio versions
          </h3>
          <p className="mt-1 text-xs text-espresso-light">
            Add recordings such as demos and instrumentals.
          </p>
        </div>

        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="rounded-full bg-espresso px-4 py-2 text-xs text-ivory"
          >
            + Add audio
          </button>
        )}
      </div>

      {media.length > 0 && (
        <div className="space-y-2">
          {media.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-lg bg-white border border-beige p-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-xs text-espresso-light">
                  {item.mediaType.replace("_", " ")}
                  {item.duration && ` · ${item.duration}`}
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeAudio(item)}
                disabled={uploading}
                className="text-xs text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {media.length === 0 && !isAdding && (
        <p className="text-sm text-espresso-light">
          No audio versions added yet.
        </p>
      )}

      {isAdding && (
        <div className="space-y-3 rounded-lg border border-beige bg-white p-4">
          <div>
            <label className="mb-1 block text-xs">Audio type</label>
            <select
              value={mediaType}
              onChange={e =>
                setMediaType(e.target.value as SongMedia["mediaType"])
              }
              disabled={uploading}
              className="w-full rounded-lg border border-beige p-3"
            >
              <option value="DEMO">Demo</option>
              <option value="INSTRUMENTAL">Instrumental</option>
              <option value="FULL">Full recording</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs">Version label</label>
            <input
              value={label}
              onChange={e => setLabel(e.target.value)}
              placeholder="e.g. Original vocal demo"
              disabled={uploading}
              className="w-full rounded-lg border border-beige p-3"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs">
              Audio file
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={e => setFile(e.target.files?.[0] ?? null)}
              disabled={uploading}
              className="w-full text-sm"
            />
            {file && (
              <p className="mt-1 text-xs text-espresso-light">
                {file.name}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs">
              Duration (optional)
            </label>
            <input
              value={duration}
              onChange={e => setDuration(e.target.value)}
              placeholder="3:45"
              disabled={uploading}
              className="w-full rounded-lg border border-beige p-3"
            />
          </div>

          {uploading && (
            <div className="space-y-1">
              <progress
                value={progress}
                max={100}
                className="w-full"
              />
              <p className="text-xs text-espresso-light">
                Uploading audio: {progress}%
              </p>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={resetEntry}
              disabled={uploading}
              className="rounded-full border border-beige px-4 py-2 text-xs"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={saveAudio}
              disabled={uploading}
              className="rounded-full bg-espresso px-4 py-2 text-xs text-ivory disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Save audio"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default AudioManager;
