import ChallengePlayClient from './ChallengePlayClient';

export function generateStaticParams() {
    return [{ code: 'static-placeholder' }];
}

export default function Page() {
    return <ChallengePlayClient />;
}
