interface RootState {
    login: boolean;
    sidebar: boolean;
    hovermap: string;
    editEmployee: {
        citizen_id: string;
        name: string;
        position: string;
        phone: string;
        start_date: string;
    };
  }
  
  export default RootState;