<script lang="ts">
  import { Switch } from "@skeletonlabs/skeleton-svelte";
  import { onMount } from "svelte";

  let checked = false;
  let selectedTheme = ["concord"];
  let mounted = false;

  onMount(() => {
    checked = document.documentElement.getAttribute("data-mode") === "dark";
    selectedTheme = [
      document.documentElement.getAttribute("data-theme") || "concord",
    ];
    mounted = true;
  });

  const onCheckedChange = (event: { checked: boolean }) => {
    const mode = event.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-mode", mode);
    localStorage.setItem("mode", mode);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(mode);
    checked = event.checked;
  };

  interface ComboboxData {
    label: string;
    value: string;
    emoji: string;
  }

  const comboboxData: ComboboxData[] = [
    { value: "wintry", label: "Wintry", emoji: "❄️" },
    { value: "nosh", label: "Nosh", emoji: "🥙" },
    { value: "rose", label: "Rose", emoji: "🌹" },
    { value: "pine", label: "Pine", emoji: "🌲" },
    { value: "cerberus", label: "Cerberus", emoji: "🔥" },
    { value: "terminus", label: "Terminus", emoji: "🚉" },
    { value: "rocket", label: "Rocket", emoji: "🚀" },
    { value: "mona", label: "Mona", emoji: "🐱" },
    { value: "concord", label: "Concord", emoji: "🎨" },
  ];

  function onThemeChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    const value = target.value;
    selectedTheme = [value];
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem("color-theme", value);
  }
</script>

<div
  class="w-72 sm:w-96 md:w-[32rem] lg:w-40 flex flex-row space-x-4 p-4 sm:p-6 md:p-8 lg:p-0 text-xl sm:text-2xl md:text-3xl lg:text-base"
>
  <div class="scale-250 lg:scale-100 mt-4 lg:mt-0">
    <Switch
      name={mounted ? "mode" : "compact"}
      controlInactive={mounted ? "bg-surface-50" : undefined}
      controlActive={mounted ? "bg-surface-900" : "bg-surface-200"}
      {checked}
      {onCheckedChange}
      compact
      disabled={!mounted}
    >
      {#snippet inactiveChild()}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 1.992a10 10 0 1 0 9.236 13.838c.341-.82-.476-1.644-1.298-1.31a6.5 6.5 0 0 1-6.864-10.787l.077-.08c.551-.63.113-1.653-.758-1.653h-.266l-.068-.006z"
          />
        </svg>
      {/snippet}
      {#snippet activeChild()}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 19a1 1 0 0 1 .993.883L13 20v1a1 1 0 0 1-1.993.117L11 21v-1a1 1 0 0 1 1-1m6.313-2.09l.094.083l.7.7a1 1 0 0 1-1.32 1.497l-.094-.083l-.7-.7a1 1 0 0 1 1.218-1.567zm-11.306.083a1 1 0 0 1 .083 1.32l-.083.094l-.7.7a1 1 0 0 1-1.497-1.32l.083-.094l.7-.7a1 1 0 0 1 1.414 0M4 11a1 1 0 0 1 .117 1.993L4 13H3a1 1 0 0 1-.117-1.993L3 11zm17 0a1 1 0 0 1 .117 1.993L21 13h-1a1 1 0 0 1-.117-1.993L20 11zM6.213 4.81l.094.083l.7.7a1 1 0 0 1-1.32 1.497l-.094-.083l-.7-.7A1 1 0 0 1 6.11 4.74zm12.894.083a1 1 0 0 1 .083 1.32l-.083.094l-.7.7a1 1 0 0 1-1.497-1.32l.083-.094l.7-.7a1 1 0 0 1 1.414 0M12 2a1 1 0 0 1 .993.883L13 3v1a1 1 0 0 1-1.993.117L11 4V3a1 1 0 0 1 1-1m0 5a5 5 0 1 1-4.995 5.217L7 12l.005-.217A5 5 0 0 1 12 7"
          />
        </svg>
      {/snippet}
    </Switch>
  </div>

  <div class="flex flex-row items-center">
    <label for="theme-select" class="sr-only">Theme:</label>
    <select
      id="theme-select"
      class="w-full sm:w-60 md:w-80 lg:w-fit text-5xl lg:text-base"
      bind:value={selectedTheme[0]}
      on:change={onThemeChange}
      aria-label="Select Theme"
      disabled={!mounted || selectedTheme[0] === "loading"}
    >
      {#if !mounted || selectedTheme[0] === "loading"}
        <option value="loading" disabled selected>Loading…</option>
      {/if}
      {#if mounted}
        {#each comboboxData as theme}
          <option value={theme.value}>{theme.emoji} {theme.label}</option>
        {/each}
      {/if}
    </select>
  </div>
</div>
