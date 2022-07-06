export const getTicket = () => localStorage.getItem('ticket')!=='undefined'?JSON.parse(localStorage.getItem('ticket')):false;
export const setTicket = (number) => localStorage.setItem('ticket',number);
export const getUser = () => localStorage.getItem('userdata')!=='undefined'?JSON.parse(localStorage.getItem('userdata')):false;
export const setUser = (userData) => localStorage.setItem('userdata',JSON.stringify(userData));