interface PaginationState {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
   }
   
   interface AppState {
    pagination: PaginationState;
    // classNsub: Class[]; // Assuming you have a Class model
   }
   