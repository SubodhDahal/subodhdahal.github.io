---
title: "Getting Handy speech-to-text to type on NixOS and COSMIC, and to use my eGPU"
description: "Handy's shortcut did nothing, and after I fixed that, nothing got typed. A Wayland shortcut, a microphone, the paste method and an autostart file caused it, and the GPU did not."
canonical_url: "https://subodhdahal.com/blog/handy-speech-to-text-nixos-cosmic-egpu/"
---

> Index of every page on this site: [llms.txt](https://subodhdahal.com/llms.txt)

I installed [Handy](https://github.com/cjpais/Handy), an offline speech-to-text app, on NixOS and pressed the shortcut. The tray icon stayed a hand and nothing happened. During onboarding the shortcut did fire and Handy copied the transcript to the clipboard, but the transcript never appeared in the onboarding textbox. After onboarding, nothing worked at all.

For context, here's my setup: NixOS with kernel 6.18, COSMIC on Wayland, Handy 0.10.1 with the `parakeet-unified-en-0.6b` model, and an RTX 3060 Ti in a Thunderbolt enclosure (see [the eGPU hotplug post](https://subodhdahal.com/blog/razer-core-x-egpu-hotplug-nixos)).

## Intel was 5x slower than the eGPU, but slow still works

Initially I suspected the issue to be with my Intel iGPU. I thought it was so slow in converting speech to text that it ran into a timeout. So I benchmarked with `handy -f clip.wav --json --repeat 3`, which transcribes a file without the shortcut or microphone. My session had `VK_LOADER_DRIVERS_SELECT=*intel*` set, so Handy only saw the Intel iGPU. For a 2.3 second clip, Intel took about 930 ms and the RTX 3060 Ti about 173 ms. Live in the app on Intel, 7 seconds of audio took 16.5 seconds. That is slow, but slow still produces text, and I was getting none.

## The real causes, in the order I hit them

### The global shortcut only fires in XWayland windows

Handy registers its shortcut through X11, which on Wayland only receives keys while an XWayland window has focus. That is why it worked during onboarding, when Handy's own window had focus.

The fix is to let the compositor own the shortcut and call Handy's CLI. On COSMIC, custom shortcuts live in `~/.config/cosmic/com.system76.CosmicSettings.Shortcuts/v1/custom`. Bind a key to this `Spawn` action:

```text
Spawn("handy --toggle-transcription")
```

### The default microphone clipped at full scale

With the shortcut working, I still got an empty result, and Handy's log said `0 voiced`. The default source was the laptop's built-in input. I recorded each source and measured it:

```bash
parecord --device=<source-name> test.wav
ffmpeg -i test.wav -af volumedetect -f null - 2>&1 | grep mean_volume
```

The built-in input read a mean of about -0.6 dB, pinned at full scale. Switching the default to the Logitech BRIO fixed it:

```bash
pactl set-default-source <brio-source-name>
```

### Pasting can't reach Wayland-native windows

Now Handy transcribed correctly but typed nothing, just like in onboarding, where the clipboard got the text and the textbox didn't. It pastes with Shift+Insert through XWayland, which can't reach Wayland-native windows (the same boundary as the shortcut).

COSMIC accepts virtual-keyboard input, so `wtype` can type directly. I added `wtype` to the FHS environment that wraps Handy, then set these in `~/.local/share/com.pais.handy/settings_store.json`:

```json
{
  "paste_method": "direct",
  "typing_tool": "wtype"
}
```

### The autostart entry bypassed my eGPU wrapper

I run Handy through `egpu-prefer`, a small helper that forces the NVIDIA Vulkan driver. But `~/.config/autostart/Handy.desktop` launched the raw binary, so after a reboot Handy was back on Intel. The fix is one line:

```ini
Exec=egpu-prefer handy --start-hidden
```

## Conclusion

Handy now types into COSMIC windows from a compositor shortcut, hears the right microphone, and starts on the eGPU. Every failure was on the trigger or the output side.

I haven't timed live dictation on the eGPU, so the numbers above come from the file benchmark. In daily use it feels instant.

## Sitemap

See the full [sitemap](https://subodhdahal.com/sitemap.md) for all pages.
