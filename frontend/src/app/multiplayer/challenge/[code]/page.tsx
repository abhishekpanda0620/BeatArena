import ChallengeLobbyClient from './ChallengeLobbyClient';

export function generateStaticParams() {
    return [{ code: 'static-placeholder' }];
}

export default function Page() {
    return <ChallengeLobbyClient />;
}
