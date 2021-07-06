import { http, PORT } from './http';
import './websocket/client';
import './websocket/admin';

http.listen(PORT, () => console.log(`Server running at PORT ${PORT}`));