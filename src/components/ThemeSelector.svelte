<script lang="ts">
  import { Switch } from "@skeletonlabs/skeleton-svelte";
  import IconMoon from "@lucide/svelte/icons/moon";
  import IconSun from "@lucide/svelte/icons/sun";
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

<div class="w-40 flex flex-row space-x-4">
  <Switch
    name={mounted ? "mode" : "compact"}
    controlInactive={mounted ? "bg-surface-50" : undefined}
    controlActive={mounted ? "bg-surface-900" : "bg-surface-200"}
    {checked}
    {onCheckedChange}
    compact
    disabled={!mounted}
  >
    {#snippet inactiveChild()}<IconMoon size="14" />{/snippet}
    {#snippet activeChild()}<IconSun size="14" />{/snippet}
  </Switch>

  <div class="flex flex-row items-center">
    <label for="theme-select" class="sr-only">Theme:</label>
    <select
      id="theme-select"
      class={mounted ? "w-fit" : "color-theme-select"}
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
