export interface DataItem {
    id: string;
    name: string;
    items: string[];
    address: string;
    pincode: string;
}

export interface SearchResultsProps {
    results: DataItem[];
    query: string;
    highlightedIndex: number;
    setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
    isKeyboardNav: boolean;
    setIsKeyboardNav: React.Dispatch<React.SetStateAction<boolean>>;

}