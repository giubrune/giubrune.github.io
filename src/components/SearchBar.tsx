type Props = {
  onSearchInput: (e: Event) => void
  query: () => string
  setQuery: (value: string) => void
  placeholderText: string
}

export default function SearchBar(props: Props) {
  return (
    <div class="relative">
      <svg class="absolute size-6 left-2 top-[0.45rem] stroke-stone-400 pointer-events-none"><use href="/ui.svg#search" /></svg>
      <input name="search" type="text" value={props.query()} onInput={props.onSearchInput} autocomplete="off" spellcheck={false}
        placeholder={props.placeholderText} aria-label="Search"
        class="w-full px-10 py-2 rounded-md outline-none placeholder-stone-400 text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 focus:border-accent-500" />
      {props.query().length > 0 && (
        <button onClick={() => props.setQuery("")} aria-label="Clear search"
          class="absolute flex justify-center items-center h-full w-10 right-0 top-0 stroke-stone-400 hover:stroke-stone-600">
          <svg class="size-5"><use href="/ui.svg#x" /></svg>
        </button>
      )}
    </div>
  )
}
