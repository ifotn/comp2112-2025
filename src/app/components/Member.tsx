// define Props (incoming values) this component requires
type MemberProps = {
    name: string;
    title: string;
}

export default function Member({ name, title }: MemberProps) {
    return (
        <article className="card">
            <h3>{name}</h3>
            <p>{title}</p>
        </article> 
    )
}