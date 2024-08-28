import {AuthUser} from 'aws-amplify/auth';

const userSelector = (context: {user: AuthUser}) => [context.user];
export default userSelector;
