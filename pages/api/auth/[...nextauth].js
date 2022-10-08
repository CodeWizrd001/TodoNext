import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { User } from '../../../lib/models';

export default NextAuth({
    //Configure JWT
    session: {
        jwt: true,
    },
    //Specify Provider
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                return {};
                console.log(credentials)

                const user = await User.getUser(credentials.username,credentials.password);

                if (!user) {
                    throw new Error('No user found with the email');
                }

                return user;
            },
        }),
    ],
});