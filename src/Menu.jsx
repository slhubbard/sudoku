import "./Menu.css"

export default function Menu({clearWorkHandler}) {
  return (
    <div className="Menu">
      <br />
      <button onClick={clearWorkHandler} >Clear My Work</button>
    </div>
  );
}
