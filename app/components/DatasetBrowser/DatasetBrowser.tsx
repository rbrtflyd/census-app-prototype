import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/DatasetBrowser/Command';

interface DatasetBrowserProps {
  datasets: { name: string; description: string }[];
}

export const DatasetBrowser = ({ datasets }: DatasetBrowserProps) => {
  return (
    <Command>
      <CommandInput placeholder="Search for a dataset, segment, or connection..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {datasets.map((dataset) => (
            <CommandItem key={dataset.name}>{dataset.name}</CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
