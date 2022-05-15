function Note({ id, text, title, bgColor }) {
  return (
    <>
      <div
        className={
          bgColor
            ? `flex flex-col bg-${bgColor} p-4 m-2 rounded-md w-40 h-40`
            : `flex flex-col bg-[red] p-4 m-2 rounded-md w-40 h-48`
        }
      >
        <p>{title}</p>
        <p className="overflow-hidden whitespace-nowrap">{text}</p>
      </div>
    </>
  );
}

export default Note;
