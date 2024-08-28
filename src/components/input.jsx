function INPUT(props) {
  return (
    <div className="grid">
      <h1>{props.n}</h1>
      <input
        value={props.v}
        onChange={(e) => props.f(e.target.value)}
        type={props.t}
        placeholder={props.p}
        disabled={props.l}
        className="disabled:bg-slate-200 disabled:text-gray-500 p-2 border rounded-md w-full outline-sky-200 my-2"
      ></input>
    </div>
  );
}

export default INPUT;
