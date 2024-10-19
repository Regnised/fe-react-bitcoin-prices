export default function ResultModal({ reff, interval }) {
  return (
    <dialog ref={reff} className="result-modal">
      <h2>Interval {interval} milliseconds was saved</h2>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
}
