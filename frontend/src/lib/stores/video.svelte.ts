import { browser } from '$app/environment';

class VideoStore {
  blobUrl = $state<string | null>(null);
  fileName = $state<string | null>(null);
  subtitleName = $state<string | null>(null);

  setVideo(file: File) {
    if (this.blobUrl) URL.revokeObjectURL(this.blobUrl);
    this.blobUrl = URL.createObjectURL(file);
    this.fileName = file.name;
    this.subtitleName = null;
  }

  clearVideo() {
    if (this.blobUrl) URL.revokeObjectURL(this.blobUrl);
    this.blobUrl = null;
    this.fileName = null;
    this.subtitleName = null;
  }
}

export const videoStore = new VideoStore();
