export interface NotebookConfigModel {
    currentSortField?: string;
    currentPage?: number,
    currentFilter?: {
        companyName?: string
    }
}