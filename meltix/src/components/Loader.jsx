export default function Loader( {fadeOut} ){
    return (
        <div className={`loader-overlay ${fadeOut ? "fade-out" : ""}`}>
            <div className="spinner" />
            <p> Cooking ...</p>
        </div>
    )
}