export interface NotebookConfigModel {
    currentPage?: number,
    currentSort?: {
        sortField?: string;
        sortVector?: string;
    }
    currentFilter?: {
        companyName?: string
    }
}