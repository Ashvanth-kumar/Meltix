import ReactMarkdown from "react-markdown"

export default function Recipe(props) {
    return (
        <section className=" recipe-section">
            <h2> Meltix Suggests that : </h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
        // console.log("Rendering recipe ", props.recipe);
    )
}