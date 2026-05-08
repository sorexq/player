<script lang="ts">
  import { videoStore } from '$lib/stores/video.svelte';
  import { goto } from '$app/navigation';

  function handleFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files?.[0]) {
      videoStore.setVideo(input.files[0]);
      goto('/player');
    }
  }
</script>

<div role="button" tabindex="0" class="card" style="max-width:700px; width:100%; margin:2rem auto; padding:5rem 3rem; text-align:center; background:linear-gradient(135deg, var(--bg-soft), var(--bg)); border:2px dashed var(--bg-hover); cursor:pointer; animation:fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);" onmouseenter={(e) => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.background='var(--bg-soft)'; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='var(--shadow-lg), var(--shadow-glow)'; }} onmouseleave={(e) => { e.currentTarget.style.borderColor='var(--bg-hover)'; e.currentTarget.style.background='linear-gradient(135deg, var(--bg-soft), var(--bg))'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='var(--shadow-sm)'; }} onclick={() => document.getElementById('video-upload')?.click()} onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') document.getElementById('video-upload')?.click(); }}>
  <div style="font-size:4rem; margin-bottom:1.5rem; animation:pulse 2s ease-in-out infinite;">🎬</div>
  <h2 style="color:var(--fg); margin:0 0 1rem 0; font-weight:700; font-size:1.75rem; letter-spacing:-0.5px;">Upload Local Video</h2>
  <p style="color:var(--fg-soft); margin:0 auto 2rem auto; max-width:500px; font-size:0.9375rem; line-height:1.6;">Select a video file for one-time viewing experience. <strong style="color:var(--accent);">No server storage</strong> - your privacy matters.</p>
  <input type="file" accept="video/*" onchange={handleFileSelect} style="display:none;" id="video-upload" />
  <button style="background:linear-gradient(135deg, var(--accent), var(--accent-hover)); color:var(--bg); padding:0.875rem 3rem; border-radius:var(--radius-xl); cursor:pointer; font-weight:600; font-size:1rem; transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow:0 4px 16px var(--accent-glow); display:inline-flex; align-items:center; gap:0.5rem;" onmouseenter={(e) => { e.currentTarget.style.transform='translateY(-2px) scale(1.02)'; e.currentTarget.style.boxShadow='0 6px 24px var(--accent-glow)'; }} onmouseleave={(e) => { e.currentTarget.style.transform='translateY(0) scale(1)'; e.currentTarget.style.boxShadow='0 4px 16px var(--accent-glow)'; }}>
    📁 Select Video File
  </button>
</div>
