import Member from "../components/Member";
import PageTitle from "../components/PageTitle";

export default function About() {
    return (
        <main>
            <PageTitle title="About" />
            <h1>About this Site</h1>
            <p>We are using it to learn React with Next.js.</p>
            <section>
                <h2>Team Members</h2>
                <Member name="Mary Berry" title="President" />
                <Member name="Harry Parrahands" title="Vice-President" />
                <Member name="Ben Deeguy" title="Treasurer" />
            </section>
        </main>
    );
}