import { createMemo, createSignal, For, Show } from "solid-js"
import Fuse from "fuse.js"
import SearchBar from "@components/SearchBar"

export type SearchItem = { kind: string; title: string; href: string; summary: string }
type Props = { data: SearchItem[] }

export default function Search(props: Props) {
  const [query, setQuery] = createSignal("")
  const fuse = new Fuse(props.data, { keys: ["title", "summary", "kind"], minMatchCharLength: 2, threshold: 0.35, ignoreLocation: true })
  const results = createMemo(() => (query().length < 2 ? [] : fuse.search(query()).map((r) => r.item)))

  return (
    <div class="flex flex-col">
      <SearchBar onSearchInput={(e) => setQuery((e.target as HTMLInputElement).value)} query={query} setQuery={setQuery}
        placeholderText="e.g. HYDRUS, Bayesian, green roof, microplastics" />
      <Show when={query().length >= 2}>
        <div class="mt-8 text-sm text-stone-500 mb-2">{results().length} results for “{query()}”</div>
        <ul class="divide-y divide-stone-200 dark:divide-stone-800">
          <For each={results()}>
            {(r) => (
              <li class="py-3">
                <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noopener" class="group block">
                  <span class="chip mr-2">{r.kind}</span>
                  <span class="font-medium text-stone-900 dark:text-stone-100 group-hover:text-accent-700 dark:group-hover:text-accent-300">{r.title}</span>
                  <span class="block mt-1 text-sm text-stone-600 dark:text-stone-400">{r.summary}</span>
                </a>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  )
}
