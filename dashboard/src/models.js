// kie.ai models this dashboard supports. Each entry knows the exact
// `model` string kie.ai expects and builds its `input` object from just
// the prompt — extra fields are pinned to sensible defaults for now.
// (Image/reference inputs like first_frame_url are skipped for this first
// version, per the beginner-first spec.)
export const MODELS = {
  "gpt-image-2-text-to-image": {
    label: "GPT Image 2 (image)",
    mediaType: "image",
    buildInput: (prompt) => ({ prompt, aspect_ratio: "auto" }),
  },
  "bytedance/seedance-2": {
    label: "Seedance 2.0 (video)",
    mediaType: "video",
    buildInput: (prompt) => ({
      prompt,
      resolution: "720p",
      aspect_ratio: "16:9",
      duration: 15,
      generate_audio: false,
    }),
  },
};
