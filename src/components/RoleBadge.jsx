import {Badge} from 'react-bootstrap';

// Badge colored by role type; light backgrounds get dark text for contrast
const RoleBadge = ({type, children}) => <Badge bg={type} text={type === 'warning' || type === 'info' ? 'dark' : undefined}>{children}</Badge>;

export default RoleBadge;
